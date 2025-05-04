# Hydrosense - Ensuring clean and safe water for all through IoT

## Table of Contents

- [Hydrosense - Ensuring clean and safe water for all through IoT](#hydrosense---ensuring-clean-and-safe-water-for-all-through-iot)
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
Hydrosense is an IoT-based water distribution system designed to ensure clean and safe drinking water. It utilizes a Vega Aries IoT V2.0 microcontroller to collect real-time data from various sensors, including preesure, pH, turbidity, TDS, and temperature. The data is processed using machine learning algorithms to detect anomalies and predict water quality. The system features a web dashboard for visualization, cloud storage for data backup, and an AI chatbot for insights.

## Features
- **Real-Time Monitoring:** Continuously tracks water parameters like pH, turbidity, TDS, and temperature.
- **AI-Powered Analysis:** Uses machine learning to detect anomalies and predict water quality.
- **Web Dashboard:** Interactive UI for viewing sensor data, charts, and reports.
- **Cloud Backups:** Stores data securely on Firebase.
- **Test Mode:** Enables testing with simulated data when hardware is unavailable.
- **User Authentication:** Secure login via Firebase with Google/GitHub authentication.
- **AI Chatbot:** Provides insights on collected data using Hugging Face API.
- **Custom Alerts:** Notifies users when water quality exceeds safe limits.

## Folder Structure
```
├── ai/                 # AI and data processing modules
├── docs/               # Documentation and presentations
├── device/           # Arduino code and simulations
├── web/           # Frontend and backend source code
├── tests/              # Unit tests and test reports
├── README.md           # Project overview and instructions
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
| `/predict` | Predicts water quality using AI model |
| `/report` | Generates PDF/Excel reports |

## How It Works
1. **Sensor Data Collection:** Vega board collects real-time water parameters and transmits via Wi-Fi.
2. **Data Processing:** The backend processes and stores data in local storage or Firebase.
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
   git clone https://github.com/Saravanakumar2003/hydrosense.git
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
- **Secure Communication:** HTTPS for all API requests.
- **Environment Variables:** Sensitive data is stored in environment variables, not hardcoded.


## Contribution
Contributions are welcome! Fork the repo, create a branch, and submit a pull request.

## Status
The project is currently in the early stages of development. The hardware and software is fully functional, but further testing and optimization are needed. 

The device is undergoing testing in real-world conditions, and the AI model is being fine-tuned for better accuracy. The web app is also fully functional, but additional features and improvements are planned.

## References

- [Project Presentation](docs/presentation)
- [Project Reports](docs/reports)
- [References](docs/references)