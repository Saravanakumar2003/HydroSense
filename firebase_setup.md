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

1. In the Firebase Console, go to "Project settings" > "Service accounts".
2. Click on "Generate new private key" and download the JSON file.
3. Save this file as `waterborne-disease-firebase-adminsdk-sf6o3-c28edc54a3.json` in the root directory of your project.

### 5. Initialize Firebase in Your Project

1. Install the Firebase Admin SDK:
    ```sh
    pip install firebase-admin
    ```

2. Initialize Firebase in your project by adding the following code to `Software/python/firebase_integration.py`:
    ```py
    import os
    import time
    import firebase_admin
    from firebase_admin import credentials, db

    # Initialize Firebase Admin SDK
    cred = credentials.Certificate('waterborne-disease-firebase-adminsdk-sf6o3-c28edc54a3.json')
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'your-database-url'
    })
    ```

### 6. Update `.gitignore`

Ensure that your service account key file is not committed to version control by adding it to your `.gitignore` file:
    ```
    waterborne-disease-firebase-adminsdk-sf6o3-c28edc54a3.json
    ```

### 7. Upload Data to Firebase

Use the following function in [`Software/python/firebase_integration.py`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2FSaravana%20Kumar%2FDocuments%2FFinal%20Year%20Project%2FSoftware%2FSoftware%2Fpython%2Ffirebase_integration.py%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%229dcf3e36-ddf6-4036-b676-aa3cbdcfef3e%22%5D "c:\Users\Saravana Kumar\Documents\Final Year Project\Software\Software\python\firebase_integration.py") to upload data to Firebase:
    ```py
    def upload_data_to_firebase(simulated_data):
        ref = db.reference('sensor_data')
        ref.push({
            'data': simulated_data,
            'timestamp': time.time()
        })
    ```

### 8. Run the Application

1. Ensure all dependencies are installed:
    ```sh
    pip install -r Software/python/requirements.txt
    ```

2. Run the main application:
    ```sh
    python Software/python/main.py
    ```

Your Firebase setup is now complete. The application should be able to upload simulated sensor data to Firebase in real-time.