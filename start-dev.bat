@echo off
echo CASHVOID Development Startup Script

REM Check if .env file exists in Express backend
if not exist "cashvoid-express\.env" (
  echo Creating .env file from example...
  copy "cashvoid-express\.env.example" "cashvoid-express\.env"
  echo Please edit cashvoid-express\.env file with your OpenAI API key
  pause
)

REM Start Express backend
echo Starting Express backend...
start cmd /k "cd cashvoid-express && npm install && npm run dev"

REM Wait a moment for Express to start
timeout /t 5

REM Start Angular frontend
echo Starting Angular frontend...
start cmd /k "cd cashvoid-angular && npm install && ng serve --open"

echo CASHVOID development environment started.
echo Press any key to shut down all CASHVOID processes.
pause

REM Kill all node processes when user presses a key
taskkill /f /im node.exe 