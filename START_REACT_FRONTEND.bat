@echo off
echo ================================
echo Starting React Frontend Server
echo ================================
cd /d "%~dp0edgevoice-ui"
echo Current directory: %CD%
echo.
echo Installing dependencies (first time only)...
call npm install
echo.
echo Starting React dev server on http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
call npm start
pause
