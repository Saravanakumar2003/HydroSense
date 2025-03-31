from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib  # For loading the trained ML model
import numpy as np

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Load the trained ML model
model = joblib.load("scaler.pkl")  # Ensure the file exists in the same directory

@app.route('/predict', methods=['POST'])

def predict():
    try:
        # Debug: Print incoming JSON data
        data = request.json
        print("Received data:", data)

        # Ensure data exists
        if not data:
            return jsonify({"error": "No data received"}), 400

        # Extract values safely
        ph = float(data.get('pH', 0))
        turbidity = float(data.get('Turbidity', 0))
        temperature = float(data.get('Temperature', 0))

        # Debug: Print extracted values
        print(f"pH: {ph}, Turbidity: {turbidity}, Temperature: {temperature}")

        # Ensure values are valid
        if ph == 0 or turbidity == 0 or temperature == 0:
            return jsonify({"error": "Invalid input values"}), 400
        
        features = np.array([[ph, turbidity, temperature]])

        # Prepare input for AI model
        features = np.array([[ph, turbidity, temperature]])

        # Predict using the model
        prediction = model.predict(features)[0]

        # Debug: Print model output
        print("Model prediction:", prediction)

        # Convert prediction to readable output
        if (prediction == 1):
            result = "Safe to drink"
        else:
            result =  "Not potable"
        print(result)
        return jsonify({"result": result}), 200


    except Exception as e:
        print("Server Error:", str(e))  # Debugging line
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
