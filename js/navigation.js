/* ==========================================================================
   NAVIGATION MANAGEMENT SYSTEM (js/navigation.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initScrollSpy();
  initSmoothScrollAdjust();
});

/**
 * Adds a background fill and border to the floating header on scroll
 */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run first check immediately
}

/**
 * Handles mobile hamburger toggle and menu opening/closing with focus trapping
 */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  const toggleMenu = () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('nav-open');
    document.body.classList.toggle('no-scroll'); // Lock page behind menu
  };

  mobileToggle.addEventListener('click', toggleMenu);

  // Close menu when a navigation item is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('nav-open')) {
        toggleMenu();
      }
    });
  });

  // Close menu if clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('nav-open') && 
        !navMenu.contains(e.target) && 
        !mobileToggle.contains(e.target)) {
      toggleMenu();
    }
  });

  // Handle escape keyboard navigation shortcut to close menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('nav-open')) {
      toggleMenu();
      mobileToggle.focus();
    }
  });
}

/**
 * Intersection Observer to update active navigation item state as user scrolls
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the sweet reading zone
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/**
 * Adjusts scroll landing position to prevent floating header overlap
 */
function initSmoothScrollAdjust() {
  const navLinks = document.querySelectorAll('.nav-link, .site-logo');
  const header = document.getElementById('header');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = header ? header.offsetHeight : 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Focus management for keyboard accessibility
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus({ preventScroll: true });
        }
      }
    });
  });
}
