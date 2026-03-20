/* app.js — Inner Alignment Psychology */

(function() {
  'use strict';

  /* ===== DARK MODE TOGGLE ===== */
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let currentTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', currentTheme);

  function updateToggleIcon() {
    if (!themeToggle) return;
    themeToggle.setAttribute('aria-label', 'Switch to ' + (currentTheme === 'dark' ? 'light' : 'dark') + ' mode');
    themeToggle.innerHTML = currentTheme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  updateToggleIcon();

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      updateToggleIcon();
    });
  }

  /* ===== HEADER SCROLL BEHAVIOUR ===== */
  const header = document.querySelector('.site-header');
  if (header) {
    const isTransparentHeader = header.classList.contains('header--transparent');
    let lastScroll = 0;

    function handleScroll() {
      const scrollY = window.scrollY;
      if (isTransparentHeader) {
        if (scrollY > 80) {
          header.classList.remove('header--transparent');
          header.classList.add('header--scrolled');
        } else {
          header.classList.add('header--transparent');
          header.classList.remove('header--scrolled');
        }
      } else {
        if (scrollY > 20) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
      }
      lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ===== MOBILE NAV ===== */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function() {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', function() {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ===== ACCORDION ===== */
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(function(item) {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');

    if (trigger && content) {
      trigger.addEventListener('click', function() {
        const isOpen = item.classList.contains('open');

        // Close all others
        accordionItems.forEach(function(other) {
          if (other !== item) {
            other.classList.remove('open');
            const otherContent = other.querySelector('.accordion-content');
            if (otherContent) otherContent.style.maxHeight = '0';
          }
        });

        // Toggle current
        if (isOpen) {
          item.classList.remove('open');
          content.style.maxHeight = '0';
        } else {
          item.classList.add('open');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });

})();
