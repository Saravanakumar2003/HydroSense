# Data Simulation Code

This folder contains the code for simulating data and integrating with Firebase for the Portable Water-Borne Disease Detector project.

## Folder Structure

- `data_simulation.py`: Contains functions to generate dummy data for simulation.
- `firebase_integration.py`: Handles Firebase integration, including uploading data to Firestore and updating data counts in the Realtime Database.
- `firebase_setup.md`: Provides step-by-step instructions to set up Firebase for the project.
- `main.py`: The main script that initializes the GUI for data generation and handles the data simulation process.
- `waterborne-disease-firebase-adminsdk-sf6o3-c28edc54a3.json`: The service account key for Firebase authentication (ensure this file is added to `.gitignore`).

## Setup Instructions

1. **Install Dependencies**:
    ```sh
    pip install firebase-admin
    ```

2. **Firebase Setup**:
    Follow the instructions in [`firebase_setup.md`](Software/Data Simulation Code/firebase_setup.md) to set up Firebase for the project.

3. **Run the Application**:
    ```sh
    python main.py
    ```

## Usage

1. **Generate Data**:
    - Run `main.py` to start the Tkinter GUI.
    - Enter the sensor ID in the provided entry field.
    - Click on "Generate New Data" to simulate and upload data to Firebase.

2. **Firebase Integration**:
    - The simulated data is uploaded to Firestore under the collection named after the sensor ID.
    - The data count is updated in the Firebase Realtime Database under `sensor_counts/{sensor_id}`.

## Functions

### `firebase_integration.py`

- [`upload_data_to_firestore`](Software/Data Simulation Code/firebase_integration.py): Uploads simulated data to Firestore.
- [`update_data_count`](Software/Data Simulation Code/firebase_integration.py): Updates the data count in the Realtime Database.
- [`get_data_count`](Software/Data Simulation Code/firebase_integration.py): Retrieves the current data count from the Realtime Database.

### `main.py`

- [`generate_data`](Software/Data Simulation Code/main.py): Simulates data, uploads it to Firebase, and updates the GUI.

## Notes

- Ensure that the service account key file `waterborne-disease-firebase-adminsdk-sf6o3-c28edc54a3.json` is not committed to version control by adding it to `.gitignore`.
- The application uses Tkinter for the GUI, so ensure that Tkinter is installed in your Python environment.