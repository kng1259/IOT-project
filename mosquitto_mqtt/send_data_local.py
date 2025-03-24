import paho.mqtt.client as mqtt
import json
import time
from datetime import datetime

# MQTT broker settings
BROKER = "localhost"
PORT = 1883
TOPIC = "V1"
KEEPALIVE = 60

# Sample JSON payload
sample_payload = {
    "deviceId": "863225a7-644e-4901-ba91-dfb5dd8bf4b1",
    "timestamp": datetime.now().isoformat(),
    "light": 500,
    "temperature": 25.0,
    "humidity": 60.0,
    "soilMoisture": 40.0
}

# Callback functions for MQTT client


def on_connect(client, userdata, flags, rc):
    """Callback when the client connects to the broker."""
    if rc == 0:
        print("Connected to MQTT broker")
    else:
        print(f"Failed to connect, return code {rc}")


def on_publish(client, userdata, mid):
    """Callback when a message is published."""
    print(f"Message {mid} published to topic {TOPIC}")


# Create MQTT client
client = mqtt.Client()
client.on_connect = on_connect
client.on_publish = on_publish

# Connect to the broker
client.connect(BROKER, PORT, KEEPALIVE)

# Convert the sample payload to a JSON string
payload = json.dumps(sample_payload)

# Publish the JSON payload
client.loop_start()  # Start the network loop in the background
# Publish with QoS 1 (at least once delivery)
client.publish(TOPIC, payload, qos=1)
print(f"Publishing payload: {payload}")

# Keep the script running briefly to ensure the message is sent
time.sleep(2)

# Clean up
client.loop_stop()
client.disconnect()
print("Disconnected from MQTT broker")
