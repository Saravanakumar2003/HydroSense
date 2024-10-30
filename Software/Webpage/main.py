from flask import Flask, request, jsonify, render_template
from data_simulation import generate_dummy_data
from firebase_integration import upload_data_to_firestore, update_data_count, get_data_count

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/privacy_policy')
def privacy_policy():
    return render_template('privacy_policy.html')

@app.route('/terms_of_service')
def terms_of_service():
    return render_template('terms_of_service.html')

@app.route('/generate_data', methods=['POST'])
def generate_data():
    sensor_id = request.form.get('sensor_id')
    
    # Initialize the data count from the Realtime Database
    data_count = get_data_count(sensor_id)
    
    simulated_data = generate_dummy_data()
    sensor_data = simulated_data['sensor_data'][0]
    
    # Increment the data count
    data_count += 1
    
    # Upload data to Firestore
    upload_data_to_firestore(sensor_id, sensor_data, data_count)
    
    # Update data count in Firebase Realtime Database
    update_data_count(sensor_id, data_count)
    
    return jsonify({'message': f'Data {data_count} uploaded successfully.'})

if __name__ == '__main__':
    app.run(debug=True)
