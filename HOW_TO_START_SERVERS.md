# EdgeVoice Startup Guide

## The Problem
Your website shows "localhost refused to connect" because **no servers are running**. The servers stop when you close terminals or restart your computer.

## Permanent Solution

I've created 4 batch files in your project root to make starting servers easy:

### Option 1: Quick Start (Recommended)
**Double-click:** `START_ALL_SERVERS.bat`
- Starts backend server automatically
- Opens static HTML frontend in browser
- Everything works together!

### Option 2: Manual Start
1. **Double-click:** `START_BACKEND.bat` (Start this first!)
2. **Double-click:** `OPEN_STATIC_FRONTEND.bat`

### Option 3: React Frontend (Alternative)
1. **Double-click:** `START_BACKEND.bat`
2. **Double-click:** `START_REACT_FRONTEND.bat`
3. Open browser to http://localhost:3000

## Which Frontend to Use?

You have TWO frontends:

1. **Static HTML** (EdgeVoice_Project/frontend/) - **RECOMMENDED**
   - No npm needed
   - Opens directly in browser
   - Faster and simpler

2. **React** (edgevoice-ui/) - Advanced
   - Needs Node.js and npm
   - Runs on localhost:3000
   - More features but slower to start

## Why It Stopped Working

**Root Cause:** Servers must be running constantly while using the app
- Flask backend (Python) must run on port 5000
- If you close the terminal, the server stops
- Computer restart stops all servers

## How to Keep It Working Forever

### Method 1: Use the batch files (Easy)
Just double-click `START_ALL_SERVERS.bat` whenever you need to use the app

### Method 2: Auto-start on Windows startup (Advanced)
1. Press `Win + R`
2. Type: `shell:startup` and press Enter
3. Create a shortcut to `START_ALL_SERVERS.bat` in that folder
4. Servers will start automatically when Windows starts

## Troubleshooting

**"ModuleNotFoundError" or "Flask not found"**
```batch
cd EdgeVoice_Project\backend
pip install flask flask-cors librosa numpy
```

**"npm not found"** (Only if using React)
- Install Node.js from https://nodejs.org/

**Port already in use**
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000
# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

## Quick Test

1. Double-click `START_ALL_SERVERS.bat`
2. Wait 3-5 seconds for backend to start
3. Frontend should open automatically
4. Try recording or uploading audio

✅ If you see the EdgeVoice interface, it's working!
