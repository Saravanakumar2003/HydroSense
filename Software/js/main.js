let latestPH = null;
let latestTemp = null;
let latestTurbidity = null;

const vegaIP = "http://192.168.104.16";
const aiAPI = "http://127.0.0.1:5000/predict";

const phChartCtx = document.getElementById('phChart').getContext('2d');
const turbidityChartCtx = document.getElementById('turbidityChart').getContext('2d');
const tempChartCtx = document.getElementById('tempChart').getContext('2d');

const phChart = new Chart(phChartCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'pH',
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      fill: false
    }]
  },
  options: {
    scales: {
      x: { type: 'time', time: { unit: 'minute' } },
      y: { beginAtZero: true, max: 14 }
    }
  }
});

const turbidityChart = new Chart(turbidityChartCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Turbidity',
      data: [],
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      fill: false
    }]
  },
  options: {
    scales: {
      x: { type: 'time', time: { unit: 'minute' } },
      y: { beginAtZero: true, max: 100 }
    }
  }
});

const tempChart = new Chart(tempChartCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Temperature',
      data: [],
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      fill: false
    }]
  },
  options: {
    scales: {
      x: { type: 'time', time: { unit: 'minute' } },
      y: { beginAtZero: true, max: 35 }
    }
  }
});

function updateGauge(value) {
  let angle = (value / 100) * 180 - 90;
  document.getElementById("turbidityIndicator").style.transform = `rotate(${angle}deg)`;
  document.getElementById("tdValue").innerText = value.toFixed(0)
}

function updatePHScale(value) {
  document.getElementById("phSlider").value = value;
  document.getElementById("phValue").innerText = value.toFixed(1);
}

function updateCharts() {
  const now = new Date();
  const phData = JSON.parse(localStorage.getItem('phData')) || [];
  const turbidityData = JSON.parse(localStorage.getItem('turbidityData')) || [];
  const tempData = JSON.parse(localStorage.getItem('tempData')) || [];

  phData.push({ x: now, y: latestPH });
  turbidityData.push({ x: now, y: latestTurbidity });
  tempData.push({ x: now, y: latestTemp });

  localStorage.setItem('phData', JSON.stringify(phData));
  localStorage.setItem('turbidityData', JSON.stringify(turbidityData));
  localStorage.setItem('tempData', JSON.stringify(tempData));

  phChart.data.labels = phData.map(d => d.x);
  phChart.data.datasets[0].data = phData.map(d => d.y);
  phChart.update();

  turbidityChart.data.labels = turbidityData.map(d => d.x);
  turbidityChart.data.datasets[0].data = turbidityData.map(d => d.y);
  turbidityChart.update();

  tempChart.data.labels = tempData.map(d => d.x);
  tempChart.data.datasets[0].data = tempData.map(d => d.y);
  tempChart.update();
}

async function fetchSensorData() {
  try {
    const response = await fetch(vegaIP);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Received Data:", data);

    latestPH = data.pH !== null && data.pH !== undefined ? data.pH : 0;
    latestTurbidity = data.Turbidity !== null && data.Turbidity !== undefined ? data.Turbidity : 0;
    latestTemp = data.Temperature !== null && data.Temperature !== undefined ? data.Temperature : 0;

    document.getElementById("sensorData").innerHTML = `
    <table style="margin: 0 auto; border-collapse: collapse;">
      <tr>
        <th style="border: 1px solid #000; padding: 8px;">Parameter</th>
        <th style="border: 1px solid #000; padding: 8px;">Value</th>
      </tr>
      <tr>
        <td style="border: 1px solid #000; padding: 8px;">pH</td>
        <td style="border: 1px solid #000; padding: 8px;">${latestPH}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #000; padding: 8px;">Turbidity</td>
        <td style="border: 1px solid #000; padding: 8px;">${latestTurbidity}%</td>
      </tr>
      <tr>
        <td style="border: 1px solid #000; padding: 8px;">Temperature</td>
        <td style="border: 1px solid #000; padding: 8px;">${latestTemp}°C</td>
      </tr>
    </table>
  `;

    updateGauge(latestTurbidity);
    updatePHScale(latestPH);
    updateCharts();

    // Call fetchAIAnalysis after successfully fetching sensor data
    fetchAIAnalysis();
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("sensorData").innerHTML = "Error fetching data!";
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

fetchSensorData();

// Set up periodic updates every 60 seconds (60000 milliseconds)
setInterval(() => {
  fetchSensorData();
}, 60000);