#!/bin/bash

# CASHVOID Development Startup Script

# Check if .env file exists in Express backend
if [ ! -f cashvoid-express/.env ]; then
  echo "Creating .env file from example..."
  cp cashvoid-express/.env.example cashvoid-express/.env
  echo "Please edit cashvoid-express/.env file with your OpenAI API key"
  read -p "Press any key to continue..." -n1 -s
fi

# Start Express backend
echo "Starting Express backend..."
cd cashvoid-express
npm install
npm run dev &
EXPRESS_PID=$!

# Start Angular frontend
echo "Starting Angular frontend..."
cd ../cashvoid-angular
npm install
ng serve --open &
ANGULAR_PID=$!

# Handle graceful shutdown
trap "kill $EXPRESS_PID $ANGULAR_PID; exit" SIGINT SIGTERM EXIT

# Wait for processes
wait 