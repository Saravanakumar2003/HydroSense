const modal = document.getElementById('dataSimulationModal');

function openModal() {
  modal.style.display = "block";
  modal.classList.remove("fade-out");
}

function closeModal() {
  modal.classList.add("fade-out");
  setTimeout(() => {
    modal.style.display = "none";
  }, 400); // Matches the fade-out animation duration
}

document.querySelector('.close').addEventListener('click', closeModal);
document.querySelector('.btn-primary[data-target="#dataSimulationModal"]').addEventListener('click', openModal);

async function generateData() {
  const sensorId = document.getElementById('sensor_id').value;
  const response = await fetch('/generate_data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `sensor_id=${sensorId}`
  });

  const result = await response.json();
  document.getElementById('status').innerText = result.message || 'Data generation failed.';
}


$(document).ready(function () {
  $('#imageModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var src = button.data('src'); // Extract info from data-* attributes
    var modal = $(this);
    modal.find('#modalImage').attr('src', src);
  });
});