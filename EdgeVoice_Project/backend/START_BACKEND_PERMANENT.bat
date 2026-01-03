@echo off
REM EdgeVoice Backend - Permanent Background Service with Auto-Restart
REM This script starts the backend and automatically restarts it if it crashes

setlocal enabledelayedexpansion

REM Get the directory where this script is located
cd /d "%~dp0"

REM Set window title
title EdgeVoice Backend Server (DO NOT CLOSE)

REM Create a log file
set LOGFILE=%~dp0backend.log
echo [%date% %time%] Starting EdgeVoice Backend Server >> "%LOGFILE%"

REM Start the backend with auto-restart loop
:RESTART
echo.
echo =========================================================
echo Starting EdgeVoice Backend Server...
echo Time: %date% %time%
echo =========================================================
echo.

REM Run the backend
python app_stable.py

REM If we get here, the backend crashed
echo.
echo =========================================================
echo [%date% %time%] Backend crashed! Restarting in 3 seconds...
echo =========================================================
echo.
echo [%date% %time%] Backend crashed! Restarting in 3 seconds... >> "%LOGFILE%"

REM Wait 3 seconds before restarting
timeout /t 3 /nobreak

REM Restart the backend
goto RESTART
