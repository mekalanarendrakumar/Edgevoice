# EdgeVoice - Running Backend Permanently (Background Service)

## ❌ WRONG WAY (Terminal Closes = Backend Stops):
```
Run: python app.py
Close terminal → Backend STOPS ❌
```

## ✅ RIGHT WAY (Permanent Background Service):

### Option 1: Simple Background Service (RECOMMENDED)
Double-click: **START_BACKEND_SERVICE.bat**

This will:
1. ✓ Start backend in invisible background
2. ✓ Close this window - backend keeps running!
3. ✓ Safe to close terminal
4. ✓ Works across all sessions

### Option 2: Task Scheduler (Auto-Start on Boot)

#### Windows 10/11:

1. **Open Task Scheduler**
   - Press: `Windows Key + R`
   - Type: `taskschd.msc`
   - Press: `Enter`

2. **Create New Task**
   - Right-click: "Task Scheduler Library"
   - Click: "Create Basic Task..."
   - Name: `EdgeVoice Backend`
   - Description: `Start EdgeVoice Backend Service`

3. **Set Trigger**
   - Select: "At startup"
   - Click: "Next >"

4. **Set Action**
   - Action: "Start a program"
   - Program: `cmd.exe`
   - Arguments: `/c START_BACKEND_SERVICE.bat`
   - Start in: (your EdgeVoice directory)
   - Click: "Next >" → "Finish"

5. **Verify**
   - Task will now run automatically when you restart!
   - Backend starts in background
   - No window appears

### Option 3: Batch File (No Terminal Visible)
Double-click: **START_BACKEND_BACKGROUND.bat**

Uses VBScript to run Python silently in background.

## 🔍 How to Verify Backend is Running in Background:

### Method 1: Check in Browser
Open: `http://127.0.0.1:5000/health`

Should show: `{"status": "healthy", ...}`

### Method 2: Check in Task Manager
1. Press: `Ctrl + Shift + Esc` (Task Manager)
2. Look for: `python.exe`
3. If found → Backend is running ✓

### Method 3: Check Port
```powershell
netstat -ano | Select-String ":5000"
```
Should show `LISTENING` on port 5000

## ⏸️ How to Stop Background Backend:

### Method 1: Task Manager
1. Press: `Ctrl + Shift + Esc`
2. Find: `python.exe`
3. Right-click → "End Task"

### Method 2: PowerShell
```powershell
taskkill /IM python.exe /F
```

### Method 3: Batch File
Create a file `STOP_BACKEND.bat`:
```batch
@echo off
taskkill /IM python.exe /F
echo Backend stopped!
pause
```

## 🎯 Complete Startup Procedure:

### First Time Setup:

1. **Start Backend in Background**
   ```
   Double-click: START_BACKEND_SERVICE.bat
   Wait 2-3 seconds
   Close the window (OK to close!)
   ```

2. **Verify Backend is Running**
   ```
   Open: http://127.0.0.1:5000/health
   Should show JSON response with "status": "healthy"
   ```

3. **Use Frontend**
   ```
   Open: EdgeVoice_Project/frontend/index.html
   Start using MFCC extraction
   Or open: wakeword.html for wake word detection
   ```

### Daily Usage:

**Option A: Manual Start Each Time**
1. Double-click `START_BACKEND_SERVICE.bat`
2. Wait 2 seconds
3. Close the window
4. Use frontend

**Option B: Auto-Start on Boot**
1. Set up Task Scheduler (one-time setup)
2. Restart computer
3. Backend automatically starts in background
4. Just open frontend and use!

## 📊 Comparison Table:

| Method | Terminal Visible | Auto-Start | Setup Time | Permanent |
|--------|-----------------|-----------|-----------|-----------|
| python app.py | ❌ YES | ❌ NO | 5 sec | ❌ NO (closes with terminal) |
| START_ALL_SERVICES.bat | ✅ YES | ❌ NO | 5 sec | ❌ NO (closes with terminal) |
| START_BACKEND_SERVICE.bat | ❌ NO | ❌ NO | 5 sec | ✅ YES (stays running) |
| Task Scheduler | ❌ NO | ✅ YES | 2 min | ✅ YES (auto-restart) |

## 🚀 BEST PRACTICE:

### For Daily Work:
Use: `START_BACKEND_SERVICE.bat`
- Quick and easy
- No terminal window
- Safe to close
- Runs until you manually stop it

### For Always-On:
Use: Task Scheduler
- Auto-starts with computer
- Fire and forget
- Perfect for development
- One-time setup

## ⚠️ Important Notes:

1. **Backend runs in background**
   - No visible window
   - No console output
   - But it IS running!

2. **Safe to close terminal**
   - Closing window ≠ stopping backend
   - Backend continues running
   - Use Task Manager to stop if needed

3. **Memory Usage**
   - Backend uses ~50-100 MB RAM
   - Minimal impact on system
   - Safe to leave running

4. **Multiple Starts**
   - Starting again when already running = multiple python.exe processes
   - Use Task Manager to stop first if needed
   - Or just restart computer

## 🆘 Troubleshooting:

### "Background service didn't start"
```powershell
# Check what's wrong
cd EdgeVoice_Project\backend
python app.py
# Look at error messages
```

### "Port 5000 already in use"
```powershell
# Find what's using it
netstat -ano | Select-String ":5000"
# Kill the process
taskkill /PID <PID> /F
```

### "Can't connect to backend"
```powershell
# Verify it's running
Get-Process python -ErrorAction SilentlyContinue
# Check port
Test-NetConnection -ComputerName 127.0.0.1 -Port 5000
```

## 📝 Quick Reference:

```powershell
# Start in background (closes window, backend continues)
.\START_BACKEND_SERVICE.bat

# Start and keep terminal (old way, terminal must stay open)
.\START_ALL_SERVICES.bat

# Verify backend is running
curl http://127.0.0.1:5000/health

# Stop backend
taskkill /IM python.exe /F

# Check if running
Get-Process python -ErrorAction SilentlyContinue
```

---

## Summary:

✅ **Use `START_BACKEND_SERVICE.bat` for daily work**
- Safe to close window
- Backend keeps running
- Works perfectly
- No visible terminal

✅ **Use Task Scheduler for always-on**
- Auto-starts with computer
- Zero daily setup
- Professional solution
- One-time configuration

✅ **Backend will NOT stop when terminal closes**
- Runs independently
- Only stops if you manually kill it
- Check Task Manager to verify
