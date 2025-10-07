// accordion.js
// Handles all accordion expand/collapse animations across the site

document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion-header");

  accordions.forEach(button => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling; // .accordion-content

      if (!content) return;

      // Check if currently expanded
      const isExpanded =
        content.style.maxHeight &&
        content.style.maxHeight !== "0px" &&
        content.style.maxHeight !== "none";

      if (isExpanded || content.style.maxHeight === "none") {
        // Collapse logic
        if (content.style.maxHeight === "none") {
          // Set fixed height before collapsing
          content.style.maxHeight = content.scrollHeight + "px";
          requestAnimationFrame(() => {
            content.style.transition = "max-height 0.35s ease";
            content.style.maxHeight = "0";
          });
        } else {
          content.style.transition = "max-height 0.35s ease";
          content.style.maxHeight = "0";
        }

        // Clean up after collapse completes
        const onCollapseEnd = function () {
          if (content.style.maxHeight === "0px") {
            content.style.maxHeight = "";
          }
          content.removeEventListener("transitionend", onCollapseEnd);
        };
        content.addEventListener("transitionend", onCollapseEnd);
      } else {
        // Expand logic
        content.style.transition = "max-height 0.35s ease";
        content.style.maxHeight = content.scrollHeight + "px";

        // Allow dynamic height after expansion
        const onExpandEnd = function () {
          content.style.maxHeight = "none";
          content.removeEventListener("transitionend", onExpandEnd);
        };
        content.addEventListener("transitionend", onExpandEnd);
      }
    });
  });
});
