@echo off
echo ================================
echo Opening Static HTML Frontend
echo ================================
cd /d "%~dp0EdgeVoice_Project\frontend"
echo Opening index.html in default browser...
start index.html
echo.
echo Note: Make sure the backend server is running!
echo Run START_BACKEND.bat first if not already running.
pause
