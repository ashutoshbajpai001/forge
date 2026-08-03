from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

from pypdf import PdfWriter
import qrcode
import io

app = FastAPI()

# ==========================================
# Allow Frontend to Access Backend
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# Home
# ==========================================

@app.get("/")
def home():
    return {
        "project": "Forge",
        "status": "Backend Running 🚀"
    }

# ==========================================
# QR Generator
# ==========================================

@app.get("/generate")
def generate_qr(text: str):

    img = qrcode.make(text)

    buffer = io.BytesIO()

    img.save(buffer, format="PNG")

    buffer.seek(0)

    return StreamingResponse(
        buffer,
        media_type="image/png"
    )

# ==========================================
# PDF Merge
# ==========================================

@app.post("/merge")
async def merge_pdfs(

    pdf1: UploadFile = File(...),
    pdf2: UploadFile = File(...)

):

    writer = PdfWriter()

    writer.append(pdf1.file)
    writer.append(pdf2.file)

    buffer = io.BytesIO()

    writer.write(buffer)
    writer.close()

    buffer.seek(0)

    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition": "attachment; filename=merged.pdf"
        }
    )