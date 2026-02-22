// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}
function closeMenu() {
  document.getElementById('navLinks').classList.remove('active');
}

// Scroll reveal
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animate comparison bars inside this element
      entry.target.querySelectorAll('.compare-bar-fill').forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
          setTimeout(() => { bar.style.width = width + '%'; }, 200);
        }
      });
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => observer.observe(el));

// Also observe the comparison section specifically
const compareSection = document.querySelector('.ai-compare');
if (compareSection) {
  const compareObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.compare-bar-fill').forEach((bar, i) => {
          const width = bar.getAttribute('data-width');
          if (width) {
            setTimeout(() => { bar.style.width = width + '%'; }, 300 + (i * 150));
          }
        });
      }
    });
  }, { threshold: 0.3 });
  compareObserver.observe(compareSection);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});