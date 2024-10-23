# Path: firebase_integration.py
import pytz
from datetime import datetime
import firebase_admin
from firebase_admin import credentials, firestore, db

# Initialize Firebase Admin SDK

secret_file_path = '/etc/secrets/FIREBASE_CREDENTIALS'
cred = credentials.Certificate('secret_file_path')
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

    # Get the current time in Indian Standard Time (IST)
    ist = pytz.timezone('Asia/Kolkata')
    current_time = datetime.now(ist)
    date_str = current_time.strftime('%Y-%m-%d')
    time_str = current_time.strftime('%H:%M:%S')

    # Upload the new data to Firestore with the specific ID
    ref.document(document_id).set({
        'Physical': simulated_data['Physical'],
        'Chemical': simulated_data['Chemical'],
        'Microbiological': simulated_data['Microbiological'],
        'Radiological': simulated_data['Radiological'],
        'date': date_str,
        'time': time_str
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