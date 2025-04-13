import paho.mqtt.client as mqtt
from azure.iot.device import ProvisioningDeviceClient, IoTHubDeviceClient, Message, MethodRequest, MethodResponse
from dotenv import load_dotenv, set_key
from os import environ
import json
from datetime import datetime, timezone

areas = [1, 2]


def provision_device(provisioning_host, id_scope, registration_id, device_symmetric_key):
    # --- Create the Provisioning Device Client ---
    prov_client = ProvisioningDeviceClient.create_from_symmetric_key(
        provisioning_host=provisioning_host,
        registration_id=registration_id,
        id_scope=id_scope,
        symmetric_key=device_symmetric_key,
    )

    # --- Register the Device with DPS ---
    print("Registering device with DPS...")
    registration_result = prov_client.register()

    # --- Check and Output the Registration Result ---
    if registration_result.status != "assigned":
        print("Registration failed with status:", registration_result.status)
    print("Device registered with DPS.")

    return (registration_result.registration_state.assigned_hub, registration_result.registration_state.device_id)


def on_connect(client, userdata, flags, rc):
    """Callback triggered when the MQTT client connects to the local server."""
    if rc == 0:
        [client.subscribe(f"{i}/sensorData") for i in areas]
    else:
        print(f"Failed to connect to local MQTT server, return code {rc}")


def on_message(client, userdata, msg):
    """Callback triggered when a message is received from the local MQTT server."""
    data = msg.payload.decode("utf-8").split()
    # Extract areaid from topic string (format: "{areaid}/sensorData")
    area_id = msg.topic.split('/')[0]  # Get the first part of the topic
    for i in range(4):
        data[i] = float(data[i])
    try:
        # Send the message to Azure IoT Hub
        payload = {
            "areaId": area_id,
            "farmId": farm_id,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "temperature": data[0],
            "humidity": data[1],
            "light": data[2],
            "soilMoisture": data[3]
        }
        message_json = json.dumps(payload)
        message = Message(message_json)
        message.custom_properties["type"] = f"telemetry"
        device_client.send_message(message)
    except Exception as e:
        print(f"Failed to send message to IoT Hub: {e}")


def method_request_handler(method_request: MethodRequest):
    print(f"\nDirect method '{method_request.name}' received.")
    print(f"Payload: {method_request.payload}")
    area_id = method_request.payload["areaId"]
    payload = {}
    status = 200
    print(f"Called {method_request.name} method on area {area_id}")

    match method_request.name:
        case "startWatering":
            mqtt_client.publish(f"{area_id}/watering", "100")
        case "stopWatering":
            mqtt_client.publish(f"{area_id}/watering", "0")
        case "startLighting":
            mqtt_client.publish(f"{area_id}/lighting", "1")
        case "stopLighting":
            mqtt_client.publish(f"{area_id}/lighting", "0")
        case "fetchLatestData":
            mqtt_client.publish(f"{area_id}/latestData", "1")

    method_response = MethodResponse.create_from_method_request(method_request, status, payload)
    device_client.send_method_response(method_response)


if __name__ == '__main__':
    load_dotenv()

    # --- DPS Configuration ---
    # The global endpoint for DPS
    provisioning_host = environ.get(
        "PROVISIONING_HOST", "global.azure-devices-provisioning.net")

    # Your DPS ID Scope (available in the DPS overview in the Azure portal)
    id_scope = environ["DPS_ID_SCOPE"]

    # Device registration ID (preassigned)
    farm_id = environ["FARM_ID"]

    # The device's registration ID (calculated and sent to device beforehand)
    device_symmetric_key = environ["DEVICE_SYMMETRIC_KEY"]

    # MQTT host
    mqtt_host = environ.get("MQTT_HOST", "localhost")

    assigned_hub = environ.get("ASSIGNED_HUB", None)
    if assigned_hub == None:
        assigned_hub, device_id = provision_device(provisioning_host, id_scope, farm_id, device_symmetric_key)
        set_key(".env", "ASSIGNED_HUB", assigned_hub)
        if device_id != farm_id:
            raise "WTF"
    else:
        print("Device already provisioned.")

    # --- Create the IoT Hub Client to start sending telemetry ---
    device_client = IoTHubDeviceClient.create_from_symmetric_key(
        symmetric_key=device_symmetric_key,
        hostname=assigned_hub,
        device_id=farm_id,
    )

    # --- Connect to the IoT Hub ---
    device_client.connect()
    device_client.on_method_request_received = method_request_handler
    print("Connected to IoT Hub")

    # Create the MQTT client instance
    mqtt_client = mqtt.Client()
    mqtt_client.on_connect = on_connect
    mqtt_client.on_message = on_message
    print("Connected to local MQTT server")

    # Connect to the local MQTT server
    mqtt_client.connect(mqtt_host, 1883)

    # Start the MQTT client loop to listen for messages
    try:
        mqtt_client.loop_forever()
    except KeyboardInterrupt:
        print("Disconnecting...")
        mqtt_client.disconnect()
        device_client.disconnect()
