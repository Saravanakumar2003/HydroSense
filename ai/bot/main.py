from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import json
import requests
import os
from dotenv import load_dotenv
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded

# Load environment variables from .env file
load_dotenv()

# Get the API key from the environment
HF_API_KEY = os.getenv("HF_API_KEY")

app = FastAPI()

# CORS Middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any domain
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Rate limiting
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_exception_handler(RateLimitExceeded, lambda request, exc: JSONResponse(
    status_code=429,
    content={"detail": "Rate limit exceeded. Try again later."}
))


#  Free AI API URL (Hugging Face Mistral 7B)
HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1"

@app.post("/ask")
@limiter.limit("1/second")  # Limit to 1 request per second
async def ask_question(request: Request):
    data = await request.json()
    question = data.get("question", "")
    sensor_data = json.dumps(data.get("data", {}))  # Convert sensor data to string

    if not question:
        return {"answer": "Please provide a valid question."}

    # Prepare payload for Hugging Face API
    payload = {
        "inputs": f"Sensor Data: {sensor_data}\nQuestion: {question}",
        "parameters": {"max_new_tokens": 200}  # Adjust response length
    }

    # Make a request to Hugging Face's Free AI API
    response = requests.post(HF_API_URL, headers={
        "Authorization": f"Bearer {HF_API_KEY}",
        "Content-Type": "application/json"
    }, json=payload)

    if response.status_code == 200:
        result = response.json()
        generated_text = result[0]["generated_text"]

        # Extract only the answer part (Assuming AI responds with "Answer: ...")
        answer = generated_text.split("Answer:")[-1].strip()

        return {"answer": answer}
    else:
        return {"answer": "Error: AI service is currently unavailable. Try again later."}
