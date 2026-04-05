/* ElSEOLatino — Main JavaScript v2.0 */
(function() {
  'use strict';

  // Navbar scroll
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // Mobile menu
  var menuToggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      var isOpen = navLinks.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Language toggle
  var langToggle = document.querySelector('.lang-toggle');
  if (langToggle) {
    var currentLang = document.documentElement.lang || 'es';
    langToggle.addEventListener('click', function() {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      document.documentElement.lang = currentLang;
      var label = langToggle.querySelector('.lang-label');
      var flag = langToggle.querySelector('.lang-flag');
      if (label) label.textContent = currentLang === 'es' ? 'ES' : 'EN';
      if (flag) flag.textContent = currentLang === 'es' ? '\uD83C\uDDF2\uD83C\uDDFD' : '\uD83C\uDDFA\uD83C\uDDF8';
      document.querySelectorAll('[data-es]').forEach(function(el) {
        el.textContent = currentLang === 'es' ? el.dataset.es : el.dataset.en;
      });
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function(el) { observer.observe(el); });
  }

  // Comparison bars animation
  var compareBars = document.querySelectorAll('.compare-bar-fill');
  if (compareBars.length) {
    var barObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width;
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    compareBars.forEach(function(bar) { barObserver.observe(bar); });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
