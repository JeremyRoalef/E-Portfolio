// fullscreen.js
// Enables fullscreen mode for any iframe preceded by a .fullscreen-btn button

document.addEventListener("DOMContentLoaded", () => {
  const fullscreenButtons = document.querySelectorAll(".fullscreen-btn");

  fullscreenButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const iframe = btn.nextElementSibling;

      if (!iframe) {
        console.warn("No iframe found next to fullscreen button.");
        return;
      }

      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) { // Safari
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) { // IE11
        iframe.msRequestFullscreen();
      } else {
        alert("Fullscreen mode is not supported by your browser.");
      }
    });
  });
});
