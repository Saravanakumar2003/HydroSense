import React, { createContext, useState, useEffect } from "react";

export const SensorDataContext = createContext();

export const SensorDataProvider = ({ children }) => {
    const [sensorData, setSensorData] = useState(() => {
        // Load initial state from localStorage or use default values
        const storedData = localStorage.getItem("sensorData");
        return storedData ? JSON.parse(storedData)[JSON.parse(storedData).length - 1] : {
            phValue: 0,
            tdsValue: 0,
            temperature: 0,
            turbidity: 0,
            count: 0,
            timestamp: null,
            ambientLightValue: 0,
            humidityValue: 0,
            pressureValue: 0,
            gasValue: 0,
            irValue: 0,
            proximityValue: 0,
            temperatureValue: 0,
        };
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
                const url = localStorage.getItem('sensorDataUrl') || 'http://127.0.0.1:5000';
                const response = await fetch(url);
                const data = await response.json();

                const updatedData = {
                    ...data,
                    count: sensorData.count + 1,
                    timestamp: new Date().toISOString(),
                };

                setSensorData(updatedData);

                if (isMonitoring) {
                    const storedData = JSON.parse(localStorage.getItem("sensorData")) || [];
                    storedData.push(updatedData);
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

    // Save the latest sensor data to localStorage whenever it changes
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("sensorData")) || [];
        storedData.push(sensorData);
        localStorage.setItem("sensorData", JSON.stringify(storedData));
    }, [sensorData]);

    return (
        <SensorDataContext.Provider value={{ ...sensorData, isMonitoring, setIsMonitoring, timer, setTimer }}>
            {children}
        </SensorDataContext.Provider>
    );
};