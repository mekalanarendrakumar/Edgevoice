# EdgeVoice - Quick Troubleshooting Guide

## Backend Connection Issues

### Problem: "Error extracting MFCC: Failed to fetch"

This error means the backend server is not running or not accessible.

### ✅ PERMANENT SOLUTIONS:

#### Solution 1: Use Auto-Restart Script
```
Double-click: START_BACKEND_AUTO_RESTART.bat
```
This script will:
- Start the backend server
- Auto-restart if it crashes
- Keep running until you close it

#### Solution 2: Use All Services Launcher
```
Double-click: START_ALL_SERVICES.bat
```
This script will:
- Start backend in a separate window
- Open the frontend automatically
- Verify backend is running
- Keep backend running in background

#### Solution 3: Manual Start
```
cd EdgeVoice_Project\backend
python app.py
```
Leave this terminal window open!

### 🔍 How to Verify Backend is Running:

1. **Check Terminal Window**
   - Look for: "Running on http://127.0.0.1:5000"
   - Should say: "Debugger is active!"

2. **Test in Browser**
   - Open: http://127.0.0.1:5000/health
   - Should show: {"status": "healthy", ...}

3. **Check Port**
   ```powershell
   netstat -ano | Select-String ":5000"
   ```
   Should show LISTENING on port 5000

### 🚨 Common Mistakes:

❌ **Closing the backend terminal window**
   → Backend stops immediately!
   
❌ **Starting backend then closing CMD**
   → Use START_BACKEND_AUTO_RESTART.bat instead

❌ **Not waiting for backend to start**
   → Wait 3-5 seconds after starting

❌ **Port 5000 already in use**
   → Kill other processes or restart computer

### 🔧 Fix Port 5000 Already in Use:

```powershell
# Find what's using port 5000
netstat -ano | Select-String ":5000"

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Then restart backend
.\START_BACKEND_AUTO_RESTART.bat
```

### 📋 Startup Checklist:

1. ✅ Start backend: `START_ALL_SERVICES.bat`
2. ✅ Wait for "Running on http://127.0.0.1:5000"
3. ✅ Keep backend window open
4. ✅ Open frontend: `index.html` or `wakeword.html`
5. ✅ Try Extract MFCC or Start Detection

### 🎯 Best Practice:

**Always start backend FIRST, then use the frontend!**

Use `START_ALL_SERVICES.bat` - it does everything automatically!

### 📱 Quick Commands:

```powershell
# Start everything
.\START_ALL_SERVICES.bat

# Just backend with auto-restart
.\START_BACKEND_AUTO_RESTART.bat

# Check if backend is running
curl http://127.0.0.1:5000/health

# Manual start
cd EdgeVoice_Project\backend
python app.py
```

### 🆘 Still Not Working?

1. Check Python is installed: `python --version`
2. Check dependencies: `pip list | Select-String "flask|librosa"`
3. Install if missing: `pip install flask flask-cors librosa numpy`
4. Restart computer
5. Try manual start and check for error messages

### 📞 Error Messages Explained:

| Error | Meaning | Solution |
|-------|---------|----------|
| "Failed to fetch" | Backend not running | Start backend |
| "Connection refused" | Wrong URL or port | Check http://127.0.0.1:5000 |
| "CORS error" | CORS not enabled | Use updated app.py |
| "500 Internal Server" | Backend crashed | Check backend terminal for errors |
| "No audio file" | No audio uploaded | Record or select file first |

### 🎓 Understanding the Architecture:

```
Frontend (HTML/JS)  →  Backend (Python/Flask)  →  Processing
   index.html       →     app.py on :5000      →  MFCC/Detection
   wakeword.html    →                          →
```

Both need to run simultaneously!

---

## Remember:
🔴 Backend must be running BEFORE using frontend
🟢 Use START_ALL_SERVICES.bat for automatic setup
🔵 Keep backend terminal window open
