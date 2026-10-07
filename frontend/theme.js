// ==========================================
// Forge Theme Toggle
// ==========================================

const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");

// Load saved theme
let currentTheme = localStorage.getItem("theme") || "dark";

// Apply theme on page load
if (currentTheme === "light") {
    document.body.classList.add("light");
}

updateIcon();

// Toggle theme
if (themeBtn) {
    themeBtn.addEventListener("click", () => {

        document.body.classList.remove(currentTheme);

        currentTheme = currentTheme === "dark" ? "light" : "dark";

        if (currentTheme === "light") {
            document.body.classList.add("light");
        }

        localStorage.setItem("theme", currentTheme);

        updateIcon();

    });
}

// Change icon
function updateIcon() {
    if (!themeIcon) return;

    if (currentTheme === "dark") {
        themeIcon.className = "fa-solid fa-moon";
    } else {
        themeIcon.className = "fa-solid fa-sun";
    }
}