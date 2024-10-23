# Path: main.py
import tkinter as tk
from tkinter import ttk
from data_simulation import generate_dummy_data
from firebase_integration import upload_data_to_firestore, update_data_count, get_data_count

# Initialize global variables
data_count = 0
physical_data = []
chemical_data = []
microbiological_data = []
radiological_data = []

# Function to simulate data and update the GUI
def generate_data():
    global data_count
    sensor_id = sensor_id_entry.get()
    
    # Initialize the data count from the Realtime Database
    data_count = get_data_count(sensor_id)
    
    simulated_data = generate_dummy_data()
    sensor_data = simulated_data['sensor_data'][0]  
    
    physical_data.append(sensor_data['Physical'])
    chemical_data.append(sensor_data['Chemical'])
    microbiological_data.append(sensor_data['Microbiological'])
    radiological_data.append(sensor_data['Radiological'])
    
    # Increment the data count
    data_count += 1
    
    # Upload data to Firestore using sensor ID and data count
    upload_data_to_firestore(sensor_id, sensor_data, data_count)
    
    # Update the data count in the Realtime Database
    update_data_count(sensor_id, data_count)
    
    # Update the status label to show which data has been uploaded
    status_label.config(text=f"Data {data_count} is uploaded.")

# Initialize the Tkinter root window
root = tk.Tk()
root.title("Data Generation")

# Size of the app
root.geometry("300x150")

# Create label and entry for sensor ID
sensor_id_label = ttk.Label(root, text="Enter Sensor ID:")
sensor_id_label.pack(pady=5)
sensor_id_entry = ttk.Entry(root)
sensor_id_entry.pack(pady=5)

# Create button to generate data
generate_button = ttk.Button(root, text="Generate New Data", command=generate_data)
generate_button.pack(pady=5)

# Create status label
status_label = ttk.Label(root, text="Data generation: Not Running.")
status_label.pack(pady=5)

# Start the Tkinter main loop
root.mainloop()