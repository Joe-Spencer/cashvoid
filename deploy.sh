#!/bin/bash

# CASHVOID EC2 Deployment Script

# Update system
echo "Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js and npm if not already installed
echo "Installing Node.js and npm..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Angular CLI globally
echo "Installing Angular CLI..."
sudo npm install -g @angular/cli

# Install PM2 for production process management
echo "Installing PM2..."
sudo npm install -g pm2

# Build Angular frontend
echo "Building Angular frontend..."
cd cashvoid-angular
npm install
ng build --configuration production

# Install Express backend dependencies
echo "Setting up Express backend..."
cd ../cashvoid-express
npm install

# Create .env file from example if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating .env file..."
  cp .env.example .env
  echo "Please edit .env file with your OpenAI API key"
  nano .env
fi

# Set production environment
echo "NODE_ENV=production" >> .env

# Start the Express server with PM2
echo "Starting Express server with PM2..."
pm2 start server.js --name "cashvoid"
pm2 save
pm2 startup

echo "CASHVOID deployment complete!"
echo "The app should be running at http://$(curl -s http://checkip.amazonaws.com):3000"
echo "Consider setting up Nginx as a reverse proxy for enhanced security and SSL." 