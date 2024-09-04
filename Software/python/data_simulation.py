import random

def generate_dummy_data():
    """Simulate sensor data for heavy metals, bacteria, and chemicals."""
    heavy_metals = round(random.uniform(0, 100), 2)  # e.g., ppm levels
    bacteria = round(random.uniform(0, 500), 2)  # e.g., CFU/mL
    chemicals = round(random.uniform(0, 50), 2)  # e.g., mg/L

    return heavy_metals, bacteria, chemicals
