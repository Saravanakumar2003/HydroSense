function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const phData = JSON.parse(localStorage.getItem('phData')) || [];
  const turbidityData = JSON.parse(localStorage.getItem('turbidityData')) || [];
  const tempData = JSON.parse(localStorage.getItem('tempData')) || [];
  const timestamps = JSON.parse(localStorage.getItem('timestamps')) || [];

  let tableData = [];
  for (let i = 0; i < phData.length; i++) {
    tableData.push([
      i + 1,
      timestamps[i],
      phData[i].y,
      turbidityData[i].y,
      tempData[i].y,
    ]);
  }

  doc.text("HydroSense Data Report", 14, 16);
  doc.line(14, 18, 196, 18); // Add a line below the title
  doc.autoTable({
    margin: { top: 22 }, // Add margin gap after the line
    head: [['Count', 'Timestamp', 'pH', 'Turbidity', 'Temperature']],
    body: tableData,
  });

  doc.save('HydroSense_Data_Report.pdf');
}