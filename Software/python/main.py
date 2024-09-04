import tkinter as tk
from tkinter import messagebox
import random
import time
import firebase_admin
from firebase_admin import credentials, db
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from data_simulation import generate_dummy_data
from firebase_integration import upload_data_to_firebase

# Initialize data lists
heavy_metals_data = []
bacteria_data = []
chemicals_data = []

# Function to simulate data and update the GUI
def update_data():
    heavy_metals, bacteria, chemicals = generate_dummy_data()
    
    # Update the labels
    heavy_metals_label.config(text=f"Heavy Metals: {heavy_metals} ppm")
    bacteria_label.config(text=f"Bacteria: {bacteria} CFU/mL")
    chemicals_label.config(text=f"Chemicals: {chemicals} mg/L")
    
    # Upload to Firebase
    upload_data_to_firebase(heavy_metals, bacteria, chemicals)
    
    # Check for alerts
    if heavy_metals > 98: 
        messagebox.showwarning("Contamination Alert", f"Unsafe Heavy Metal:{heavy_metals} contaminant levels detected!")
    if bacteria > 490:
        messagebox.showwarning("Contamination Alert", f"Unsafe Bacteria:{bacteria} contaminant levels detected!")
    if chemicals > 48:
        messagebox.showwarning("Contamination Alert", f"Unsafe Chemical:{chemicals} contaminant levels detected!")
        
    # Update data lists
    heavy_metals_data.append(heavy_metals)
    bacteria_data.append(bacteria)
    chemicals_data.append(chemicals)
    
    # Update the graph
    update_graph()
    
    # Schedule the function to run again after 5 seconds
    root.after(5000, update_data)

# Function to update the graph
def update_graph():
    plot.clear()
    plot.plot(heavy_metals_data, label="Heavy Metals (ppm)")
    plot.plot(bacteria_data, label="Bacteria (CFU/mL)")
    plot.plot(chemicals_data, label="Chemicals (mg/L)")
    
    plot.legend()
    plot.set_title("Water Quality Trends")
    plot.set_xlabel("Count")
    plot.set_ylabel("Concentration")
    plot.grid(True)
    
    canvas.draw()

# Setup the main window
root = tk.Tk()
root.title("Waterborne Disease Detector")

# Display Labels
heavy_metals_label = tk.Label(root, text="Heavy Metals: - ppm", font=("Helvetica", 16))
heavy_metals_label.pack(pady=10)

bacteria_label = tk.Label(root, text="Bacteria: - CFU/mL", font=("Helvetica", 16))
bacteria_label.pack(pady=10)

chemicals_label = tk.Label(root, text="Chemicals: - mg/L", font=("Helvetica", 16))
chemicals_label.pack(pady=10)

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