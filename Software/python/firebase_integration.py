import os
import time
import firebase_admin
from firebase_admin import credentials, db

# Initialize Firebase Admin SDK
cred = credentials.Certificate('waterborne-disease-firebase-adminsdk-sf6o3-52fcc9692e.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://waterborne-disease-default-rtdb.firebaseio.com/'
})

def upload_data_to_firebase(heavy_metals, bacteria, chemicals):
    ref = db.reference('sensor_data')
    ref.push({
        'heavy_metals': heavy_metals,
        'bacteria': bacteria,
        'chemicals': chemicals,
        'timestamp': time.time()
    })