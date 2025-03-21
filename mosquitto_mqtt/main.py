import paho.mqtt.client as mqtt
from azure.iot.device import ProvisioningDeviceClient, IoTHubDeviceClient, Message
from dotenv import load_dotenv, set_key
from os import environ
import json
from datetime import datetime
import time


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
        client.subscribe("V1")  # Subscribe to the desired topic
        print("Subscribed to local sensor/data")
    else:
        print(f"Failed to connect to local MQTT server, return code {rc}")


def on_message(client, userdata, msg):
    """Callback triggered when a message is received from the local MQTT server."""
    print(f"Received message on topic {msg.topic}")
    msg = Message(msg.payload)  # Create a message with the MQTT payload
    try:
        # Send the message to Azure IoT Hub
        device_client.send_message(msg)
        print("Message sent to IoT Hub")
    except Exception as e:
        print(f"Failed to send message to IoT Hub: {e}")


load_dotenv()

# --- DPS Configuration ---
# The global endpoint for DPS
provisioning_host = environ.get(
    "PROVISIONING_HOST", "global.azure-devices-provisioning.net")

# Your DPS ID Scope (available in the DPS overview in the Azure portal)
id_scope = environ["DPS_ID_SCOPE"]

# Device registration ID (preassigned)
registration_id = environ["REGISTRATION_ID"]

# The device's registration ID (calculated and sent to device beforehand)
device_symmetric_key = environ["DEVICE_SYMMETRIC_KEY"]

# Check if the device is already registered
try:
    assigned_hub = environ["ASSIGNED_HUB"]
    device_id = environ["DEVICE_ID"]
    if assigned_hub == "" or device_id == "":
        raise KeyError
    print("Device already provisioned.")
except KeyError:
    assigned_hub, device_id = provision_device(
        provisioning_host, id_scope, registration_id, device_symmetric_key)
    set_key(".env", "ASSIGNED_HUB", assigned_hub)
    set_key(".env", "DEVICE_ID", device_id)


# --- Create the IoT Hub Client to start sending telemetry ---
device_client = IoTHubDeviceClient.create_from_symmetric_key(
    symmetric_key=device_symmetric_key,
    hostname=assigned_hub,
    device_id=device_id,
)

# --- Connect to the IoT Hub ---
device_client.connect()

# Create the MQTT client instance
mqtt_client = mqtt.Client()
mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message

# Connect to the local MQTT server
mqtt_client.connect("localhost", 1883, 60)

# Start the MQTT client loop to listen for messages
try:
    mqtt_client.loop_forever()
except KeyboardInterrupt:
    print("Disconnecting...")
    mqtt_client.disconnect()
    device_client.disconnect()
