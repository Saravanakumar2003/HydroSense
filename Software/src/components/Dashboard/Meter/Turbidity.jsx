import { useEffect, useState } from "react";

const TurbidityMeter = ({ turbidity, maxLimit = 100 }) => {
  const [currentTurbidity, setCurrentTurbidity] = useState(turbidity);

  useEffect(() => {
    setCurrentTurbidity(turbidity);
  }, [turbidity]);

  // Calculate fill percentage
  const fillHeight = Math.min((currentTurbidity / maxLimit) * 100, 100);

  // Determine color based on turbidity levels
  const getColor = (turbidity) => {
    if (turbidity < maxLimit * 0.3) return "#2196F3"; // Blue (Clear Water)
    if (turbidity < maxLimit * 0.7) return "#FFC107"; // Yellow (Moderate Turbidity)
    return "#795548"; // Brown (High Turbidity)
  };

  return (
    <div className="turbidity-meter">
      {/* Water Drop Container */}
      <div className="water-drop">
        <div
          className="turbidity-level"
          style={{
            height: `${fillHeight}%`,
            backgroundColor: getColor(currentTurbidity),
          }}
        ></div>
      </div>

      {/* Base Circle */}
      <div className="turbidity-base">
        <div
          className="base-circle"
          style={{ backgroundColor: getColor(currentTurbidity) }}
        ></div>
        <div
          className="filler"
          style={{ backgroundColor: getColor(currentTurbidity) }}
        ></div>
      </div>

      {/* Display Turbidity Value */}
      <strong>{currentTurbidity} NTU</strong>
    </div>
  );
};

export default TurbidityMeter;
