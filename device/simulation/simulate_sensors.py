from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib  # For loading the trained ML model
import numpy as np
import random
import datetime
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_limiter.errors import RateLimitExceeded

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Allow requests from localhost and any other origins you need
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000", "https://hydrosense-app.vercel.app/"]}})


limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["5000 per day", "500 per hour", "1 per second"],
)

# Load the trained ML model
try:
    model = joblib.load("fine_tuned_svm_model.pkl")
    print("Model loaded successfully.")
except Exception as e:
    model = None
    print("Error loading model:", str(e))

@app.route('/test', methods=['GET'])
def test_endpoint():
    return jsonify({"message": "API is working fine"}), 200

# Sensor data simulation
def generate_sensor_data():
    return {
        "phValue": round(random.uniform(6.0, 8.0), 1),
        "tdsValue": random.randint(200, 500),
        "turbidity": random.randint(0,5),
        "temperature": round(random.uniform(20, 35), 1),
        "gasValue": round(random.uniform(0, 10), 2),  # Gas sensor (arbitrary range 0-10 ppm)
        "pressureValue": round(random.uniform(950, 1050), 2),  # Pressure (hPa)
        "humidityValue": round(random.uniform(20, 90), 1),  # Humidity (%)
        "temperatureValue": round(random.uniform(20, 35), 1),  # Temperature (°C)
        "proximityValue": random.randint(0, 10),  # Proximity (arbitrary range, 0-10)
        "ambientLightValue": random.randint(100, 10000),  # Ambient light (lux)
        "irValue": random.randint(0, 1),  # IR sensor (0 = no IR, 1 = IR detected)
        "timestamp": datetime.datetime.now().isoformat()  # Current timestamp
    }

@app.route("/", methods=["GET"])
def send_sensor_data():
    return jsonify(generate_sensor_data())

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
