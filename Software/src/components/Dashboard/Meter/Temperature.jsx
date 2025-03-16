import { useEffect, useState } from "react";

const TemperatureMeter = ({ temperature, maxLimit = 100 }) => {
  const [currentTemp, setCurrentTemp] = useState(temperature);

  useEffect(() => {
    setCurrentTemp(temperature);
  }, [temperature]);

  // Calculate fill percentage
  const fillHeight = Math.min((currentTemp / maxLimit) * 100, 100);

  // Determine color based on temperature
  const getColor = (temp) => {
    if (temp < maxLimit * 0.5) return "#4CAF50"; // Green (Safe)
    if (temp < maxLimit * 0.75) return "#FFC107"; // Yellow (Warning)
    return "#F44336"; // Red (Danger)
  };

  return (
    <div className="small-meter">
      {/* Thermometer Glass */}
      <div className="small-glass">
        <div
          className="small-amount"
          style={{
            height: `${fillHeight}%`,
            backgroundColor: getColor(currentTemp),
          }}
        ></div>
      </div>

      {/* Bulb at the Bottom */}
      <div className="small-bulb">
        <div className="small-red-circle" style={{ backgroundColor: getColor(currentTemp) }}></div>
        <div className="small-filler" style={{ backgroundColor: getColor(currentTemp) }}></div>
      </div>

      {/* Display Temperature Value */}
      <strong className="small-total">{currentTemp}°C</strong>
    </div>
  );
};

export default TemperatureMeter;
