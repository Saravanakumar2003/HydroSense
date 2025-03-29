from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import json
import requests

app = FastAPI()

# ✅ CORS Middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with frontend URL if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# ✅ Free AI API URL (Hugging Face Mistral 7B)
HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1"

@app.post("/ask")
async def ask_question(request: Request):
    data = await request.json()
    question = data.get("question", "")
    sensor_data = json.dumps(data.get("data", {}))  # Convert sensor data to string

    if not question:
        return {"answer": "Please provide a valid question."}

    # ✅ Prepare payload for Hugging Face API
    payload = {
        "inputs": f"Sensor Data: {sensor_data}\nQuestion: {question}",
        "parameters": {"max_new_tokens": 200}  # Adjust response length
    }
    
    HF_API_KEY = "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"

    # ✅ Make a request to Hugging Face's Free AI API
    response = requests.post(HF_API_URL, headers={
        "Authorization": f"Bearer {HF_API_KEY}",
        "Content-Type": "application/json"
    }, json=payload)

    if response.status_code == 200:
        result = response.json()
        generated_text = result[0]["generated_text"]

        # ✅ Extract only the answer part (Assuming AI responds with "Answer: ...")
        answer = generated_text.split("Answer:")[-1].strip()

        return {"answer": answer}
    else:
        return {"answer": "Error: AI service is currently unavailable. Try again later."}
