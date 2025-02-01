import os
from dotenv import load_dotenv
from openai import OpenAI
from django.conf import settings

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def generate_response(messages):
    chat_completion = client.chat.completions.create(
        messages=messages,
        model="gpt-4o",
    )
    response = chat_completion.choices[0].message.content
    return response
