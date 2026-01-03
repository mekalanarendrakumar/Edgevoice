@echo off
echo ================================
echo Starting EdgeVoice Backend Server
echo ================================
cd /d "%~dp0EdgeVoice_Project\backend"
echo Current directory: %CD%
echo.
echo Starting Flask server on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.
python app.py
pause
