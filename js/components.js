/* ==========================================================================
   COMPONENT-SPECIFIC JAVASCRIPT
   ========================================================================== */

/* ==========================================================================
   WORK GRID COMPONENT
   ========================================================================== */

class WorkGrid {
  constructor(container) {
    this.container = container;
    this.items = container.querySelectorAll('.work-item');
    this.init();
  }

  init() {
    this.addHoverEffects();
    this.addClickHandlers();
  }

  addHoverEffects() {
    this.items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        this.container.classList.add('work-grid-hover');
      });
      
      item.addEventListener('mouseleave', () => {
        this.container.classList.remove('work-grid-hover');
      });
    });
  }

  addClickHandlers() {
    this.items.forEach(item => {
      item.addEventListener('click', (e) => {
        const projectName = item.querySelector('p').textContent;
        this.handleProjectClick(projectName, item);
      });
    });
  }

  handleProjectClick(projectName, element) {
    console.log(`Project clicked: ${projectName}`);
    // Add project-specific logic here
    // For example: open modal, navigate to project page, etc.
  }
}

/* ==========================================================================
   NAVIGATION COMPONENT
   ========================================================================== */

class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navLinks = document.querySelectorAll('.nav-links a');
    this.init();
  }

  init() {
    this.setActivePage();
    this.addMobileMenuToggle();
  }

  setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  addMobileMenuToggle() {
    // Add mobile menu functionality if needed
    // This can be expanded for responsive navigation
  }
}

/* ==========================================================================
   INITIALIZE COMPONENTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize work grid if it exists
  const workGrid = document.querySelector('.work-grid');
  if (workGrid) {
    new WorkGrid(workGrid);
  }

  // Initialize navigation
  new Navigation();
});
