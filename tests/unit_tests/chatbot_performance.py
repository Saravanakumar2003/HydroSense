import timeit
import requests

API_URL = "http://127.0.0.1:8000/ask"  # Change this if hosted elsewhere

payload = {
    "question": "What is the water quality?",
    "data": {"sensor_1": 7.5, "sensor_2": 3.2}
}

headers = {"Content-Type": "application/json"}

def test_chatbot_performance():
    response = requests.post(API_URL, json=payload, headers=headers)
    return response.status_code

# Measure response time for 10 requests
execution_time = timeit.timeit(test_chatbot_performance, number=10) / 10

print(f"Average Response Time: {execution_time:.4f} seconds")
print(f"Status Code: {test_chatbot_performance()}")


# Note: Ensure the FastAPI server is running before executing this test.
# You can run this script separately to test the performance of the chatbot API.

# This script measures the average response time of the chatbot API by sending 10 requests and printing the average time taken for each request.
# It also prints the status code of the last request to ensure the API is functioning correctly.
