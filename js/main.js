/* ==========================================================================
   CURTIS VO PORTFOLIO - MAIN JAVASCRIPT
   ========================================================================== */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initializePageTransitions();
  initializeNavigation();
  initializeSocialLinks();
  initializeWorkItems();
});

/* ==========================================================================
   PAGE TRANSITION FUNCTIONS
   ========================================================================== */

function initializePageTransitions() {
  // Create loading indicator if it doesn't exist
  createLoadingIndicator();
  
  // Add loading state to body on page load
  document.body.classList.add('page-loading');
  
  // Handle navigation clicks
  const navLinks = document.querySelectorAll('.nav-links a[href$=".html"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetUrl = this.getAttribute('href');
      transitionToPage(targetUrl);
    });
  });
  
  // Initialize page entry animation
  initializePageEntry();
}

function createLoadingIndicator() {
  if (!document.querySelector('.loading-indicator')) {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    document.body.appendChild(loadingIndicator);
  }
}

function initializePageEntry() {
  const mainContent = document.querySelector('.main-content');
  
  if (mainContent) {
    // Remove loading state and trigger entry animation
    setTimeout(() => {
      document.body.classList.remove('page-loading');
      mainContent.classList.add('page-enter');
      
      // Clean up animation class after animation completes
      setTimeout(() => {
        mainContent.classList.remove('page-enter');
      }, 600);
    }, 100);
  }
}

function transitionToPage(url) {
  const mainContent = document.querySelector('.main-content');
  const loadingIndicator = document.querySelector('.loading-indicator');
  
  // Fade out main content with upward movement
  if (mainContent) {
    mainContent.classList.add('fade-out');
    
    // Show loading indicator
    if (loadingIndicator) {
      loadingIndicator.classList.add('active');
    }
    
    // Wait for fade out, then navigate
    setTimeout(() => {
      window.location.href = url;
    }, 500);
  } else {
    // Fallback if main-content not found
    window.location.href = url;
  }
}

/* ==========================================================================
   NAVIGATION FUNCTIONS
   ========================================================================== */

function initializeNavigation() {
  // Add active class to current page navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  // Remove active class from all links first
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Add active class to current page
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Update active state after component loading
  setTimeout(() => {
    updateActiveNavigation();
  }, 100);
}

function updateActiveNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  // Remove active class from all links
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Add active class to current page
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ==========================================================================
   SOCIAL LINKS FUNCTIONS
   ========================================================================== */

function initializeSocialLinks() {
  // Add click tracking for social links
  const socialLinks = document.querySelectorAll('.social-links-top a');
  
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const platform = this.querySelector('img').alt.toLowerCase();
      console.log(`Social link clicked: ${platform}`);
      // You can add analytics tracking here
    });
  });
}

/* ==========================================================================
   WORK ITEMS FUNCTIONS
   ========================================================================== */

function initializeWorkItems() {
  // Add hover effects and click handlers for work items
  const workItems = document.querySelectorAll('.work-item');
  
  workItems.forEach(item => {
    item.addEventListener('click', function() {
      const projectName = this.querySelector('p').textContent;
      console.log(`Work item clicked: ${projectName}`);
      // You can add project detail modal or navigation here
    });
  });
}

/* ==========================================================================
   UTILITY FUNCTIONS
   ========================================================================== */

// Component loader function
function loadComponent(containerId, componentPath) {
  const container = document.getElementById(containerId);
  if (!container) return;

  fetch(componentPath)
    .then(response => response.text())
    .then(html => {
      container.innerHTML = html;
    })
    .catch(error => {
      console.error(`Error loading component ${componentPath}:`, error);
    });
}

// Smooth scroll for anchor links
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Add smooth scrolling to all anchor links
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
    e.preventDefault();
    smoothScroll(e.target.getAttribute('href'));
  }
});
