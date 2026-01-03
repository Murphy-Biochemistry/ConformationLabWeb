document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");

  if (!toggle) return; // Falls kein Toggle da ist

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("darkmode");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      document.body.classList.add("darkmode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("darkmode");
      localStorage.setItem("theme", "light");
    }
  });
});