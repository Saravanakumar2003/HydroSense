# Portable Water Conatmination Detection Device

## Table of Contents

- [Portable Water Conatmination Detection Device](#portable-water-conatmination-detection-device)
  - [Table of Contents](#table-of-contents)
- [Hydrosense](#hydrosense)
  - [Overview](#overview)
  - [Features](#features)
  - [Folder Structure](#folder-structure)
  - [Hardware Components](#hardware-components)
  - [Software Stack](#software-stack)
  - [API Endpoints](#api-endpoints)
  - [How It Works](#how-it-works)
  - [Installation \& Setup](#installation--setup)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Testing \& Simulation](#testing--simulation)
  - [Security Measures](#security-measures)
  - [Contribution](#contribution)
  - [Status](#status)
  - [References](#references)

# Hydrosense

## Overview
Hydrosense is a portable water contamination detection system designed for real-time monitoring of water quality. It utilizes IoT-enabled sensors and AI-driven analytics to provide actionable insights about water conditions.

## Features
- **Real-Time Monitoring:** Continuously tracks water parameters like pH, turbidity, TDS, and temperature.
- **AI-Powered Analysis:** Uses machine learning to detect anomalies and predict water quality.
- **Web Dashboard:** Interactive UI for viewing sensor data, charts, and reports.
- **Cloud Backups:** Stores data securely on Firebase.
- **Offline Mode:** Enables testing with simulated data when hardware is unavailable.
- **User Authentication:** Secure login via Firebase with Google/GitHub authentication.
- **AI Chatbot:** Provides insights on collected data using Hugging Face API.
- **Custom Alerts:** Notifies users when water quality exceeds safe limits.

## Folder Structure
```
├── ai/                 # AI and data processing modules
├── data/               # Logs and simulated datasets
├── docs/               # Documentation and presentations
├── Hardware/           # Arduino code and simulations
├── Software/           # Frontend and backend source code
├── tests/              # Unit tests and test reports
```

## Hardware Components
- **Microcontroller:** Vega Aries IoT V2.0
- **Sensors:** pH, Turbidity, TDS, Temperature
- **Communication:** Wi-Fi-based API server
- **Power Supply:** Rechargeable battery

## Software Stack
- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** FastAPI (Python)
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth with Google/GitHub sign-in

## API Endpoints
| Endpoint | Description |
|----------|-------------|
| `/` | Fetches all sensor data in JSON format |
| `/buzzer` | Triggers buzzer for testing |
| `/ask` | AI chatbot for querying sensor data |

## How It Works
1. **Sensor Data Collection:** Vega board collects real-time water parameters and transmits via Wi-Fi.
2. **Data Processing:** The backend processes and stores data in local storage and Firebase.
3. **Visualization:** The web app displays sensor readings, trends, and AI-driven insights.
4. **Alerts & Reports:** If a parameter exceeds thresholds, alerts are triggered, and users can download reports in PDF/Excel.

## Installation & Setup
### Prerequisites
- Node.js & npm
- Python & pip
- Firebase account

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/hydrosense.git
   cd hydrosense
   ```
2. Install dependencies:
   ```sh
   npm install  # For frontend
   pip install -r requirements.txt  # For backend
   ```
3. Configure environment variables:
   - `.env.local` for React app
   - `.env` for FastAPI backend
4. Start the servers:
   ```sh
   npm start  # Start frontend
   python main.py  # Start backend
   ```

## Testing & Simulation
- **Test Mode:** Enables API endpoint to serve simulated data for frontend testing.
- **Unit Tests:** Located in `/tests/` folder.

## Security Measures
- **Authentication:** Email verification and CAPTCHA for added security.
- **Data Privacy:** Cloud data is stored per user ID, ensuring restricted access.

## Contribution
Contributions are welcome! Fork the repo, create a branch, and submit a pull request.

## Status
The project is currently in the development phase. The team is working on integrating the hardware components with the software and cloud services. 

## References

- [Project Presentation](docs/presentation)
- [Project Reports](docs/reports)
- [Research Papers](docs/references)