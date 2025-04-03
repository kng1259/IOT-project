import base64
import hmac
import hashlib
from dotenv import load_dotenv, set_key
from os import environ
from sys import argv

# --- Helper Function: Derive Device Key ---


def compute_device_symmetric_key(group_key: str, reg_id: str) -> str:
    """
    Derive the device-specific symmetric key from the enrollment group key and the device's registration ID.
    """
    key_bytes = base64.b64decode(group_key.encode("utf-8"))
    reg_id_bytes = reg_id.encode("utf-8")
    hmac_digest = hmac.new(key_bytes, reg_id_bytes, hashlib.sha256).digest()
    return base64.b64encode(hmac_digest).decode("utf-8")


# --- Main Function: Receive reg_id as arg and return device key ---
if __name__ == "__main__":
    load_dotenv()

    # --- DPS Configuration ---
    # The device's registration ID (should be unique for each device)
    registration_id = argv[1]

    # The enrollment group's symmetric key (primary key from your DPS enrollment group)
    group_symmetric_key = environ["GROUP_SYMMETRIC_KEY"]

    # Derive the device symmetric key
    device_symmetric_key = compute_device_symmetric_key(
        group_symmetric_key, registration_id)
    set_key(".env", "REGISTRATION_ID", registration_id)
    set_key(".env", "DEVICE_SYMMETRIC_KEY", device_symmetric_key)
    print(device_symmetric_key)
