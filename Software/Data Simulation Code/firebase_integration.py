# Path: firebase_integration.py
import os
import time
import firebase_admin
from firebase_admin import credentials, firestore, db

# Initialize Firebase Admin SDK
cred = credentials.Certificate('waterborne-disease-firebase-adminsdk-sf6o3-c28edc54a3.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://waterborne-disease-default-rtdb.firebaseio.com/'
})

# Initialize Firestore
firestore_db = firestore.client()

def upload_data_to_firestore(sensor_id, simulated_data, data_count):
    # Reference to the Firestore collection using sensor ID
    ref = firestore_db.collection(sensor_id)

    # Use the data count to create a unique document ID
    document_id = f"data_{data_count}"

    # Upload the new data to Firestore with the specific ID
    ref.document(document_id).set({
        'Physical': simulated_data['Physical'],
        'Chemical': simulated_data['Chemical'],
        'Microbiological': simulated_data['Microbiological'],
        'Radiological': simulated_data['Radiological'],
        'timestamp': time.time()
    })

def update_data_count(sensor_id, data_count):
    # Reference to the Realtime Database path
    ref = db.reference(f'sensor_counts/{sensor_id}')
    ref.set(data_count)

def get_data_count(sensor_id):
    # Reference to the Realtime Database path
    ref = db.reference(f'sensor_counts/{sensor_id}')
    data_count = ref.get()
    return data_count if data_count is not None else 0