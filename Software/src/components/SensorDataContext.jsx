import React, { createContext, useState, useEffect } from "react";

export const SensorDataContext = createContext();

export const SensorDataProvider = ({ children }) => {
    const [sensorData, setSensorData] = useState({
        phValue: 0,
        tdsValue: 0,
        temperature: 0,
        turbidity: 0,
    });

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000");
                const data = await response.json();
                setSensorData(data);
            } catch (error) {
                console.error("Error fetching sensor data:", error);
            }
        };

        const interval = setInterval(fetchSensorData, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <SensorDataContext.Provider value={sensorData}>
            {children}
        </SensorDataContext.Provider>
    );
};