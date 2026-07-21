/* ==========================================================================
   THEME PERSISTENCE SYSTEM (js/theme.js)
   ========================================================================== */

/**
 * Initializes and manages light/dark mode state.
 * Employs immediate execution pattern when placed in <head> to prevent layout/color flash.
 */
(function () {
  const savedTheme = localStorage.getItem("theme");

  // Set default theme: dark mode
  let activeTheme = "dark";

  if (savedTheme) {
    activeTheme = savedTheme;
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    // If client specifically prefers light mode and has no saved choice
    activeTheme = "light";
  }

  document.documentElement.setAttribute("data-theme", activeTheme);
})();

// Once DOM has loaded, bind events for toggles
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    // Sync initial ARIA state
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "dark";
    themeToggle.setAttribute(
      "aria-label",
      `Switch to ${currentTheme === "light" ? "dark" : "light"} mode`,
    );
    themeToggle.setAttribute("aria-pressed", currentTheme === "light");

    themeToggle.addEventListener("click", () => {
      // Toggle logic
      const theme = document.documentElement.getAttribute("data-theme");
      const newTheme = theme === "light" ? "dark" : "light";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      // Update accessibility hooks
      themeToggle.setAttribute(
        "aria-label",
        `Switch to ${newTheme === "light" ? "dark" : "light"} mode`,
      );
      themeToggle.setAttribute("aria-pressed", newTheme === "light");

      // Trigger event for other listeners if needed
      window.dispatchEvent(
        new CustomEvent("themechanged", { detail: { theme: newTheme } }),
      );
    });
  }
});
