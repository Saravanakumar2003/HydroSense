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
      x: { 
        type: 'linear',
        title: {
          display: true,
          text: 'Count'
        }
      },
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
      x: { 
        type: 'linear',
        title: {
          display: true,
          text: 'Count'
        }
      },
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
      x: { 
        type: 'linear',
        title: {
          display: true,
          text: 'Count'
        }
      },
      y: { beginAtZero: true, max: 35 }
    }
  }
});

function updateCharts() {
  const phData = JSON.parse(localStorage.getItem('phData')) || [];
  const turbidityData = JSON.parse(localStorage.getItem('turbidityData')) || [];
  const tempData = JSON.parse(localStorage.getItem('tempData')) || [];
  const timestamps = JSON.parse(localStorage.getItem('timestamps')) || [];

  const sampleCount = phData.length + 1;
  const now = new Date().toLocaleString();

  phData.push({ x: sampleCount, y: latestPH });
  turbidityData.push({ x: sampleCount, y: latestTurbidity });
  tempData.push({ x: sampleCount, y: latestTemp });
  timestamps.push(now);

  localStorage.setItem('phData', JSON.stringify(phData));
  localStorage.setItem('turbidityData', JSON.stringify(turbidityData));
  localStorage.setItem('tempData', JSON.stringify(tempData));
  localStorage.setItem('timestamps', JSON.stringify(timestamps));

  phChart.data.labels = phData.map((_, index) => index + 1);
  phChart.data.datasets[0].data = phData.map(d => d.y);
  phChart.update();

  turbidityChart.data.labels = turbidityData.map((_, index) => index + 1);
  turbidityChart.data.datasets[0].data = turbidityData.map(d => d.y);
  turbidityChart.update();

  tempChart.data.labels = tempData.map((_, index) => index + 1);
  tempChart.data.datasets[0].data = tempData.map(d => d.y);
  tempChart.update();
}

function downloadChartImage(chartId) {
  const chart = document.getElementById(chartId);
  const link = document.createElement('a');
  link.href = chart.toDataURL('image/png');
  link.download = `${chartId}.png`;
  link.click();
}