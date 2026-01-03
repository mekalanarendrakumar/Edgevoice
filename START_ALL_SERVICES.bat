@echo off
title EdgeVoice - Start All Services
color 0B

echo ================================================
echo       EdgeVoice - Starting All Services
echo ================================================
echo.
echo This will start:
echo  1. Backend Server (Port 5000)
echo  2. React Frontend (if available)
echo.
echo Starting services...
echo.

REM Start Backend Server in new window
echo [1/2] Starting Backend Server...
start "EdgeVoice Backend" cmd /k "cd /d "%~dp0EdgeVoice_Project\backend" && python app.py"
timeout /t 2 /nobreak >nul

REM Check if backend is running
echo [2/2] Verifying backend...
timeout /t 3 /nobreak >nul

curl -s http://127.0.0.1:5000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo.
    echo ================================================
    echo   Backend Server: RUNNING on port 5000
    echo ================================================
) else (
    echo.
    echo ================================================
    echo   Backend Server: STARTING... (may take a moment)
    echo ================================================
)

echo.
echo Opening main application...
timeout /t 2 /nobreak >nul
start "" "%~dp0EdgeVoice_Project\frontend\index.html"

echo.
echo ================================================
echo   All services started!
echo ================================================
echo.
echo  Backend:  http://127.0.0.1:5000
echo  Frontend: EdgeVoice_Project\frontend\index.html
echo.
echo  Wake Word Detection: wakeword.html
echo.
echo Press any key to exit this window...
echo (Backend will continue running in separate window)
pause >nul
