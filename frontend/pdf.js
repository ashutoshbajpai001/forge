// ==========================================
// Forge PDF Merge
// ==========================================
console.log("pdf.js loaded");
const pdf1 = document.getElementById("pdf1");
const pdf2 = document.getElementById("pdf2");
const mergeBtn = document.getElementById("mergeBtn");
const statusMessage = document.getElementById("statusMessage");

mergeBtn.addEventListener("click", async () => {
    console.log("Merge button clicked");
    if (!pdf1.files.length || !pdf2.files.length) {

        statusMessage.textContent = "Please select both PDF files.";
        return;

    }

    statusMessage.textContent = "";

    mergeBtn.disabled = true;
    mergeBtn.textContent = "Merging...";

    const formData = new FormData();

    formData.append("pdf1", pdf1.files[0]);
    formData.append("pdf2", pdf2.files[0]);

    try {

        const response = await fetch("http://127.0.0.1:8000/merge", {
            method: "POST",
            body: formData
        });

        console.log("Status:", response.status);

        if (!response.ok) {

            throw new Error("Server returned " + response.status);

        }

        const blob = await response.blob();

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = "merged.pdf";

        document.body.appendChild(a);

        a.click();

        a.remove();

        URL.revokeObjectURL(url);

        statusMessage.textContent = "✅ PDF merged successfully!";

    }
    catch (error) {

        console.error(error);

        statusMessage.textContent = "❌ Failed to merge PDFs.";

    }

    mergeBtn.disabled = false;
    mergeBtn.textContent = "Merge PDFs";

});