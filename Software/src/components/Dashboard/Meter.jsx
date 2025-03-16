import React, { useEffect, useState } from "react";
import "../assets/css/Meter.css"; // Ensure you have this CSS file

const SensorGauge = ({ value, label }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const deg = (value * 177.5) / 100;
    setRotation(deg);
  }, [value]);

  return (
    <div className="gauge-container">
      <h2 className="gauge-label">{label}</h2>
      <div className="gauge">
        <ul className="meter">
          <li className="low"></li>
          <li className="normal"></li>
          <li className="high"></li>
        </ul>
        <div className="dial">
          <div className="inner" style={{ transform: `rotate(${rotation}deg)` }}>
            <div className="arrow"></div>
          </div>
        </div>
        <div className="value">{value}</div>
      </div>
    </div>
  );
};

export default SensorGauge;
