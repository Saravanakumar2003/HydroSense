from fastapi import FastAPI
from transformers import pipeline
# CORS fix

from fastapi.middleware.cors import CORSMiddleware

# Initialize CORS middleware
origins = [
    "http://localhost:3000/ai",
    "https://your-frontend-domain.com",
]


app = FastAPI()
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins or specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
async def root():
    return {"message": "Server is running"}


@app.post("/summarize")
async def summarize_text(request: dict):
    text = request["text"]
    summary = summarizer(text, max_length=50, min_length=25, do_sample=False)
    return {"summary": summary[0]["summary_text"]}