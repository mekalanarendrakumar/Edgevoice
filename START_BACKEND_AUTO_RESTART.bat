@echo off
title EdgeVoice Backend Server - Auto Restart
color 0A

:START
cls
echo ========================================
echo  EdgeVoice Backend Server - Auto Restart
echo ========================================
echo.
echo [%date% %time%] Starting backend server...
echo.
cd /d "%~dp0EdgeVoice_Project\backend"

python app.py

echo.
echo [%date% %time%] Backend server stopped!
echo.
echo Restarting in 3 seconds...
echo Press Ctrl+C to exit permanently
timeout /t 3 /nobreak >nul
goto START
