let latestPH = null;
let latestTemp = null;
let latestTurbidity = null;

const vegaIP = "http://192.168.4.1:80";
const wifiStatusEndpoint = `${vegaIP}/wifi-status`;

function updateGauge(value) {
  let angle = (value / 100) * 180 - 90;
  document.getElementById("turbidityIndicator").style.transform = `rotate(${angle}deg)`;
  document.getElementById("tdValue").innerText = value.toFixed(0);
}

function updatePHScale(value) {
  document.getElementById("phSlider").value = value;
  document.getElementById("phValue").innerText = value.toFixed(1);
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
          <th style="border: 1px solid #000; padding: 8px;">Limit</th>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 8px;">pH</td>
          <td style="border: 1px solid #000; padding: 8px;">${latestPH}</td>
          <td style="border: 1px solid #000; padding: 8px;">6-8</td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 8px;">Turbidity</td>
          <td style="border: 1px solid #000; padding: 8px;">${latestTurbidity}%</td>
          <td style="border: 1px solid #000; padding: 8px;">85-100</td>
        </tr>
        <tr>
          <td style="border: 1px solid #000; padding: 8px;">Temperature</td>
          <td style="border: 1px solid #000; padding: 8px;">${latestTemp}°C</td>
          <td style="border: 1px solid #000; padding: 8px;">15-35</td>
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

fetchSensorData();

// Set up periodic updates every 60 seconds (60000 milliseconds)
setInterval(() => {
  fetchSensorData();
}, 60000);



  /* ------------ Wifi status ----------------- */

  //   #include <WiFiNINA.h>
  // #include <WiFiServer.h>

  // WiFiServer server(80);

  // void setup() {
  //   // Initialize Wi-Fi and start server
  //   WiFi.begin(ssid, password);
  //   server.begin();
  // }

  // void loop() {
  //   WiFiClient client = server.available();
  //   if (client) {
  //     // Check Wi-Fi status and signal strength
  //     int status = WiFi.status();
  //     int rssi = WiFi.RSSI();
  //     // Send JSON response
  //     client.println("{\"status\": " + String(status) + ", \"signal_strength\": " + String(rssi) + "}");
  //     client.stop();
  //   }
  // }


  function updateWiFiStatus(status, signalStrength) {
    const wifiStatus = document.getElementById('wifiStatus');
    const bars = document.querySelectorAll('.signal-bars .bar');
  
    wifiStatus.textContent = status;
  
    bars.forEach((bar, index) => {
      if (index < signalStrength) {
        bar.classList.add('active');
      } else {
        bar.classList.remove('active');
      }
    });
  }
  
  async function fetchWiFiStatus() {
    try {
      const response = await fetch(wifiStatusEndpoint);
      const data = await response.json();
      const status = data.status === 3 ? 'Connected' : 'Disconnected';
      const signalStrength = Math.min(Math.max(Math.floor((data.signal_strength + 100) / 20), 0), 5); // Convert dBm to 0-5 scale
  
      updateWiFiStatus(status, signalStrength);
    } catch (error) {
      console.error('Error fetching Wi-Fi status:', error);
    }
  }
  
  // Fetch WiFi status every 5 seconds
  setInterval(fetchWiFiStatus, 5000);
  
  // Initial fetch
  fetchWiFiStatus();