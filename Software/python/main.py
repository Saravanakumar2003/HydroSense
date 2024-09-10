# Path: Software/python/main.py

import tkinter as tk
from tkinter import messagebox, ttk
from firebase_admin import credentials, db
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from data_simulation import generate_dummy_data
from firebase_integration import upload_data_to_firebase

# Country-specific contaminant limits (example for 2 countries, add more as needed)
country_limits = {
    'India': {
        'Physical': {'Suspended_solids': 495, 'TDS': 1995, 'Turbidity': 4.95},
        'Chemical': {'Arsenic': 0.0199, 'Aluminum': 0.95, 'Cadmium': 0.0095, 'Fluoride': 1.95},
        'Microbiological': {'Bacteria': 495, 'Viruses': 95},  
        'Radiological': {'Cesium': 4.95, 'Uranium': 9.95}
    },
    'USA': {
        'Physical': {'Suspended_solids': 490, 'TDS': 1990, 'Turbidity': 4.90},
        'Chemical': {'Arsenic': 0.0190, 'Aluminum': 0.90, 'Cadmium': 0.0090, 'Fluoride': 1.90},
        'Microbiological': {'Bacteria': 490, 'Viruses': 90},  
        'Radiological': {'Cesium': 4.90, 'Uranium': 9.90}
    }
}

# Initialize data lists for contaminants
physical_data = []
chemical_data = []
microbiological_data = []
radiological_data = []

# Maximum number of data points to display on the graph
MAX_POINTS = 50 

# Function to simulate data and update the GUI
def update_data():
    simulated_data = generate_dummy_data()

    physical_data.append(simulated_data['Physical'])
    chemical_data.append(simulated_data['Chemical'])
    microbiological_data.append(simulated_data['Microbiological'])
    radiological_data.append(simulated_data['Radiological'])

    # Limit the data points displayed on the graph
    if len(physical_data) > MAX_POINTS:
        physical_data.pop(0)
        chemical_data.pop(0)
        microbiological_data.pop(0)
        radiological_data.pop(0)
    
    # Update the labels
    physical_label.config(text=f"Physical: {simulated_data['Physical']} mg/L")
    chemical_label.config(text=f"Chemical: {simulated_data['Chemical']} mg/L")
    microbiological_label.config(text=f"Microbiological: {simulated_data['Microbiological']} CFU/mL")
    radiological_label.config(text=f"Radiological: {simulated_data['Radiological']} µg/L")
    
    # Upload data to Firebase
    upload_data_to_firebase(simulated_data)

    # Check for alerts based on the selected country
    check_alerts(simulated_data)
    
    # Update the graph
    update_graph()
    
    # Schedule the function to run again after 5 seconds
    root.after(5000, update_data)

# Function to check for contaminant alerts based on country limits
def check_alerts(data):
    selected_country = country_var.get()
    limits = country_limits[selected_country]

    for category, contaminants in data.items():
        for contaminant, value in contaminants.items():
            if value > limits[category][contaminant]:
                messagebox.showwarning(
                    "Contamination Alert", 
                    f"Unsafe {contaminant}: {value} exceeds {selected_country} limits!"
                )

# Function to update the graph
def update_graph():
    plot.clear()
    plot.plot([d['Suspended_solids'] for d in physical_data], label="Suspended Solids (mg/L)")
    plot.plot([d['Arsenic'] for d in chemical_data], label="Arsenic (mg/L)")
    plot.plot([d['Bacteria'] for d in microbiological_data], label="Bacteria (CFU/mL)")
    plot.plot([d['Cesium'] for d in radiological_data], label="Cesium (µg/L)")

    plot.legend()
    plot.set_title("Water Quality Trends")
    plot.set_xlabel("Time")
    plot.set_ylabel("Concentration")
    plot.grid(True)
    
    canvas.draw()

# Setup the main window
root = tk.Tk()
root.title("Waterborne Disease Detector")

# Add a dropdown to select the country
country_var = tk.StringVar(root)
country_var.set("India")  # Default country
country_menu = ttk.OptionMenu(root, country_var, "India", "India", "USA", "UK", "Pakistan", "Canada")
country_menu.pack(pady=10)

# Display Labels for different categories of contaminants
physical_label = tk.Label(root, text="Physical: - mg/L", font=("Helvetica", 16))
physical_label.pack(pady=10)

chemical_label = tk.Label(root, text="Chemical: - mg/L", font=("Helvetica", 16))
chemical_label.pack(pady=10)

microbiological_label = tk.Label(root, text="Microbiological: - CFU/mL", font=("Helvetica", 16))
microbiological_label.pack(pady=10)

radiological_label = tk.Label(root, text="Radiological: - µg/L", font=("Helvetica", 16))
radiological_label.pack(pady=10)

# Time to update the data
time_label = tk.Label(root, text="Data will update every 5 seconds", font=("Helvetica", 12))
time_label.pack(pady=10)

# Create the figure and plot
fig = Figure(figsize=(5, 4), dpi=100)
plot = fig.add_subplot(1, 1, 1)

# Display the plot in the main window
canvas = FigureCanvasTkAgg(fig, master=root)
canvas.draw()
canvas.get_tk_widget().pack(pady=20)

# Start data update loop
update_data()

# Start the Tkinter event loop
root.mainloop()
