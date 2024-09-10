import random

def generate_dummy_data():
    """Simulate sensor data for all categories of contaminants."""
    data = {
        'Physical': {
            'Suspended_solids': round(random.uniform(0, 500), 2),
            'TDS': round(random.uniform(0, 2000), 2),
            'Turbidity': round(random.uniform(0, 5), 2)
            
        },
        'Chemical': {
            'Arsenic': round(random.uniform(0, 0.02), 5),
            'Aluminum': round(random.uniform(0, 1), 2),
            'Cadmium': round(random.uniform(0, 0.0100), 5),
            'Fluoride': round(random.uniform(0, 2), 2),
        },
        'Microbiological': {
            'Bacteria': round(random.uniform(0, 500), 2),
            'Viruses': round(random.uniform(0, 100), 2)
        },
        'Radiological': {
            'Cesium': round(random.uniform(0, 5), 2),
            'Uranium': round(random.uniform(0, 10), 2),
        }
    }
    return data
