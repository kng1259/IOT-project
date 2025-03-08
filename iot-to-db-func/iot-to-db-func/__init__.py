import logging
import json
import os
import psycopg
from datetime import datetime
import time
import azure.functions as func

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
        timestamp_str = data.get('timestamp')
        value = data.get('value')
        
        # Check for missing fields
        if not all([device_id, timestamp_str, value]):
            logging.warning("Missing required fields in the message")
            return
        
        # enqueued_time = event.system_properties.get(b'iothub-enqueuedtime')
        # if enqueued_time:
        #     timestamp = datetime.datetime.fromisoformat(
        #         enqueued_time.decode('utf-8').replace('Z', '+00:00')
        #     )
        # else:
        timestamp = datetime.utcnow()
        
        # Retrieve database connection parameters from environment variables
        database_url = os.environ.get('DATABASE_URL')
        
        # Establish connection to PostgreSQL
        conn = psycopg.connect(conninfo=database_url)
        cur = conn.cursor()

        # Init table
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS my_table (
                device_id VARCHAR(255),
                timestamp TIMESTAMP,
                value FLOAT
            )
            """
        )
        
        # Insert data into the table
        cur.execute(
            "INSERT INTO my_table (device_id, timestamp, value) VALUES (%s, %s, %s)",
            (device_id, timestamp, value)
        )
        
        # Commit the transaction and clean up
        conn.commit()
        # print(f"Device ID: {device_id}, Timestamp: {timestamp}, Value: {value}")

        # Query to get 10 latest entries
        cur.execute(
            """
            SELECT device_id, timestamp, value
            FROM my_table
            ORDER BY timestamp DESC
            LIMIT 5
            """
        )
        
        # Print the results
        print("\nLatest 10 entries:")
        for row in cur.fetchall():
            print(f"Device: {row[0]} | Time: {row[1]} | Value: {row[2]}")

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