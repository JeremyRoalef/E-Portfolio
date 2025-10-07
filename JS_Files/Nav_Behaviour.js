// Nav_Behaviour.js
(function () {
  // Helper: close all open dropdowns (optionally except one)
  function closeAll(except) {
    document.querySelectorAll('.dropdown.open').forEach(d => {
      if (d !== except) {
        d.classList.remove('open');
        // update aria-expanded for all toggles inside
        d.querySelectorAll('.dropdown-toggle').forEach(t => t.setAttribute('aria-expanded','false'));
      }
    });
  }

  // Toggle button clicks (small arrow buttons)
  document.querySelectorAll('.dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = btn.closest('.dropdown');
      if (!parent) return;

      const isOpen = parent.classList.toggle('open');
      // close siblings
      const siblings = parent.parentElement.querySelectorAll(':scope > .open');
      siblings.forEach(sib => { if (sib !== parent) sib.classList.remove('open'); });

      // set aria-expanded on the toggle itself
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  // Desktop: allow hover to open - keep your CSS :hover rules if you like
  // (No JS needed for hover; user still can hover to open)

  // Mobile: tapping the anchor toggles instead of navigating
  function setupAnchorMobileBehavior() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    document.querySelectorAll('.dropdown > .dropdown-link').forEach(link => {
      // remove old handlers to avoid duplicates
      link.onclick = null;

      if (isMobile) {
        link.addEventListener('click', function(e) {
          // If this dropdown has a submenu, toggle it instead of navigating
          const parent = link.closest('.dropdown');
          if (parent && parent.querySelector('.dropdown-content')) {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = parent.classList.toggle('open');
            // update toggles inside that parent (if any)
            parent.querySelectorAll('.dropdown-toggle').forEach(t => t.setAttribute('aria-expanded', isOpen ? 'true' : 'false'));
            // close other dropdowns at same level
            const siblings = parent.parentElement.querySelectorAll(':scope > .open');
            siblings.forEach(sib => { if (sib !== parent) sib.classList.remove('open'); });
          }
        });
      } else {
        // On desktop we want the anchor to navigate normally.
        // No click handler here.
      }
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => closeAll());

  // Initialize mobile behavior and re-run on resize
  setupAnchorMobileBehavior();
  window.addEventListener('resize', () => {
    // Debounce a little bit to avoid thrashing
    clearTimeout(window._navResizeTimer);
    window._navResizeTimer = setTimeout(setupAnchorMobileBehavior, 150);
  });

})();
