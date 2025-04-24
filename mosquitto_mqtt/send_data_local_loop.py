import paho.mqtt.client as mqtt
import time
from random import uniform
from datetime import datetime

orivals = [25.0, 50.0, 60, 0.0]

# MQTT broker settings
BROKER = "localhost"
PORT = 1883
TOPIC = "1/sensorData"
KEEPALIVE = 60

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

# SIGINT handler to stop the loop
def signal_handler(sig, frame):
    print("SIGINT received, stopping the loop...")
    client.loop_stop()
    client.disconnect()
    print("Disconnected from MQTT broker")
    exit(0)

import signal
signal.signal(signal.SIGINT, signal_handler)

# Publish the JSON payload
client.loop_start()  # Start the network loop in the background

# Publish with QoS 1 (at least once delivery)
while True:
    # Sample JSON payload
    vals = [str(val*uniform(0.9, 1.1)) for val in orivals]
    sample_payload = " ".join(vals)
    client.publish(TOPIC, sample_payload, qos=1)
    time.sleep(2)
