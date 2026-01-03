@echo off
REM EdgeVoice - Start Backend as Windows Service (Permanent Background)
REM The backend will run in background and continue even after closing this window

title EdgeVoice Backend - Background Service Manager
color 0A

cls
echo ================================================
echo   EdgeVoice Backend Service Manager
echo ================================================
echo.
echo This will start the backend as a background service.
echo The backend will continue running even if you close this window!
echo.

REM Get to backend directory
cd /d "%~dp0EdgeVoice_Project\backend"

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

echo Starting backend service...
echo.

REM Create a VBScript to run Python in background silently
set vbs_file=%temp%\start_backend.vbs
(
echo Set objShell = CreateObject("WScript.Shell"^)
echo objShell.Run "python app.py", 0, False
) > %vbs_file%

REM Run the VBScript which starts Python silently
cscript.exe //nologo %vbs_file%

REM Clean up
del /f /q %vbs_file% >nul 2>&1

REM Wait a moment for backend to start
timeout /t 2 /nobreak >nul

REM Verify it's running
echo.
echo Verifying backend is running...
timeout /t 1 /nobreak >nul

REM Test the connection
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://127.0.0.1:5000/health' -TimeoutSec 2 -ErrorAction Stop; Write-Host '✓ Backend is running successfully!' -ForegroundColor Green } catch { Write-Host '✗ Backend may still be starting, please wait...' -ForegroundColor Yellow }"

echo.
echo ================================================
echo   Status: Backend service started!
echo ================================================
echo.
echo ✓ Backend is running in background
echo ✓ Safe to close this window
echo ✓ Backend will continue running
echo.
echo To verify backend is running:
echo   Open browser: http://127.0.0.1:5000/health
echo.
echo To stop backend (if needed):
echo   Open Task Manager ^(Ctrl+Shift+Esc^)
echo   Find "python.exe"
echo   Right-click and "End Task"
echo.
echo ================================================
echo.
echo You can now safely close this window!
echo.
timeout /t 5 /nobreak >nul
exit
