/* ==========================================================================
   EXTRODATA — Main JavaScript
   Theme toggle (dark default), cinematic scroll reveal (staggered), FAQ accordion, mobile nav, Lucide icons
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 0. Theme Toggle (Dark Default) ─────────────────────── */

  const themeToggles = document.querySelectorAll('[data-theme-toggle]');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // Sync all icon pairs across desktop + mobile toggles
    document.querySelectorAll('.theme-icon-light').forEach(icon => {
      icon.style.display = theme === 'dark' ? 'block' : 'none';
    });
    document.querySelectorAll('.theme-icon-dark').forEach(icon => {
      icon.style.display = theme === 'dark' ? 'none' : 'block';
    });
  }

  // Determine initial theme: localStorage → default 'dark'
  const storedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(storedTheme);

  // Toggle on click (works for both desktop and mobile buttons)
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
      // Re-initialize Lucide icons after toggle
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  });

  /* ── 1. Hero Video Play Fallback ─────────────────────────── */

  const heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    // Try autoplay; if blocked by browser, retry on first interaction with the hero area only
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const heroSection = heroVideo.closest('.hero-cinematic');
        const unblock = (e) => {
          // Only unblock if the click is inside the hero section, not elsewhere on the page
          if (heroSection && heroSection.contains(e.target)) {
            heroVideo.play().catch(() => {});
          }
        };
        document.addEventListener('click', unblock, { once: true });
        document.addEventListener('touchstart', unblock, { once: true });
      });
    }
  }

  /* ── 1. Cinematic Scroll Reveal (IntersectionObserver + Stagger) ──── */

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observe all reveal classes
  document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-stagger').forEach((el) => {
    // Set stagger index from data attribute
    const stagger = el.getAttribute('data-stagger');
    if (stagger) {
      el.style.setProperty('--stagger-index', stagger);
    }
    revealObserver.observe(el);
  });

  /* ── 2. FAQ Accordion ────────────────────────────────────── */

  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item.is-open').forEach((i) => i.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });

  /* ── 3. Expandable Content (Case Studies "Read More") ────── */

  document.querySelectorAll('.expandable-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      if (content && content.classList.contains('expandable-content')) {
        content.classList.toggle('is-open');
        btn.textContent = content.classList.contains('is-open') ? 'Show less' : 'Read more';
      }
    });
  });

  /* ── 4. Mobile Nav Toggle ────────────────────────────────── */

  const navToggle = document.querySelector('.nav-toggle');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');

  if (navToggle && mobileOverlay) {
    navToggle.addEventListener('click', () => {
      const isOpen = document.body.classList.contains('nav-open');
      document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', !isOpen);
      mobileOverlay.setAttribute('aria-hidden', isOpen);
    });

    // Close mobile nav when a link is clicked
    mobileOverlay.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileOverlay.setAttribute('aria-hidden', 'true');
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileOverlay.setAttribute('aria-hidden', 'true');
        navToggle.focus();
      }
    });
  }

  /* ── 5. Highlight Current Page Link in Header ────────────── */

  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  /* ── 6. Lucide Icons ─────────────────────────────────────── */

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ── 7. Copy Code Buttons ────────────────────────────────── */

  document.querySelectorAll('pre.highlight, figure.highlight pre, .highlighter-rouge').forEach((pre) => {
    // Avoid duplicate buttons if already added
    if (pre.querySelector('.code-copy-btn')) return;

    const codeEl = pre.querySelector('code') || pre;
    const btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.textContent = 'Copy';

    // Ensure parent has position: relative
    pre.style.position = 'relative';

    btn.addEventListener('click', () => {
      const text = codeEl.innerText || codeEl.textContent;
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });

    pre.appendChild(btn);
  });

});
