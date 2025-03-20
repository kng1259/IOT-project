import paho.mqtt.client as mqtt
import json
from datetime import datetime
from time import time, sleep
from dotenv import load_dotenv, set_key
from os import environ
from base64 import b64encode, b64decode
from urllib import parse
from hashlib import sha256
from hmac import HMAC


def on_connect(client, userdata, flags, rc):
    if rc != 0:
        print(f"Connection failed with code {rc}")


def generate_sas_token(uri, key, policy_name=None, expiry=3600):
    ttl = time() + expiry
    sign_key = "%s\n%d" % ((parse.quote_plus(uri)), int(ttl))
    signature = b64encode(
        HMAC(b64decode(key), sign_key.encode('utf-8'), sha256).digest())

    rawtoken = {
        'sr':  uri,
        'sig': signature,
        'se': str(int(ttl))
    }

    if policy_name is not None:
        rawtoken['skn'] = policy_name

    return 'SharedAccessSignature ' + parse.urlencode(rawtoken)


def send_telemetry(registration_id, sas_token, assigned_hub):
    # --- Create MQTT client ---
    print("Start sending telemetry to the assigned hub...")

    # Create client instance with device_id as client_id
    client = mqtt.Client(client_id=registration_id, protocol=mqtt.MQTTv311)

    # Set callback for connection
    client.on_connect = on_connect

    # Configure connection details
    client.username_pw_set(
        username=f"{assigned_hub}/{registration_id}",
        password=sas_token
    )

    # Enable TLS for secure connection (recommended for IoT Hub)
    client.tls_set()

    # Set hostname and port (default MQTT port is 8883 for secure connection)
    mqtt_host = assigned_hub
    mqtt_port = 8883

    # --- Connect to the MQTT broker ---
    client.connect(mqtt_host, mqtt_port, keepalive=60)

    # Start the loop to process network events
    client.loop_start()

    # Topic format for Azure IoT Hub MQTT
    topic = f"devices/{registration_id}/messages/events/"

    # --- Send demo telemetry ---
    for i in range(1, 4):
        print("sending message #" + str(i))
        # Create a more structured JSON payload with device info and metrics
        payload = {
            "deviceId": registration_id,
            "timestamp": datetime.now().isoformat(),
            "light": i,
            "temperature": 25.0,
            "humidity": 60.0,
            "soilMoisture": 40.0
        }
        # Convert the payload to a JSON string
        message_json = json.dumps(payload)

        # Publish the message
        client.publish(topic, message_json, qos=1)
        sleep(1)

    # --- Disconnect ---
    client.loop_stop()
    client.disconnect()
    print("Disconnected from MQTT broker")


if __name__ == "__main__":
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
        registration_id = environ["DEVICE_ID"]
        if assigned_hub == "" or registration_id == "":
            raise KeyError
        print("Device already provisioned.")
    except KeyError:
        raise Exception("Device not provisioned")

    resource_uri = f"{assigned_hub}/devices/{registration_id}"

    sas_token = generate_sas_token(
        resource_uri, device_symmetric_key, expiry=3600)

    # Send telemetry to the assigned hub
    send_telemetry(registration_id, sas_token,
                   assigned_hub)
