# EdgeVoice Quick Reference Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Backend Setup
```bash
cd EdgeVoice_Project/backend
python app.py
```
✅ Backend running at http://localhost:5000

### Step 2: Choose Your Frontend

#### Option A: Vanilla JS (Recommended for Quick Start)
```bash
# Simply open in browser:
EdgeVoice_Project/frontend/index.html
```

#### Option B: React (Recommended for Development)
```bash
cd edgevoice-ui
npm install
npm start
```
✅ React app running at http://localhost:3000

### Step 3: Start Using EdgeVoice
1. Click 🎤 Record
2. Speak into microphone
3. Click ⏹️ Stop
4. Click 📊 Extract MFCC
5. View results!

---

## 📁 Project Organization

```
ai/
├── README.md                           ← 📖 Main documentation (start here!)
├── PROJECT_STRUCTURE.md                ← 🗂️ Detailed structure explanation
├── QUICK_START.md                      ← ⚡ This file
├── .gitignore                          ← 🚫 Git ignore rules
├── .editorconfig                       ← ⚙️ Editor configuration
├── .venv/                              ← 🐍 Python virtual environment
│
├── EdgeVoice_Project/                  ← 🎯 Main Project
│   ├── README.md                       ← Documentation
│   ├── backend/                        ← 🐍 Python Server
│   │   ├── README.md                   ← Backend docs
│   │   ├── app.py                      ← Flask server
│   │   ├── mfcc.py                     ← MFCC extraction
│   │   ├── command_detect.py           ← Voice commands
│   │   └── temp/                       ← Uploaded files
│   │
│   └── frontend/                       ← 🌐 Vanilla JS UI
│       ├── README.md                   ← Frontend docs
│       ├── index.html                  ← Main page
│       ├── script.js                   ← JavaScript logic
│       └── style.css                   ← All styles (consolidated)
│
└── edgevoice-ui/                       ← ⚛️ React UI (Alternative)
    ├── README.md                       ← React app docs
    ├── package.json                    ← Dependencies
    ├── src/                            ← Source code
    └── public/                         ← Static files
```

---

## 🎯 Key Features

### Both Frontends Provide:
- ✅ Real-time microphone recording
- ✅ MFCC extraction and visualization
- ✅ Audio file upload support
- ✅ Waveform and heatmap displays
- ✅ Statistics and data export
- ✅ Hardware accelerator integration
- ✅ Wake-word detection

### Differences:
| Feature | Vanilla JS | React |
|---------|-----------|-------|
| Setup Time | Instant | ~2 min |
| Dependencies | None | Node.js |
| Build Required | ❌ | ✅ |
| Best For | Testing | Production |

---

## 🔧 Common Commands

### Backend
```bash
# Start server
cd EdgeVoice_Project/backend
python app.py

# Install dependencies
pip install flask numpy librosa scipy
```

### React Frontend
```bash
# First time setup
cd edgevoice-ui
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Vanilla Frontend
No commands needed! Just open `EdgeVoice_Project/frontend/index.html`

---

## 📊 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Health check |
| `/upload` | POST | Upload audio file |
| `/extract_mfcc` | POST | Extract MFCC coefficients |
| `/run_accelerator` | POST | Run hardware simulation |

---

## 🛠️ Troubleshooting

### Backend won't start
```bash
# Check Python installation
python --version

# Reinstall dependencies
pip install -r requirements.txt
```

### Microphone not working
- ✅ Check browser permissions
- ✅ Use HTTPS or localhost
- ✅ Try different browser

### React app errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS issues
- ✅ Ensure backend is running
- ✅ Check backend URL in frontend code
- ✅ Backend should be on localhost:5000

---

## 📚 Documentation Files

- [README.md](README.md) - Main project overview
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Detailed organization
- [EdgeVoice_Project/README.md](EdgeVoice_Project/README.md) - Original project docs
- [EdgeVoice_Project/backend/README.md](EdgeVoice_Project/backend/README.md) - Backend API docs
- [EdgeVoice_Project/frontend/README.md](EdgeVoice_Project/frontend/README.md) - Vanilla JS guide
- [edgevoice-ui/README.md](edgevoice-ui/README.md) - React app guide

---

## 💡 Tips

### For Beginners
- Start with Vanilla JS frontend
- Read README.md files in each folder
- Check browser console for errors

### For Developers
- Use React frontend for scalability
- Customize backend in app.py
- Modify MFCC parameters in mfcc.py

### For Production
- Set Flask DEBUG=False
- Build React app (npm run build)
- Use production WSGI server
- Add authentication

---

## 🎨 Customization

### Change Colors
Edit `EdgeVoice_Project/frontend/style.css`:
- Lines 1-100: Background and base styles
- Lines 101-200: Button and panel effects
- Lines 201-300: Animations

### Modify MFCC Settings
Edit `EdgeVoice_Project/backend/mfcc.py`:
- Sample rate
- Frame length
- Number of coefficients
- Mel filters

### Add Features
1. Add backend endpoint in `app.py`
2. Update frontend in `script.js`
3. Add UI elements in `index.html`
4. Style in `style.css`

---

## ❓ Need Help?

1. Check the relevant README.md file
2. Review PROJECT_STRUCTURE.md
3. Check browser/terminal console
4. Verify all dependencies installed
5. Ensure ports 5000 and 3000 are free

---

**Ready to go? Start with Step 1 above! 🚀**
