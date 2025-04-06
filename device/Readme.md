# Hardware Module - Hydrosense

The `Hardware/` directory contains all firmware and scripts necessary for interfacing with IoT sensors and the Vega Aries IoT v2.0 board.

## Directory Structure

```
Hardware/
├── firmware/
├── schematics/
└── simulations/
```

### 1. `firmware/` - Embedded Software

This folder contains the firmware for the **Vega Aries IoT v2.0** board, enabling real-time water quality monitoring.

#### Flashing the Firmware
1. Install **Arduino IDE**.
2. Connect the Vega Aries board via USB.
3. Open the firmware sketch (`hardware/firmware/main.ino`).
4. Select the correct board and port.
5. Click **Upload**.

Example firmware snippet:
```c
#include <SPI.h>
#include <WiFiNINA.h>
#include <Wire.h>
#include <Arduino_APDS9960.h>

char ssid[] = "MyVegaAP";        // AP name
char pass[] = "myAPpassword";    // AP password (min. 8 characters)
int status = WL_IDLE_STATUS;
```

---

### 2. `schematics/` - Circuit Diagrams

This folder contains wiring diagrams and circuit schematics for the hardware setup. Key components include:
- **Vega Aries IoT v2.0** (Microcontroller)
- **pH Sensor** (Analog input)
- **Turbidity Sensor** (Analog input)
- **TDS Sensor** (Analog input)
- **Temperature Sensor** (I2C communication)

#### Viewing Schematics
- The schematics are provided in **PNG** format for easy viewing and printing.
- The circuit diagrams are designed to be clear and easy to follow, ensuring correct connections between the sensors and the Vega Aries board.
- The software used for creating the schematics is **Circuit Designer**. The ckt files are also included for users who wish to modify the designs.

---

### 3. `simulations/` - Hardware Testing

This folder contains **Python-based sensor simulations** for users who do not have the physical hardware.

#### Running a Simulation
```bash
cd Hardware/simulations
python simulate_sensors.py
```

This will generate simulated sensor readings and send them to the software module.

---

## Dependencies
Install the required libraries for Arduino:
- `WiFiNINA`
- `SPI`
- `Wire`

## Conclusion
The `Hardware/` folder provides all necessary resources for setting up and testing the physical sensors of Hydrosense, whether using actual devices or simulations.

