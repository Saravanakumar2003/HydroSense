import React, { createContext, useState, useEffect } from "react";

export const SensorDataContext = createContext();

export const SensorDataProvider = ({ children }) => {
    const [sensorData, setSensorData] = useState(() => {
        const storedData = localStorage.getItem("sensorData");
        return storedData
            ? JSON.parse(storedData)[JSON.parse(storedData).length - 1]
            : {
                  phValue: 0,
                  tdsValue: 0,
                  temperature: 0,
                  turbidity: 0,
                  count: 0,
                  timestamp: null,
              };
    });

    const [hardwareData, setHardwareData] = useState(() => {
        const storedHardwareData = localStorage.getItem("hardwareData");
        return storedHardwareData
            ? JSON.parse(storedHardwareData)
            : {
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
    const [alerts, setAlerts] = useState([]);

    const calculateWaterQuality = () => {
        const { phValue, turbidity, temperature, tdsValue } = sensorData;

        if (
            phValue >= 6 &&
            phValue <= 8 &&
            turbidity <= 5 &&
            temperature >= 25 &&
            temperature <= 30 &&
            tdsValue <= 500
        ) {
            return "Good";
        } else if (
            (phValue >= 5 && phValue < 6) ||
            (phValue > 8 && phValue <= 9) ||
            (turbidity > 5 && turbidity <= 10) ||
            (temperature >= 20 && temperature < 25) ||
            (temperature > 30 && temperature <= 35) ||
            (tdsValue > 500 && tdsValue <= 1000)
        ) {
            return "Average";
        } else if (
            (phValue >= 4 && phValue < 5) ||
            (phValue > 9 && phValue <= 10) ||
            (turbidity > 10 && turbidity <= 20) ||
            (temperature >= 15 && temperature < 20) ||
            (temperature > 35 && temperature <= 40) ||
            (tdsValue > 1000 && tdsValue <= 1500)
        ) {
            return "Needs Attention";
        } else {
            return "Bad";
        }
    };

    const checkForAlerts = () => {
        const { phValue, turbidity, temperature, tdsValue } = sensorData;
        const newAlerts = [];

        if (phValue < 6 || phValue > 8) {
            newAlerts.push(`pH value out of range: ${phValue}`);
        }
        if (turbidity > 5) {
            newAlerts.push(`Turbidity too high: ${turbidity} NTU`);
        }
        if (temperature < 25 || temperature > 30) {
            newAlerts.push(`Temperature out of range: ${temperature}°C`);
        }
        if (tdsValue > 500) {
            newAlerts.push(`TDS value too high: ${tdsValue} ppm`);
        }

        if (newAlerts.length > 0) {
            // Save alerts to localStorage
            const storedAlerts = JSON.parse(localStorage.getItem("alerts")) || [];
            const updatedAlerts = [...newAlerts, ...storedAlerts];
            localStorage.setItem("alerts", JSON.stringify(updatedAlerts));

            // Update state with new alerts
            setAlerts((prevAlerts) => {
                const updatedAlerts = [...newAlerts, ...prevAlerts];
                return updatedAlerts.slice(0, 3); // Keep only the last 3 alerts
            });
        }
    };

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
                const url = localStorage.getItem("sensorDataUrl") || "http://127.0.0.1:5000";
                const response = await fetch(url);
                const data = await response.json();

                const updatedSensorData = {
                    phValue: data.phValue,
                    tdsValue: data.tdsValue,
                    temperature: data.temperature,
                    turbidity: data.turbidity,
                    count: sensorData.count + 1,
                    timestamp: new Date().toISOString(),
                };

                const updatedHardwareData = {
                    ambientLightValue: data.ambientLightValue,
                    humidityValue: data.humidityValue,
                    pressureValue: data.pressureValue,
                    gasValue: data.gasValue,
                    irValue: data.irValue,
                    proximityValue: data.proximityValue,
                    temperatureValue: data.temperatureValue,
                };

                setSensorData(updatedSensorData);
                setHardwareData(updatedHardwareData);

                if (isMonitoring) {
                    // Store only the latest data in localStorage
                    const storedSensorData = JSON.parse(localStorage.getItem("sensorData")) || [];
                    storedSensorData.push(updatedSensorData);
                    localStorage.setItem("sensorData", JSON.stringify(storedSensorData));

                    localStorage.setItem("hardwareData", JSON.stringify(updatedHardwareData));
                }

                checkForAlerts(); // Check for alerts whenever new data is fetched
            } catch (error) {
                console.error("Error fetching sensor data:", error);
            }
        };

        if (isMonitoring) {
            fetchInterval = setInterval(fetchSensorData, 5000); // Fetch data every 5 seconds
        }

        return () => clearInterval(fetchInterval);
    }, [isMonitoring, sensorData.count]);

    return (
        <SensorDataContext.Provider
            value={{
                ...sensorData,
                hardwareData,
                isMonitoring,
                setIsMonitoring,
                timer,
                setTimer,
                alerts,
                waterQuality: calculateWaterQuality(),
            }}
        >
            {children}
        </SensorDataContext.Provider>
    );
};