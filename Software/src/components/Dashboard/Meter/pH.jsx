import { useEffect, useState } from "react";

const PHMeterTestTube = ({ ph, maxPH = 14 }) => {
  const [currentPH, setCurrentPH] = useState(ph);

  useEffect(() => {
    setCurrentPH(ph);
  }, [ph]);

  // Calculate liquid level (percentage height based on pH)
  const liquidHeight = (currentPH / maxPH) * 100;

  // Determine liquid color based on pH range
  const getLiquidColor = (pH) => {
    if (pH <= 3) return "#FF0000"; // Strong Acid (Red)
    if (pH <= 6) return "#FFA500"; // Weak Acid (Orange)
    if (pH === 7) return "#00FF00"; // Neutral (Green)
    if (pH <= 10) return "#00BFFF"; // Weak Base (Blue)
    return "#0000FF"; // Strong Base (Dark Blue)
  };

  return (
    <div>
      <div className="ph-test-tube">
        <div 
          className="ph-liquid" 
          style={{ height: `${liquidHeight}%`, background: getLiquidColor(currentPH) }} 
        ></div>
      </div>
      <div className="ph-label">pH {currentPH}</div>
    </div>
  );
};

export default PHMeterTestTube;
