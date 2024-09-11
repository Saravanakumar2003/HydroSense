# Path: Software/python/firebase_integration.py
import os
import time
import firebase_admin
from firebase_admin import credentials, db

# Initialize Firebase Admin SDK
cred = credentials.Certificate('waterborne-disease-firebase-adminsdk-sf6o3-c28edc54a3.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://waterborne-disease-default-rtdb.firebaseio.com/'
})

def upload_data_to_firebase(simulated_data):
    ref = db.reference('sensor_data')
    ref.push({
        'data': simulated_data,
        'timestamp': time.time()
        
    })