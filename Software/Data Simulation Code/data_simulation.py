import random
import time

def generate_dummy_data():
    """Simulate sensor data for all categories of contaminants."""
    return {
        "sensor_data": [
            {
                "Chemical": {
                    "Aluminum": round(random.uniform(0, 1), 3),
                    "Arsenic": round(random.uniform(0, 0.02), 5),
                    "Cadmium": round(random.uniform(0, 0.01), 5),
                    "Fluoride": round(random.uniform(0, 2), 2)
                },
                "Microbiological": {
                    "Bacteria": round(random.uniform(0, 500), 2),
                    "Viruses": round(random.uniform(0, 100), 2)
                },
                "Physical": {
                    "Suspended_solids": round(random.uniform(0, 500), 2),
                    "TDS": round(random.uniform(0, 2000), 2),
                    "Turbidity": round(random.uniform(0, 10), 2)
                },
                "Radiological": {
                    "Cesium": round(random.uniform(0, 5), 2),
                    "Uranium": round(random.uniform(0, 5), 2)
                },
                "timestamp": time.time()
            }
        ]
    }