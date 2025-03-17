# CASHVOID

CASHVOID.com is an experimental art project created by Joseph Spencer, exploring the intersection of artificial intelligence, digital aesthetics, and the uncanny. The project combines minimalist design with interactive elements to create an unsettling yet engaging user experience.

## Simplified Architecture

The application now consists of two main components:
- An Express.js backend handling AI interactions (replacing the previous Django backend)
- An Angular frontend delivering the user interface and animations

This simplified architecture makes deployment and maintenance much easier while preserving the original aesthetic and functionality.

## Core Features

### 4D Tesseract Animation
The homepage features a hypnotic 4D tesseract (hypercube) animation rendered in real-time using Canvas.

### CHATVOID
An AI chatbot interface that maintains a deliberately uncanny presence. Built using:
- OpenAI's API for response generation
- Custom prompt engineering to maintain the VOID persona
- Session-based conversation management

### Visual Design
The project employs a stark, minimalist aesthetic:
- Dark theme with high contrast elements
- Custom typography combining serif and monospace fonts
- Glowing red accents (#e63946) for interactive elements
- Responsive layout adapting to various screen sizes

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd cashvoid-angular
   npm install

   # Install backend dependencies
   cd ../cashvoid-express
   npm install
   ```
3. Create a `.env` file in the cashvoid-express directory:
   ```
   OPENAI_API_KEY=your_api_key_here
   PORT=3000
   NODE_ENV=development
   ```
4. Start the development servers:
   ```bash
   # Use the development script
   ./start-dev.sh
   ```
   Or start them manually:
   ```bash
   # Terminal 1: Start Express backend
   cd cashvoid-express
   npm run dev

   # Terminal 2: Start Angular frontend
   cd cashvoid-angular
   ng serve
   ```

## EC2 Deployment

### Prerequisites
- An AWS account with EC2 access
- An EC2 instance running Ubuntu 20.04 or later
- Your OpenAI API key

### Deployment Steps
1. SSH into your EC2 instance
2. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd cashvoid
   ```
3. Run the deployment script:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```
4. Enter your OpenAI API key when prompted
5. Access your application at the EC2 public IP address (port 3000)

### Security Considerations
For production use, consider:
- Setting up Nginx as a reverse proxy
- Configuring SSL with Let's Encrypt
- Using AWS EC2 security groups to restrict access
- Storing your API key in AWS Secrets Manager

## Creator's Intent
CASHVOID represents an exploration of digital spaces as liminal zones where human and machine intelligence intersect. The project deliberately maintains an atmosphere of artificial uncanniness, questioning the boundaries between human and AI interaction while embracing the aesthetics of digital minimalism.

## License & Attribution
© 2025 CASHVOID
Created by Joseph Spencer

## Contact
For inquiries about CASHVOID, please speak with CHATVOID directly through the chat interface.
