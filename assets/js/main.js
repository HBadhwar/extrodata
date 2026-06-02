/* ==========================================================================
   EXTRODATA — Minimal Interactive Script (2026)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Menu Toggle ──────────────────────────────── */
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__links');
  const dropdowns = document.querySelectorAll('.nav__item--dropdown');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          menu.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Toggle dropdowns on mobile
    dropdowns.forEach(dd => {
      dd.querySelector('.nav__link').addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dd.classList.toggle('is-open');
        }
      });
    });
  }

  /* ── Back to Top Button ─────────────────────────────── */
  const backToTop = document.querySelector('.go-top');

  if (backToTop) {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visibility-all');
      } else {
        backToTop.classList.remove('visibility-all');
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
  }

  /* ── Smooth Scroll for Anchor Links ─────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
