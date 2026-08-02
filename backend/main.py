
from fastapi import UploadFile, File
from fastapi.responses import FileResponse
from pypdf import PdfWriter
import tempfile


from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

import qrcode
import io

app = FastAPI()
# Allow Frontend to Access Backend

app.add_middleware(

    CORSMiddleware,

    allow_origins=["http://127.0.0.1:5500"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)


@app.get("/")
def home():
    return {
        "project": "Forge",
        "status": "Backend Running 🚀"
    }


@app.get("/generate")
def generate_qr(text: str):

    img = qrcode.make(text)

    buffer = io.BytesIO()

    img.save(buffer, format="PNG")

    buffer.seek(0)

    return StreamingResponse(buffer, media_type="image/png")

@app.post("/merge")
async def merge_pdfs(

    pdf1: UploadFile = File(...),

    pdf2: UploadFile = File(...)

):

    writer = PdfWriter()

    writer.append(pdf1.file)

    writer.append(pdf2.file)

    temp = tempfile.NamedTemporaryFile(

        delete=False,

        suffix=".pdf"

    )

    writer.write(temp)

    temp.close()

    return FileResponse(

        temp.name,

        media_type="application/pdf",

        filename="merged.pdf"

    )