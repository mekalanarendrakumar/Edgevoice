@echo off
echo ================================
echo Starting EdgeVoice Complete System
echo ================================
echo.
echo This will start:
echo 1. Backend Server (Python Flask on port 5000)
echo 2. Static HTML Frontend (default browser)
echo.
echo Starting Backend Server in new window...
start "EdgeVoice Backend" cmd /k "%~dp0START_BACKEND.bat"
timeout /t 3 /nobreak >nul
echo.
echo Opening Frontend...
start "EdgeVoice Frontend" "%~dp0EdgeVoice_Project\frontend\index.html"
echo.
echo ================================
echo EdgeVoice System Started!
echo ================================
echo Backend: http://localhost:5000
echo Frontend: Opened in browser
echo.
echo To stop: Close the backend window
pause
