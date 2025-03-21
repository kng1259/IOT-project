import logging
import json
import os
import psycopg
from datetime import datetime
import time
import azure.functions as func
from uuid import uuid4


def main(event: func.EventHubEvent):
    """
    Azure Function triggered by IoT Hub messages via Event Hub.
    Receives data and inserts it into a PostgreSQL database.
    """
    try:
        # Parse the event data from IoT Hub
        body = event.get_body().decode('utf-8')
        data = json.loads(body)

        # Extract fields from the JSON message
        device_id = data.get('deviceId')
        timestamp = data.get('timestamp')
        light = data.get('light')
        temperature = data.get('temperature')
        humidity = data.get('humidity')
        soilMoisture = data.get('soilMoisture')

        # Check for missing fields
        if not all([device_id, timestamp, light, temperature, humidity, soilMoisture]):
            logging.warning("Missing required fields in the message")
            return

        # enqueued_time = event.system_properties.get(b'iothub-enqueuedtime')
        # if enqueued_time:
        #     timestamp = datetime.datetime.fromisoformat(
        #         enqueued_time.decode('utf-8').replace('Z', '+00:00')
        #     )
        # else:

        # Retrieve database connection parameters from environment variables
        database_url = os.environ.get('DATABASE_URL')

        # Establish connection to PostgreSQL
        conn = psycopg.connect(conninfo=database_url)
        cur = conn.cursor()

        # Insert data into the table
        cur.execute(
            """INSERT INTO "Record" (id, timestamp, light, temperature, humidity, "soilMoisture", "areaId") VALUES (%s, %s, %s, %s, %s, %s, %s)""",
            (uuid4(), timestamp, light, temperature,
             humidity, soilMoisture, device_id)
        )

        # Commit the transaction and clean up
        conn.commit()

        cur.close()
        conn.close()

        logging.info("Data successfully inserted into PostgreSQL")
    except json.JSONDecodeError as e:
        logging.error(f"Error decoding JSON: {str(e)}")
    except KeyError as e:
        logging.error(f"Missing key in message: {str(e)}")
    except psycopg.Error as e:
        logging.error(f"Database error: {str(e)}")
    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
