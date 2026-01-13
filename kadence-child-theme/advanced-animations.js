/**
 * Beach Hydrovac - Advanced Animations JavaScript
 * Handles scroll animations, parallax effects, and interactive elements
 */

(function() {
  'use strict';

  // ========================================
  // SCROLL ANIMATION OBSERVER
  // ========================================

  const animateOnScroll = () => {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  };

  // ========================================
  // SCROLL PROGRESS BAR
  // ========================================

  const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  };

  // ========================================
  // PARALLAX EFFECT
  // ========================================

  const initParallax = () => {
    const parallaxSections = document.querySelectorAll('.parallax-section');

    if (parallaxSections.length === 0) return;

    window.addEventListener('scroll', () => {
      parallaxSections.forEach(section => {
        const scrolled = window.scrollY;
        const offset = section.offsetTop;
        const height = section.offsetHeight;

        if (scrolled > offset - window.innerHeight && scrolled < offset + height) {
          const yPos = (scrolled - offset) * 0.5;
          section.style.backgroundPositionY = yPos + 'px';
        }
      });
    });
  };

  // ========================================
  // NUMBER COUNTER ANIMATION
  // ========================================

  const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target')) || 100;
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  };

  // ========================================
  // SERVICE CARD INTERACTIONS
  // ========================================

  const initServiceCards = () => {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  };

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================

  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };

  // ========================================
  // BUTTON RIPPLE EFFECT
  // ========================================

  const initRippleEffect = () => {
    const buttons = document.querySelectorAll('.btn-animated, .wp-block-button__link');

    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  };

  // ========================================
  // LAZY LOAD IMAGES WITH FADE-IN
  // ========================================

  const initLazyLoad = () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          img.style.opacity = '0';

          img.onload = () => {
            img.style.transition = 'opacity 0.5s ease';
            img.style.opacity = '1';
          };

          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  };

  // ========================================
  // TYPING EFFECT
  // ========================================

  const initTypingEffect = () => {
    const typingElements = document.querySelectorAll('.typing-effect');

    typingElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.display = 'inline-block';

      let index = 0;
      const type = () => {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
          setTimeout(type, 100);
        } else {
          element.style.borderRight = 'none';
        }
      };

      // Start typing when element is visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            type();
            observer.unobserve(element);
          }
        });
      });

      observer.observe(element);
    });
  };

  // ========================================
  // STAGGER ANIMATION FOR LISTS
  // ========================================

  const initStaggerAnimation = () => {
    const staggerContainers = document.querySelectorAll('[data-stagger]');

    staggerContainers.forEach(container => {
      const children = container.children;
      Array.from(children).forEach((child, index) => {
        child.classList.add('fade-in-up', `stagger-delay-${(index % 6) + 1}`);
      });
    });
  };

  // ========================================
  // HOVER TILT EFFECT FOR CARDS
  // ========================================

  const initTiltEffect = () => {
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  };

  // ========================================
  // SCROLL REVEAL WITH DELAY
  // ========================================

  const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-reveal-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // Add revealed class styles
    const style = document.createElement('style');
    style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
  };

  // ========================================
  // INITIALIZE ALL ANIMATIONS
  // ========================================

  const init = () => {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Initialize all animation features
    animateOnScroll();
    createScrollProgress();
    initParallax();
    animateCounters();
    initServiceCards();
    initSmoothScroll();
    initRippleEffect();
    initLazyLoad();
    initTypingEffect();
    initStaggerAnimation();
    initTiltEffect();
    initScrollReveal();

    console.log('🎨 Beach Hydrovac Advanced Animations Loaded!');
  };

  // Start initialization
  init();

})();
