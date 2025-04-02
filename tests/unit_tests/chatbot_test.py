import unittest
import json
import os
from fastapi.testclient import TestClient
from ai.bot.main import app  # Import your FastAPI app

class TestChatbotAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)
        os.environ["HF_API_KEY"] = "test_api_key"  # Mock API key

    def test_valid_question(self):
        """Test chatbot with a valid question"""
        payload = {
            "question": "What is the water quality?",
            "data": {"sensor_1": 7.5, "sensor_2": 3.2}
        }
        response = self.client.post("/ask", json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertIn("answer", response.json())

    def test_missing_question(self):
        """Test API with a missing question"""
        payload = {"data": {"sensor_1": 7.5}}
        response = self.client.post("/ask", json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["answer"], "Please provide a valid question.")

    def test_missing_api_key(self):
        """Test API when HF_API_KEY is not set"""
        del os.environ["HF_API_KEY"]  # Remove API key
        payload = {"question": "What is the water quality?", "data": {}}
        response = self.client.post("/ask", json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["answer"], "Error: AI API key is missing.")
        os.environ["HF_API_KEY"] = "test_api_key"  # Restore API key

    def test_invalid_json(self):
        """Test API with invalid JSON format"""
        response = self.client.post("/ask", data="invalid json")
        self.assertEqual(response.status_code, 422)  # 422 Unprocessable Entity

if __name__ == "__main__":
    unittest.main()
