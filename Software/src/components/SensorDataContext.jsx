import React, { createContext, useState, useEffect } from "react";

export const SensorDataContext = createContext();

export const SensorDataProvider = ({ children }) => {
    const [sensorData, setSensorData] = useState({
        phValue: 0,
        tdsValue: 0,
        temperature: 0,
        turbidity: 0,
        count: 0,
        timestamp: null,
    });
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval;

        if (isMonitoring) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isMonitoring]);

    useEffect(() => {
        let fetchInterval;

        const fetchSensorData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000");
                const data = await response.json();

                // Add count and timestamp
                const updatedData = {
                    ...data,
                    count: sensorData.count + 1,
                    timestamp: new Date().toISOString(),
                };

                setSensorData(updatedData);

                // Store data in local storage
                if (isMonitoring) {
                    const storedData = JSON.parse(localStorage.getItem("sensorData")) || [];
                    storedData.push(updatedData); // Append new data to the array
                    localStorage.setItem("sensorData", JSON.stringify(storedData));
                }
            } catch (error) {
                console.error("Error fetching sensor data:", error);
            }
        };

        if (isMonitoring) {
            fetchInterval = setInterval(fetchSensorData, 5000);
        }

        return () => clearInterval(fetchInterval);
    }, [isMonitoring, sensorData.count]);

    return (
        <SensorDataContext.Provider value={{ ...sensorData, isMonitoring, setIsMonitoring, timer, setTimer }}>
            {children}
        </SensorDataContext.Provider>
    );
};