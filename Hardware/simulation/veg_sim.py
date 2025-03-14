from flask import Flask, jsonify
import random

app = Flask(__name__)

def generate_sensor_data():
    return {
        "pH": round(random.uniform(6.5, 8.5), 2),
        "Turbidity": round(random.uniform(0, 100), 2),
        "Temperature": round(random.uniform(20, 35), 2)
    }

@app.route("/")  # Now the root URL shows data directly
def home():
    return jsonify(generate_sensor_data())  # Send sensor data immediately

if __name__ == "__main__":
    app.run(host="192.168.4.1", port=80, debug=True)
