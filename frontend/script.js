// ==========================================
// Forge QR Generator
// ==========================================

// Get Elements

const input = document.getElementById("qrInput");
const button = document.getElementById("generateBtn");
const qrImage = document.getElementById("qrImage");
const downloadBtn = document.getElementById("downloadBtn");
const errorMessage = document.getElementById("errorMessage");


// ==========================================
// Generate QR
// ==========================================

button.addEventListener("click", () => {

    const text = input.value.trim();

    // Empty Input

    if (text === "") {

        errorMessage.textContent = "Please enter a URL or some text.";

        qrImage.style.display = "none";
        downloadBtn.style.display = "none";

        input.focus();

        return;

    }

    // Clear previous error

    errorMessage.textContent = "";

    // Backend URL

    const url =
        `http://127.0.0.1:8000/generate?text=${encodeURIComponent(text)}`;

    // Display QR

    qrImage.src = url;

    qrImage.style.display = "block";

    downloadBtn.style.display = "inline-block";

});




// ==========================================
// Download QR
// ==========================================

downloadBtn.addEventListener("click", async () => {

    try {

        const response = await fetch(qrImage.src);

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "forge-qr.png";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);

    }

    catch (error) {

        console.error(error);

        alert("Download failed.");

    }

});


// ==========================================
// Generate on Enter Key
// ==========================================

input.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        button.click();

    }

});