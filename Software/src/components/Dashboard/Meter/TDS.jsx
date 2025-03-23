import { useEffect, useState } from "react";

const TDSMeter = ({ tds, maxLimit = 500 }) => {
  const [currentTDS, setCurrentTDS] = useState(tds);

  useEffect(() => {
    setCurrentTDS(tds);
  }, [tds]);

  // Calculate fill percentage
  const fillHeight = Math.min((currentTDS / maxLimit) * 100, 100);

  // Determine color based on TDS levels
  const getColor = (tds) => {
    if (tds < maxLimit * 0.3) return "#2196F3"; // Blue (Pure Water)
    if (tds < maxLimit * 0.7) return "#4CAF50"; // Green (Acceptable)
    return "#F44336"; // Red (High TDS - Unsafe)
  };

  return (
    <div className="tds-meter">
      {/* Strip Container */}
      <div className="strip-container">
        <div
          className="tds-level"
          style={{
            height: `${fillHeight}%`,
            backgroundColor: getColor(currentTDS),
          }}
        ></div>
      </div>

      {/* Sensor Tip */}
      <div className="tds-tip"></div>

      {/* Display TDS Value */}
      <strong>{currentTDS} ppm</strong>
    </div>
  );
};

export default TDSMeter;
