# AI Module - Hydrosense

The `ai/` directory in Hydrosense contains artificial intelligence models and functionalities that power the system's predictive analytics, chatbot interaction, and data summarization.

## Directory Structure

```
ai/
├── bot/
├── models/
└── summarize/
```

### 1. `bot/` - AI Chatbot

This folder contains an AI-driven chatbot that answers user queries regarding water quality. The chatbot utilizes:
- Natural Language Processing (NLP) for understanding user inputs.
- Pre-trained models to analyze and respond to queries.

#### Running the Chatbot
```bash
cd ai/bot
python chatbot.py
```

---

### 2. `models/` - AI Models

This folder contains machine learning models used for water quality prediction. The primary model used is **Support Vector Regression (SVR)**, which predicts water potability based on sensor inputs.

#### Training the Model
```bash
cd ai/models
python train_model.py
```

#### Using the Model for Prediction
```python
from predict import predict_quality
result = predict_quality(ph=7.2, turbidity=1.5, tds=350)
print(result)  # Output: "Safe to Drink"
```

---

### 3. `summarize/` - Data Summarization

This module processes large water quality datasets and extracts meaningful insights. It includes:
- Data cleaning scripts.
- Statistical summary generation.
- Graphical trend plotting.

#### Running Summarization
```bash
cd ai/summarize
python summarize_data.py
```

---

## Dependencies
Ensure you have the necessary dependencies installed before running the AI modules:
```bash
pip install -r requirements.txt
```

## API Endpoints
If running as an API service, use the following endpoints:
- `/predict` - Accepts sensor data and returns water quality predictions.
- `/chat` - Handles chatbot queries.
- `/summarize` - Provides summarized insights from datasets.

## Conclusion
The AI module enhances Hydrosense by integrating predictive analytics and automated insights, helping users make informed decisions about water safety.

## Deployment Notes

https://dev.to/mihaiandrei97/building-a-fastapi-application-and-deploying-it-with-vercel-ho7

For powershell, use the following command to activate the virtual environment:
```powershell
env\Scripts\Activate
```