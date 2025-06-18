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
