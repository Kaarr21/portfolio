// Enhanced main.js with Dark Mode Toggle

// 1. Dark Mode Toggle Functionality
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }
  
  init() {
    // Apply saved theme on page load
    this.applyTheme(this.theme);
    
    // Create and add toggle button to navigation
    this.createToggleButton();
    
    // Listen for system theme changes
    this.watchSystemTheme();
  }
  
  createToggleButton() {
    const navLinks = document.querySelector('.nav-links');
    const toggleContainer = document.createElement('li');
    
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.innerHTML = `
      <span class="theme-toggle-icon">${this.theme === 'light' ? '🌙' : '☀️'}</span>
    `;
    
    // Add click event listener
    toggle.addEventListener('click', () => this.toggleTheme());
    
    toggleContainer.appendChild(toggle);
    navLinks.appendChild(toggleContainer);
  }
  
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.theme);
    this.saveTheme();
    this.updateToggleIcon();
  }
  
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    
    metaThemeColor.content = theme === 'dark' ? '#121212' : '#ffffff';
  }
  
  saveTheme() {
    localStorage.setItem('theme', this.theme);
  }
  
  updateToggleIcon() {
    const icon = document.querySelector('.theme-toggle-icon');
    if (icon) {
      icon.textContent = this.theme === 'light' ? '🌙' : '☀️';
    }
  }
  
  watchSystemTheme() {
    // Listen for system theme changes (when user changes OS theme)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // If no saved preference and system prefers dark, use dark
      if (!localStorage.getItem('theme')) {
        this.theme = 'dark';
        this.applyTheme('dark');
      }
    }
    
    // Listen for changes to system theme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        // Only auto-switch if user hasn't manually set a preference
        this.theme = e.matches ? 'dark' : 'light';
        this.applyTheme(this.theme);
        this.updateToggleIcon();
      }
    });
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});
// Scroll to section smoothly
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Enhanced main.js with additional interactive features

// 2. Active navigation highlighting
// This tracks which section is currently in view and highlights the corresponding nav link
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  
  // Loop through sections to find which one is in viewport
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    // Check if section is currently in view (with 200px offset for better UX)
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  // Remove active class from all nav links, then add to current
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Run on scroll and page load
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// 3. Typing animation for hero section
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Start typing animation when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    typeWriter(heroTitle, "Hello, I'm Karoki", 150);
  }
});

// 4. Project cards hover effect with JavaScript
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.transition = 'transform 0.3s ease';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// 5. Mobile menu toggle (for responsive design)
function createMobileMenu() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  
  // Create hamburger button
  const menuToggle = document.createElement('button');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '☰';
  menuToggle.style.display = 'none'; // Hidden by default, shown in mobile CSS
  
  // Insert before nav-links
  navbar.insertBefore(menuToggle, navLinks);
  
  // Toggle menu on click
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    menuToggle.classList.toggle('toggle-active');
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav-active');
      menuToggle.classList.remove('toggle-active');
    });
  });
}

// Initialize mobile menu
createMobileMenu();

// 6. Scroll-to-top button
function createScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '↑';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #8400ff;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
  `;
  
  document.body.appendChild(scrollBtn);
  
  // Show/hide based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.style.opacity = '1';
    } else {
      scrollBtn.style.opacity = '0';
    }
  });
  
  // Scroll to top on click
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

createScrollToTop();

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Create mailto link with form data
  const mailtoLink = `mailto:karokin35@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Nancy,\n\nMy name is ${name} and my email is ${email}.\n\n${message}`)}`;
  
  // Open email client
  window.location.href = mailtoLink;
  
  // Show success message
  alert('Thank you for your message! Your email client should open now.');
  
  // Reset form
  this.reset();
});
