from azure.iot.device import ProvisioningDeviceClient, IoTHubDeviceClient
from dotenv import load_dotenv, set_key
from os import environ
from datetime import datetime
import time
import json

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


def send_telemetry(registration_id, device_symmetric_key, assigned_hub, device_id):
    # --- Create the IoT Hub Client to start sending telemetry ---
    print("Start sending telemetry to the assigned hub...")
    device_client = IoTHubDeviceClient.create_from_symmetric_key(
        symmetric_key=device_symmetric_key,
        hostname=assigned_hub,
        device_id=device_id,
    ) 

    # --- Connect to the IoT Hub ---
    device_client.connect()

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
        device_client.send_message(message_json)
        time.sleep(1)

    # --- Disconnect ---
    device_client.disconnect()

if __name__ == "__main__":
    load_dotenv()

    # --- DPS Configuration ---
    # The global endpoint for DPS
    provisioning_host = environ.get("PROVISIONING_HOST", "global.azure-devices-provisioning.net")

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
        if assigned_hub=="" or device_id=="":
            raise KeyError
        print("Device already provisioned.")
    except KeyError:
        assigned_hub, device_id = provision_device(provisioning_host, id_scope, registration_id, device_symmetric_key)
        set_key(".env", "ASSIGNED_HUB", assigned_hub)
        set_key(".env", "DEVICE_ID", device_id)

    # Send telemetry to the assigned hub
    send_telemetry(registration_id, device_symmetric_key, assigned_hub, device_id)