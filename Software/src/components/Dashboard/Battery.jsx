import React, { useState, useEffect } from "react";
import "../assets/css/Battery.css";

const Battery = () => {
    const [batteryLevel, setBatteryLevel] = useState(0);
    const [charging, setCharging] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState("Not calculated");

    useEffect(() => {
        navigator.getBattery().then((battery) => {
            const updateBatteryInfo = () => {
                setBatteryLevel(battery.level * 100);
                setCharging(battery.charging);
                if (!battery.charging) {
                    const hours = Math.floor(battery.dischargingTime / 3600);
                    const minutes = Math.floor(battery.dischargingTime / 60) % 60;
                    setTimeRemaining(
                        hours > 0 || minutes > 0
                            ? `${hours} hour(s) and ${minutes} minute(s)`
                            : "Not calculated"
                    );
                } else {
                    setTimeRemaining("Charging");
                }
            };

            updateBatteryInfo();
            battery.addEventListener("levelchange", updateBatteryInfo);
            battery.addEventListener("chargingchange", updateBatteryInfo);
            battery.addEventListener("dischargingtimechange", updateBatteryInfo);

            return () => {
                battery.removeEventListener("levelchange", updateBatteryInfo);
                battery.removeEventListener("chargingchange", updateBatteryInfo);
                battery.removeEventListener("dischargingtimechange", updateBatteryInfo);
            };
        });
    }, []);

    return (
        <div className="battery-panel">
                <div className="battery-info">
                <div className="battery">
                    <div className="battery-meter">
                        <meter
                            id="batterymeter"
                            value={batteryLevel}
                            min="0"
                            max="100"
                            low="10"
                            high="50"
                        />
                    </div>
                </div>
                <div className="battery-status">
                    <h2>{Math.floor(batteryLevel)}%</h2>
                    <h4>Battery life remaining:</h4>
                    <h4>{timeRemaining}</h4>
                </div>
            </div>
        </div>
    );
};

export default Battery;
