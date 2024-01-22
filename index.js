document.addEventListener('DOMContentLoaded', () => {
  // Select all radio buttons in the group
  const radios = document.querySelectorAll('.form-item.radio-group input[type="radio"]');
  const metricData = document.getElementById('metric-data');
  const imperialData = document.getElementById('imperial-data');

  const heightElement = document.getElementById('height');
  const weightElement = document.getElementById('weight');
  const heightFeetElement = document.getElementById('height-feet');
  const heightInchElement = document.getElementById('height-inch');
  const weightStElement = document.getElementById('weight-st');
  const weightLbsElement = document.getElementById('weight-lbs');

  const resultHeader = document.querySelector('.result-header');
  const resultValue = document.querySelector('.result-value');
  const resultExplanation = document.querySelector('.result-explanation');

  // Function to show/hide metric and imperial data based on selection
  function toggleData(selectedValue) {
    if (selectedValue === 'metric') {
      metricData.style.display = 'flex';
      imperialData.style.display = 'none';

      heightFeetElement.value = '';
      heightInchElement.value = '';
      weightStElement.value = '';
      weightLbsElement.value = '';
    } else {
      metricData.style.display = 'none';
      imperialData.style.display = 'flex';

      heightElement.value = '';
      weightElement.value = '';
    }

    // reset result
    resultHeader.textContent = "Welcome!";
    resultValue.textContent = ``;
    resultExplanation.textContent = "Enter your height and weight and you’ll see your BMI result here";
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

// calculate bmi

function calculateBMI() {
  const heightElement = document.getElementById('height');
  const weightElement = document.getElementById('weight');
  const heightFeetElement = document.getElementById('height-feet');
  const heightInchElement = document.getElementById('height-inch');
  const weightStElement = document.getElementById('weight-st');
  const weightLbsElement = document.getElementById('weight-lbs');

  const resultHeader = document.querySelector('.result-header');
  const resultValue = document.querySelector('.result-value');
  const resultExplanation = document.querySelector('.result-explanation');

  const height = parseFloat(heightElement.value);
  const weight = parseFloat(weightElement.value);
  const feet = parseFloat(heightFeetElement.value);
  const inches = parseFloat(heightInchElement.value);
  const stones = parseFloat(weightStElement.value);
  const pounds = parseFloat(weightLbsElement.value);

  // Assuming Metric is the default system
  let bmi;
  if (height > 0 && weight > 0) {
    bmi = calculateMetricBMI(height, weight);
  } else if (feet > 0 && inches >= 0 && (stones > 0 || pounds >= 0)) {
    // Calculate total inches and pounds if Imperial inputs are provided
    const totalInches = (feet * 12) + inches;
    const totalPounds = (stones * 14) + pounds;
    bmi = calculateImperialBMI(totalInches, totalPounds);
  }

  if (bmi > 0) {
    console.log(`Your BMI is: ${bmi.toFixed(2)}`);

    resultHeader.textContent = "Your BMI is...";
    resultValue.textContent = `${bmi.toFixed(2)}`;
    resultExplanation.textContent = `Your BMI suggests you're a healthy weight. Your ideal weight is between ${calculateIdealWeightRange(height).minWeight.toFixed(1)}kgs - ${calculateIdealWeightRange(height).maxWeight.toFixed(1)}kgs.`;
  } else {
    // Display default message when form is not filled completely
    resultHeader.textContent = "Welcome!";
    resultValue.textContent = ``;
    resultExplanation.textContent = "Enter your height and weight and you’ll see your BMI result here";
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function calculateMetricBMI(height, weight) {
  // Metric BMI calculation
  return weight / ((height / 100) ** 2);
}

function calculateImperialBMI(totalInches, totalPounds) {
  // Imperial BMI calculation
  return (703 * totalPounds) / (totalInches ** 2);
}

// Function to calculate ideal weight range based on height
function calculateIdealWeightRange(height) {
  // Assuming a BMI range for 'healthy weight' is 18.5 to 24.9
  const minHeightMeters = height / 100;
  const minWeight = 18.5 * (minHeightMeters ** 2);
  const maxWeight = 24.9 * (minHeightMeters ** 2);
  return { minWeight, maxWeight };
}

// Debounce the BMI calculation
const debouncedCalculateBMI = debounce(calculateBMI, 500);

// Metric inputs
document.getElementById('height').addEventListener('input', debouncedCalculateBMI);
document.getElementById('weight').addEventListener('input', debouncedCalculateBMI);

// Imperial inputs
document.getElementById('height-feet').addEventListener('input', debouncedCalculateBMI);
document.getElementById('height-inch').addEventListener('input', debouncedCalculateBMI);
document.getElementById('weight-st').addEventListener('input', debouncedCalculateBMI);
document.getElementById('weight-lbs').addEventListener('input', debouncedCalculateBMI);


