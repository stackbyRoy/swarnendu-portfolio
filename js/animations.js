/* ==========================================================================
   INTERACTION SCROLL EFFECTS & DIRECTION (js/animations.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScrollDirection();
  initAnchorFocusHighlight();
});

/**
 * Toggles class to slide header out of view when scrolling down, and reveal on scroll up
 */
function initHeaderScrollDirection() {
  let lastScrollY = window.scrollY;
  const header = document.getElementById('header');
  
  if (!header) return;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Check if mobile menu is open
    const isMobileNavOpen = document.getElementById('nav-menu')?.classList.contains('nav-open');
    if (isMobileNavOpen) return;

    // Ignore bounce effects (iOS elastic scroll)
    if (currentScrollY < 0) return;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling Down - hide header
      header.classList.add('header-hidden');
    } else {
      // Scrolling Up - show header
      header.classList.remove('header-hidden');
    }
    
    lastScrollY = currentScrollY;
  };

  // Debouncing or throttling can be done, but standard requestAnimationFrame is highly performant
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Utility to track focus states for accessibility ring layouts
 */
function initAnchorFocusHighlight() {
  const keyboardInteractives = document.querySelectorAll('a, button, [tabindex="0"]');
  
  keyboardInteractives.forEach(el => {
    el.addEventListener('focus', () => {
      el.classList.add('focused-active');
    });
    
    el.addEventListener('blur', () => {
      el.classList.remove('focused-active');
    });
  });
}
