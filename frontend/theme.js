// ==========================================
// Forge Theme Toggle
// ==========================================

const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");

// Load saved theme

let currentTheme = localStorage.getItem("theme") || "dark";

// Apply theme on page load

document.body.classList.add(currentTheme);

updateIcon();

// Toggle theme

themeBtn.addEventListener("click", () => {

    document.body.classList.remove(currentTheme);

    if (currentTheme === "dark") {

        currentTheme = "light";

    }

    else {

        currentTheme = "dark";

    }

    document.body.classList.add(currentTheme);

    localStorage.setItem("theme", currentTheme);

    updateIcon();

});

// Change icon

function updateIcon() {

    if (currentTheme === "dark") {

        themeIcon.className = "fa-solid fa-moon";

    }

    else {

        themeIcon.className = "fa-solid fa-sun";

    }

}