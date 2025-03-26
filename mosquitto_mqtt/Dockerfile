FROM python:3.11-alpine
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the source code
COPY main.py .
COPY .env .

# Expose the port
EXPOSE 1883 8883

# Run the application
CMD ["python", "main.py"]