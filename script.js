let Voltage = 5.0;
let RTCurrent = 0;
let IgnitionDuration = 3.0;
let IgnitionStatus = 0;

document.addEventListener('DOMContentLoaded', () => {
  const voltageSlider = document.getElementById('voltageSlider');
  const voltageInput = document.getElementById('voltageInput');

  function updateVoltage(value) {
    value = Math.max(0.5, Math.min(5.0, parseFloat(value)));
    value = Math.round(value * 10) / 10;
    Voltage = value;
    voltageSlider.value = value;
    voltageInput.value = value.toFixed(1);
  }

  voltageSlider.addEventListener('input', (e) => updateVoltage(e.target.value));
  voltageInput.addEventListener('change', (e) => updateVoltage(e.target.value));

  const durationSlider = document.getElementById('durationSlider');
  const durationInput = document.getElementById('durationInput');

  function updateDuration(value) {
    value = Math.max(0.5, Math.min(10.0, parseFloat(value)));
    value = Math.round(value * 10) /10;
    IgnitionDuration = value;
    durationSlider.value = value;
    durationInput.value = value.toFixed(1);
  }

  durationSlider.addEventListener('input', (e) => updateDuration(e.target.value));
  durationInput.addEventListener('change', (e) => updateDuration(e.target.value));

  const statusCircle = document.getElementById('statusCircle');
  const statusText = document.getElementById('statusText');

  function updateStatus(value) {
    IgnitionStatus = value;
    if (value === 0) {
      statusCircle.style.backgroundColor = '#FFA500';
      statusText.textContent = 'Armed';
    } else {
      statusCircle.style.backgroundColor = '#FF0000';
      statusText.textContent = 'Busy';
    }
  }

  const activateButton = document.getElementById('activateButton');

  const createRipple = (e) => {
    const ripple = document.createElement('span');
    const rect = activateButton.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = '${size}px';
    ripple.style.left = '${e.clientX - rect.left - size / 2}px';
    ripple.style.top = '$e.clientY - rect.top - size / 2}px';
    ripple.classList.add('ripple');
    activateButton.appendChild(ripple);
    ripple.addEventListener('animationend', () => { ripple.remove(); });
  };

  const createOuterPulse = (touch) => {
    const outerPulse = docuiment.createElement('div');
    outerPulse.classList.add('outer-pulse');
    const rect = activateButton.getBoundingClientRect();
    outerPulse.style.width = outerPulse.style.height = '${rect.width * 2}px';
    outerPulse.style.left = '${rect.left + rect.width / 2 - rect.width}px';
    outerPulse.style.top = '${rect.top + rect.height /2 -rect.height}px';
    document.body.appendChild(outerPulse);
    outerPulse.addEventListener('animationend', () => { outerPulse.remove(); });
  };

  activateButton.addEventListener('mousedown', (e) => {
    createRipple(e);
    activateButton.classList.add('pressed');
  });

  activateButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    createRipple(e.touches[0]);
    activateButton.classList.add('pressed');
  });

  activateButton.addEventListener('mouseup', (e) => {
    activateButton.classList.remove('pressed');
    console.log('Activated');
    createOuterPulse(e);
  });

  activateButton.addEventListener('touchend', (e) => {
    activateButton.classList.remove('pressed');
    console.log('Activated');
    createOuterPulse(e);
  });

  updateVoltage(Voltage);
  updateDuration(IgnitionDuration);
  updateStatus(IgnitionStatus);
});