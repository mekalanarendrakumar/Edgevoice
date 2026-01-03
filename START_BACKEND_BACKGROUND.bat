@echo off
REM This batch file runs the backend in the background without a visible terminal window
REM The backend will keep running even after closing this batch file

title EdgeVoice Backend - Background Service
color 0A

:START
echo.
echo ========================================
echo  EdgeVoice Backend - Background Mode
echo ========================================
echo.
echo [%date% %time%] Starting background service...
echo.

cd /d "%~dp0EdgeVoice_Project\backend"

REM Run Python in detached mode - backend will continue running in background
start "" /B /min python app.py

REM Give it time to start
timeout /t 3 /nobreak >nul

REM Log file to track service
echo [%date% %time%] Backend service started in background >> backend.log
echo Backend PID: %errorlevel% >> backend.log

REM Exit this batch file - backend keeps running!
echo [%date% %time%] You can close this window. Backend continues running!
echo.
exit /b 0
