// Handles dropdown toggling logic
document.querySelectorAll('.dropdown-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const parent = button.parentElement;

    // Close other open dropdowns at the same level
    const siblings = parent.parentElement.querySelectorAll(':scope > .open');
    siblings.forEach(sib => { if (sib !== parent) sib.classList.remove('open'); });

    parent.classList.toggle('open');
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown.open, .dropdown-sub.open').forEach(drop => {
    drop.classList.remove('open');
  });
});
