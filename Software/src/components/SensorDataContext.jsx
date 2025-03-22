// filepath: /Users/saravana-tt0779/Documents/Code/HydroSense/software/src/components/SensorDataContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const SensorDataContext = createContext();

export const SensorDataProvider = ({ children }) => {
    const [sensorData, setSensorData] = useState({
        phValue: 0,
        tdsValue: 0,
        temperature: 0,
        turbidity: 0,
    });
    const [isMonitoring, setIsMonitoring] = useState(false);

    useEffect(() => {
        let interval;

        const fetchSensorData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000");
                const data = await response.json();
                setSensorData(data);
            } catch (error) {
                console.error("Error fetching sensor data:", error);
            }
        };

        if (isMonitoring) {
            interval = setInterval(fetchSensorData, 5000);
        }

        return () => clearInterval(interval);
    }, [isMonitoring]);

    return (
        <SensorDataContext.Provider value={{ ...sensorData, setIsMonitoring }}>
            {children}
        </SensorDataContext.Provider>
    );
};