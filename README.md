# CASHVOID

CASHVOID.com is an experimental art project created by Joseph Spencer, exploring the intersection of artificial intelligence, digital aesthetics, and the uncanny. The project combines minimalist design with interactive elements to create an unsettling yet engaging user experience.

## Overview

The application consists of two main components:
- A Django backend handling AI interactions and API requests
- An Angular frontend delivering the user interface and animations

## Core Features

### 4D Tesseract Animation
The homepage features a hypnotic 4D tesseract (hypercube) animation rendered in real-time using Canvas. The animation serves as a visual metaphor for the project's exploration of dimensions beyond human perception.

### CHATVOID
An AI chatbot interface that maintains a deliberately uncanny presence. Built using:
- OpenAI's API for response generation
- Custom prompt engineering to maintain the VOID persona
- Real-time streaming responses
- Session-based conversation management

### Visual Design
The project employs a stark, minimalist aesthetic:
- Dark theme with high contrast elements
- Custom typography combining serif and monospace fonts
- Glowing red accents (#e63946) for interactive elements
- Responsive layout adapting to various screen sizes

## Technical Architecture


This will be hosted on AWS and use an EC2 to run python scripts for chatting and generating images. 

Chatting will probably utilize GPT-4 Mini to keep wait times low while keeping costs manageable.




## Setup & Development

### Backend Requirements
- Python 3.8+
- Django 4.x
- OpenAI API key
- Additional dependencies in requirements.txt

### Frontend Requirements
- Node.js 18+
- Angular CLI 17+
- NPM dependencies in package.json

### Local Development
1. Clone the repository
2. Set up the Django environment:
   ```bash
   cd cashvoid-django
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
3. Configure environment variables:
   ```
   OPENAI_API_KEY=your_key_here
   DJANGO_SECRET_KEY=your_key_here
   ```
4. Set up the Angular environment:
   ```bash
   cd cashvoid-angular
   npm install
   ```
5. Run development servers:
   ```bash
   # Django (from cashvoid-django directory)
   python manage.py runserver

   # Angular (from cashvoid-angular directory)
   ng serve
   ```

## Deployment
The application is designed to be deployed on AWS EC2:
- Frontend served through Nginx
- Backend running with Gunicorn
- HTTPS encryption via Certbot
- Environment variables managed through AWS Parameter Store

## Creator's Intent
CASHVOID represents an exploration of digital spaces as liminal zones where human and machine intelligence intersect. The project deliberately maintains an atmosphere of artificial uncanniness, questioning the boundaries between human and AI interaction while embracing the aesthetics of digital minimalism.

## License & Attribution
© 2025 CASHVOID
Created by Joseph Spencer

## Contact
For inquiries about CASHVOID, please speak with CHATVOID directly through the chat interface.
