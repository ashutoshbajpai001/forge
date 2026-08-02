from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import qrcode
import io

app = FastAPI()


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