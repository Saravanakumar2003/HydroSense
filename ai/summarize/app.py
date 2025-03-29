from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
from fpdf import FPDF
import io
from starlette.responses import StreamingResponse

# Initialize FastAPI app
app = FastAPI()

# Hugging Face Summarization Model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn", framework="pt") 

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Endpoint
@app.get("/")
async def root():
    return {"message": "Server is running"}

# Request Model for Summarization & Report Generation
class ReportRequest(BaseModel):
    report_type: str
    data: list  # Sensor data from localStorage

# PDF Generation Function
def generate_pdf(summary: str, report_type: str):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", style="B", size=16)
    pdf.cell(200, 10, f"{report_type} Report", ln=True, align="C")
    
    pdf.set_font("Arial", size=12)
    pdf.ln(10)  # Line break
    pdf.multi_cell(0, 10, f"Summary:\n{summary}")

    # Save to in-memory file
    pdf_bytes = io.BytesIO()
    pdf.output(pdf_bytes, 'F')
    pdf_bytes.seek(0)
    
    return pdf_bytes

# Report Generation Endpoint
@app.post("/generate_report")
async def generate_report(request: ReportRequest):
    try:
        # Convert sensor data to text for summarization
        text = "\n".join([str(item) for item in request.data])[:1000]  # Truncate for efficiency
        summary = summarizer(text, max_length=50, min_length=25, do_sample=False)[0]["summary_text"]

        # Generate PDF Report
        pdf_bytes = generate_pdf(summary, request.report_type)
        
        return StreamingResponse(pdf_bytes, media_type="application/pdf", headers={
            "Content-Disposition": f"attachment; filename={request.report_type}_report.pdf"
        })
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
