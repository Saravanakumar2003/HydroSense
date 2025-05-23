# HydroSense Software Module

## Table of Contents
- [HydroSense Software Module](#hydrosense-software-module)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Folder Structure](#folder-structure)
  - [Technology Stack](#technology-stack)
  - [Installation \& Setup](#installation--setup)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Usage](#usage)
    - [Frontend](#frontend)

---

## Introduction
The software module of HydroSense is a comprehensive solution for monitoring water quality. It includes a React-based frontend for user interaction and a FastAPI backend for data processing, storage, and AI-powered analytics.

---

## Features
- **Real-Time Monitoring:** Displays live sensor data.
- **Report Generation:** Generate PDF, Excel, and CSV reports.
- **AI-Powered Insights:** Predict water quality using machine learning models.
- **User Authentication:** Secure login and registration with Firebase.
- **Cloud Integration:** Store and retrieve data from Firebase Firestore.
- **Responsive Design:** Optimized for desktop and mobile devices.

---

## Folder Structure
```
Software/ 
├── public/ # Static assets 
├── src/ # Source code │ 
├── components/ # Reusable React components │ 
├── pages/ # Individual pages for the app │ 
├── assets/ # Images, CSS, and other assets │ 
├── redux/ # Redux store and actions │ 
├── firebase/ # Firebase configuration 
│ └── App.js # Main app entry point 
├── .env.example # Example environment variables 
├── package.json # Node.js dependencies and scripts
 └── README.md # Documentation
```

---


---

## Technology Stack
- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** FastAPI (Python)
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Reporting:** jsPDF, XLSX

---

## Installation & Setup

### Prerequisites
- Node.js and npm
- Python 3.8 or higher
- Firebase account

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Saravanakumar2003/hydrosense.git
   cd Software

    ```

2. Install frontend dependencies:

    ```sh
    cd Software
    npm install
    ```

3. Configure environment variables:
    - Create a `.env.local` file in the `Software` directory and add your Firebase configuration.
    
4. Start the servers:
    ```sh
    npm start 
    ```
5. Access the application at `http://localhost:3000`.

## Usage

### Frontend
- Navigate to http://localhost:3000 to access the React app.
- Features include:
    - Dashboard for real-time monitoring.
    - Report generation and download.
    - User profile and settings.

