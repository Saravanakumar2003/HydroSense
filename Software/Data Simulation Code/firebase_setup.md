# Firebase Setup

This document provides step-by-step instructions to set up Firebase for the Portable Water-Borne Disease Detector project.

## Prerequisites

- A Google account
- Firebase CLI installed
- Python installed

## Steps

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on "Add project" and follow the on-screen instructions to create a new project.
3. Once the project is created, navigate to the project dashboard.

### 2. Add Firebase to Your App

1. In the Firebase Console, click on the gear icon next to "Project Overview" and select "Project settings".
2. Under the "General" tab, scroll down to "Your apps" and click on the `</>` (Web) icon to add a new web app.
3. Register the app with a nickname and click "Register app".
4. Firebase will provide you with a configuration object. Copy this configuration as you will need it later.

### 3. Set Up Firebase Realtime Database

1. In the Firebase Console, navigate to "Build" > "Realtime Database".
2. Click on "Create Database".
3. Select a location for your database and click "Next".
4. Choose "Start in test mode" and click "Enable".

### 4. Download the Service Account Key

1. In the Firebase Console, go to "Project settings".
2. Click on the "Service accounts" tab.
3. Click on "Generate new private key" and confirm by clicking "Generate key".
4. Save the downloaded JSON file as `waterborne-disease-firebase-adminsdk-sf6o3-c28edc54a3.json` in the `Software/Data Simulation Code` directory.
5. Add the file to `.gitignore` to ensure it is not committed to version control.

### 5. Initialize Firebase in Your Code

1. Open [`Software/Data Simulation Code/firebase_integration.py`](Software/Data Simulation Code/firebase_integration.py).
2. Ensure the Firebase Admin SDK is initialized with the service account key:
    ```py
    import firebase_admin
    from firebase_admin import credentials, firestore, db

    # Initialize Firebase Admin SDK
    cred = credentials.Certificate('waterborne-disease-firebase-adminsdk-sf6o3-c28edc54a3.json')
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://waterborne-disease-default-rtdb.firebaseio.com/'
    })

    # Initialize Firestore
    firestore_db = firestore.client()
    ```

### 6. Implement Firebase Functions

1. Implement the function to upload data to Firestore in [`Software/Data Simulation Code/firebase_integration.py`](Software/Data Simulation Code/firebase_integration.py):
    ```py
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
    ```

2. Implement the function to update the data count in the Realtime Database:
    ```py
    def update_data_count(sensor_id, data_count):
        # Reference to the Realtime Database path
        ref = db.reference(f'sensor_counts/{sensor_id}')
        ref.set(data_count)
    ```

3. Implement the function to get the data count from the Realtime Database:
    ```py
    def get_data_count(sensor_id):
        # Reference to the Realtime Database path
        ref = db.reference(f'sensor_counts/{sensor_id}')
        data_count = ref.get()
        return data_count if data_count is not None else 0
    ```

### 7. Run the Application

1. Ensure all dependencies are installed:
    ```sh
    pip install firebase-admin
    ```

2. Run the main application:
    ```sh
    python Software/Data Simulation Code/main.py
    ```

Your Firebase setup is now complete. The application should be able to upload simulated sensor data to Firebase in real-time.