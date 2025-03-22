from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def generate_sensor_data():
    return {
        "phValue": round(random.uniform(6.0, 8.0), 1),  # pH range: 6-8
        "tdsValue": random.randint(0, 500),             # TDS range: 0-500
        "turbidity": random.randint(85, 100),           # Turbidity range: 85-100 NTU
        "temperature": round(random.uniform(15, 35), 1) # Temp range: 15-35°C
    }

@app.route("/", methods=["GET"])
def send_sensor_data():
    return jsonify(generate_sensor_data())

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)