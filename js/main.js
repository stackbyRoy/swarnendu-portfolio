/* ==========================================================================
   MAIN SYSTEM COORDINATOR (js/main.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Swarnendu Roy Portfolio initialized successfully');
  
  // Inject background grain overlay dynamically if not manually entered
  if (!document.querySelector('.bg-grain')) {
    const grain = document.createElement('div');
    grain.className = 'bg-grain';
    document.body.appendChild(grain);
  }
  
  // Base trigger for scroll reveal animations
  initScrollReveal();
});

/**
 * Basic Intersection Observer setup for element entrance effects
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (!revealElements.length) return;
  
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px 0px -80px 0px', // trigger slightly before entering viewport
    threshold: 0.15 // 15% visibility needed
  };
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, observerOptions);
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}
