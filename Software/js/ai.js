const aiAPI = "https://hydrosense.pythonanywhere.com/predict";
const huggingFaceAPI = "https://api-inference.huggingface.co/models/google/gemma-2-2b-it";
const huggingFaceKey = "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";

async function ai_report() {
  try {
    const phData = JSON.parse(localStorage.getItem('phData')) || [];
    const turbidityData = JSON.parse(localStorage.getItem('turbidityData')) || [];
    const tempData = JSON.parse(localStorage.getItem('tempData')) || [];
    const timestamps = JSON.parse(localStorage.getItem('timestamps')) || [];

    const historicalData = phData.map((_, index) => ({
      timestamp: timestamps[index],
      pH: phData[index].y,
      turbidity: turbidityData[index].y,
      temperature: tempData[index].y,
    }));

    const response = await fetch(huggingFaceAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${huggingFaceKey}`
      },
      body: JSON.stringify({
        inputs: `Analyze the following water quality data and provide a detailed report with characteristics, anomalies, and a final verdict on water quality:\n\n${JSON.stringify(historicalData)}`
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const report = await response.json();
    console.log("AI Report Output:", report);

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set font to Times New Roman and size to 14
    doc.setFont("times", "normal");
    doc.setFontSize(14);

    // Add header
    doc.text("HydroSense AI Report", 105, 10, null, null, "center");
    doc.setLineWidth(0.5);
    doc.line(14, 12, 196, 12); // Add a line below the header

    // Extract AI response and convert markdown to plain text
    const aiResponse = report[0].generated_text;
    const plainText = aiResponse.replace(/[*_~`]/g, '');

    // Add AI response content with margins and text wrapping
    const textLines = doc.splitTextToSize(plainText, 180);
    let y = 26;
    textLines.forEach(line => {
      if (y > 280) { // Check if we need to add a new page
        doc.addPage();
        y = 20; // Reset y position for new page
      }
      doc.text(line, 14, y);
      y += 10; // Increment y position for next line
    });

    // Add footer with time generated and model details
    const currentTime = new Date().toLocaleString();
    const modelDetails = "Model: google/gemma-2-2b-it";
    doc.setFontSize(10);
    doc.text(`Generated on: ${currentTime}`, 14, 290);
    doc.text(modelDetails, 14, 295);

    // Save the PDF
    doc.save('HydroSense_AI_Report.pdf');
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("aiOutput").innerHTML = "AI report generation error!";
  }
}

async function fetchAIAnalysis() {
  try {
    if (latestPH === null || latestTurbidity === null || latestTemp === null) {
      throw new Error("Sensor data is not available");
    }

    const response = await fetch(aiAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pH: latestPH, Turbidity: latestTurbidity, Temperature: latestTemp }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("AI Model Output:", data);
    document.getElementById("aiOutput").innerHTML = `${data.result}`;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("aiOutput").innerHTML = "AI model error!";
  }
}