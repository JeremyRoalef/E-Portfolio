// Handles dropdown toggling logic
document.querySelectorAll('.dropdown-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const parent = button.parentElement;
    const hasSubmenu = parent.querySelector('.dropdown-content');

    // Only prevent navigation if the button has a submenu
    if (hasSubmenu) {
      e.preventDefault();      // stop the link from navigating
      e.stopPropagation();     // prevent click bubbling
      parent.classList.toggle('open');
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown.open, .dropdown-sub.open').forEach(drop => {
    drop.classList.remove('open');
  });
});
