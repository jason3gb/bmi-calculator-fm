document.addEventListener('DOMContentLoaded', () => {
  // Select all radio buttons in the group
  const radios = document.querySelectorAll('.form-item.radio-group input[type="radio"]');
  const metricData = document.getElementById('metric-data');
  const imperialData = document.getElementById('imperial-data');

  // Function to show/hide metric and imperial data based on selection
  function toggleData(selectedValue) {
    if (selectedValue === 'metric') {
      metricData.style.display = 'flex';
      imperialData.style.display = 'none';
    } else {
      metricData.style.display = 'none';
      imperialData.style.display = 'flex';
    }
  }

  // Initialize with the correct data block based on which radio is checked
  const checkedRadio = Array.from(radios).find(radio => radio.checked);
  if (checkedRadio) {
    toggleData(checkedRadio.id);
  }

  // Add change event listener to radio buttons
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      toggleData(radio.id);
    });
  });
});