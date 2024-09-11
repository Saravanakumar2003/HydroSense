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
update_timer = 0

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
    plot1.clear()
    plot2.clear()
    plot3.clear()
    plot4.clear()
    
    # Plot the data for physical contaminants
    plot1.plot([d['Suspended_solids'] for d in physical_data], label="Suspended Solids (mg/L)")
    plot1.plot([d['TDS'] for d in physical_data], label="TDS (mg/L)")
    plot1.plot([d['Turbidity'] for d in physical_data], label="Turbidity (NTU)")
    
    # Plot 2 the data for chemical contaminants
    plot2.plot([d['Arsenic'] for d in chemical_data], label="Arsenic (mg/L)")
    plot2.plot([d['Aluminum'] for d in chemical_data], label="Aluminum (mg/L)")
    plot2.plot([d['Cadmium'] for d in chemical_data], label="Cadmium (mg/L)")
    plot2.plot([d['Fluoride'] for d in chemical_data], label="Fluoride (mg/L)")
    
    # Plot 3 the data for microbiological contaminants
    plot3.plot([d['Bacteria'] for d in microbiological_data], label="Bacteria (CFU/mL)")
    plot3.plot([d['Viruses'] for d in microbiological_data], label="Viruses (CFU/mL)")
    
    # Plot 4 the data for radiological contaminants
    plot4.plot([d['Cesium'] for d in radiological_data], label="Cesium (µg/L)")
    plot4.plot([d['Uranium'] for d in radiological_data], label="Uranium (µg/L)")
    

    plot1.legend(fontsize='small')
    plot2.legend(fontsize='small')
    plot3.legend(fontsize='small')
    plot4.legend(fontsize='small')
    
    plot1.set_title("Physical Contaminants", fontsize='small')
    plot2.set_title("Chemical Contaminants", fontsize='small')
    plot3.set_title("Microbiological Contaminants", fontsize='small')
    plot4.set_title("Radiological Contaminants", fontsize='small')
    
    plot1.set_xlabel("Count", fontsize='small')
    plot2.set_xlabel("Count", fontsize='small')
    plot3.set_xlabel("Count", fontsize='small')
    plot4.set_xlabel("Count", fontsize='small')
    
    plot1.set_ylabel("Concentration (mg/L)", fontsize='small')
    plot2.set_ylabel("Concentration (mg/L)", fontsize='small')
    plot3.set_ylabel("Concentration (CFU/mL)", fontsize='small')
    plot4.set_ylabel("Concentration (µg/L)", fontsize='small')
    
    
    canvas.draw()

# Setup the main window
root = tk.Tk()
root.title("Waterborne Disease Detector")

# Add a dropdown to select the country
country_var = tk.StringVar(root)
country_var.set("India")  # Default country
tk.Label(root, text="Select Country:").pack(pady=5)
country_menu = ttk.OptionMenu(root, country_var, "India", "India", "USA")
country_menu.pack(pady=10)

# Display Labels for different categories of contaminants
physical_label = tk.Label(root, text="Physical: - mg/L", font=("Helvetica", 8))
physical_label.pack(pady=5)

chemical_label = tk.Label(root, text="Chemical: - mg/L", font=("Helvetica", 8))
chemical_label.pack(pady=5)

microbiological_label = tk.Label(root, text="Microbiological: - CFU/mL", font=("Helvetica", 8))
microbiological_label.pack(pady=5)

radiological_label = tk.Label(root, text="Radiological: - µg/L", font=("Helvetica", 8))
radiological_label.pack(pady=5)

# Count down timer for next data update 
timer_label = tk.Label(root, text="Next data update in: 5 seconds", font=("Helvetica", 8))
timer_label.pack(pady=5)

# Countdown timer function
def countdown(count):
    timer_label.config(text=f"Next data update in: {count} seconds")
    if count > 0:
        root.after(1000, countdown, count - 1)
    else:
        root.after(1000, countdown, 5)


tk.Label(root, text="Graphical Representation of Contaminants", font=("Helvetica", 10)).pack(pady=5)

# Create the figure and plot
fig = Figure(figsize=(10, 8), dpi=100)
plot1 = fig.add_subplot(2, 2, 1)
plot2 = fig.add_subplot(2, 2, 2)
plot3 = fig.add_subplot(2, 2, 3)
plot4 = fig.add_subplot(2, 2, 4)


# Adjust layout to prevent overlap and add padding
fig.tight_layout(pad=5)
    
# Display the plot in the main window
canvas = FigureCanvasTkAgg(fig, master=root)
canvas.draw()
canvas.get_tk_widget().pack(pady=10)

# Start data update loop
update_data()

# Start countdown timer
countdown(5)

# Start the Tkinter event loop
root.mainloop()
