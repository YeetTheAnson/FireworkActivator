document.addEventListener('DOMContentLoaded', () => {
  const activateButton = document.getElementById('activateButton');
  const outerPulse = document.getElementById('outerPulse');

  // Create the inner ripple effect
  activateButton.addEventListener('mousedown', (e) => {
    const ripple = document.createElement('span');
    const rect = activateButton.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.classList.add('ripple');
    
    activateButton.appendChild(ripple);
    
    // Remove after animation end
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });

  activateButton.addEventListener('mouseup', () => {
    console.log('Activated');

    outerPulse.classList.add('pulse-active');

    outerPulse.addEventListener('animationend', () => {
      outerPulse.classList.remove('pulse-active');
    });
  });
});
