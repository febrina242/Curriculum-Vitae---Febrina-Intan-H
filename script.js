// Febrina Intan CV

(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('darkModeToggle');
  const backToTopBtn = document.getElementById('backToTop');

  // Loading animation
  window.addEventListener('load', () => {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'none';
  });

  // Dark mode toggle (persist in localStorage)
  const applyTheme = (theme) => {
    // Bootstrap 5.3 supports data-bs-theme on <html>
    root.setAttribute('data-bs-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (_) {}

    // Update icon for user clarity
    if (toggleBtn) {
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
      }
    }
  };

  const initTheme = () => {
    let stored = null;
    try { stored = localStorage.getItem('theme'); } catch (_) {}

    if (stored === 'dark' || stored === 'light') return applyTheme(stored);

    // fallback to system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  };

  initTheme();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Back to top
  const toggleBackToTop = () => {
    if (!backToTopBtn) return;
    const show = window.scrollY > 450;
    backToTopBtn.classList.toggle('show', show);
  };

  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll reveal animation
  const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.15 });

  revealEls.forEach((el) => io.observe(el));

  // Smooth scroll (extra safety; CSS scroll-behavior already set)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

