# AI Module - Hydrosense

The `ai/` directory in Hydrosense contains artificial intelligence models and functionalities that power the system's predictive analytics, chatbot interaction, and data summarization.

## Directory Structure

```
ai/
├── bot/
├── models/
```

### 1. `bot/` - AI Chatbot

This folder contains an AI-driven chatbot that answers user queries regarding water quality. The chatbot utilizes:
- Natural Language Processing (NLP) for understanding user inputs.
- Pre-trained models to analyze and respond to queries.

#### Running the Chatbot
```bash
cd ai/bot
python main.py
```

---

### 2. `models/` - AI Models

This folder contains machine learning models used for water quality prediction. The primary model used is **Support Vector Regression (SVR)**, which predicts water potability based on sensor inputs.

#### Training the Model
```bash
cd ai/models/SVR
python main.py
```

#### Using the Model for Prediction
```python
from predict import predict_quality
result = predict_quality(ph=7.2, turbidity=1.5, tds=350)
print(result)  # Output: "Safe to Drink"
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
- `/ask` - Handles chatbot queries.

## Security Measures

The API enpoints has security measures in place:

- **Rate Limiting**: To prevent abuse, rate limiting is implemented on the API endpoints.
- **CORS**: Cross-Origin Resource Sharing (CORS) is configured to allow only trusted domains.
- **HTTPS**: Ensure the API is served over HTTPS to encrypt data in transit.
- **Environment Variables**: Sensitive information is stored in environment variables and not hardcoded in the codebase.
- **Logging**: All API requests and responses are logged for monitoring and debugging purposes.

## Conclusion
The AI module enhances Hydrosense by integrating predictive analytics and automated insights, helping users make informed decisions about water safety.

## Deployment Notes

Follow this guide to deploy the AI module in a production environment:

https://dev.to/mihaiandrei97/building-a-fastapi-application-and-deploying-it-with-vercel-ho7

