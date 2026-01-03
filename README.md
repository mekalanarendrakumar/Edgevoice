# EdgeVoice: Real-Time Speech AI System 🎙️

A real-time, on-device speech AI system for wake-word detection and smart device control at the edge. EdgeVoice combines web-based interfaces, Python backend processing, and hardware MFCC acceleration for robust, low-latency voice operation.

## 🚀 Quick Start

### Option 1: Vanilla JS Frontend (Simple & Fast)
```bash
# 1. Start the backend
cd EdgeVoice_Project/backend
python app.py

# 2. Open the frontend
# Simply open EdgeVoice_Project/frontend/index.html in your browser
```

### Option 2: React Frontend (Modern & Scalable)
```bash
# 1. Start the backend
cd EdgeVoice_Project/backend
python app.py

# 2. Start React frontend
cd edgevoice-ui
npm install
npm start
```

## 📁 Project Structure

This workspace contains two frontend implementations sharing a common backend:

```
ai/
├── EdgeVoice_Project/          # Main project
│   ├── backend/                # Python backend (shared)
│   └── frontend/               # Vanilla JS UI
│
└── edgevoice-ui/              # React-based modern UI
```

For detailed structure and file explanations, see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

## 🎯 Features

### Both Frontends Support:
- 🎤 Real-time microphone recording
- 📊 MFCC (Mel-Frequency Cepstral Coefficients) extraction
- 📈 Live waveform visualization
- 🔥 MFCC heatmap display
- 📁 Audio file upload support
- 💾 Download audio (WAV) and MFCC data (CSV)
- ⚡ Hardware accelerator integration
- 🎯 Wake-word detection

### React UI Additional Features:
- 🎨 Modern maroon/purple theme with lighting effects
- 📦 Component-based architecture
- 🎨 Tailwind CSS styling
- 📱 Responsive design

## 🛠️ Tech Stack

### Backend
- **Python 3.x**
- **Flask** - Web server
- **NumPy** - Numerical computing
- **Librosa** - Audio analysis
- **SciPy** - Signal processing

### Frontend Option 1 (Vanilla)
- **HTML5** - Structure
- **CSS3** - Styling with animations
- **Vanilla JavaScript** - Logic
- **Plotly.js** - Data visualization
- **Web Audio API** - Audio processing

### Frontend Option 2 (React)
- **React** - UI framework
- **Tailwind CSS** - Utility-first styling
- **Plotly.js** - Interactive charts
- **Node.js & npm** - Package management

## 📋 Backend API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/upload` | POST | Upload audio for MFCC extraction |
| `/extract_mfcc` | POST | Extract MFCC from uploaded audio |
| `/run_accelerator` | POST | Run hardware accelerator simulation |

## 🔧 Installation

### Backend Setup
```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
cd EdgeVoice_Project/backend
pip install flask numpy librosa scipy
```

### React Frontend Setup (Optional)
```bash
cd edgevoice-ui
npm install
```

## 📖 Usage Guide

### Recording Audio
1. Click **🎤 Record** button
2. Speak into your microphone
3. Click **⏹️ Stop** to finish recording
4. Optional: Click **▶️ Playback** to review

### Extracting MFCC
1. Record audio or upload a file using **📁 Choose File**
2. Click **📊 Extract MFCC**
3. View the MFCC heatmap and statistics
4. Download results using **⬇️ Download MFCC (CSV)**

### Running Hardware Accelerator
1. After recording/uploading audio
2. Click **⚡ Run Accelerator**
3. View real-time output and detection status

## 🌟 Frontend Comparison

| Feature | Vanilla JS | React |
|---------|-----------|-------|
| Setup Time | Instant | ~2 minutes |
| Build Required | ❌ No | ✅ Yes |
| Dependencies | None | Node.js |
| Best For | Quick testing | Production apps |
| Maintainability | Good | Excellent |
| Scalability | Limited | High |
| Learning Curve | Low | Medium |

## 📂 Key Files

### Backend
- [app.py](EdgeVoice_Project/backend/app.py) - Flask server
- [mfcc.py](EdgeVoice_Project/backend/mfcc.py) - MFCC implementation
- [command_detect.py](EdgeVoice_Project/backend/command_detect.py) - Voice command logic

### Vanilla Frontend
- [index.html](EdgeVoice_Project/frontend/index.html) - Main UI
- [script.js](EdgeVoice_Project/frontend/script.js) - Frontend logic
- [style.css](EdgeVoice_Project/frontend/style.css) - Styling

### React Frontend
- [App.js](edgevoice-ui/src/App.js) - Main component
- [package.json](edgevoice-ui/package.json) - Dependencies

## 🚧 Planned Features

- Hardware RTL design (Verilog)
- FPGA implementation
- Microcontroller firmware
- Pre-trained voice models
- Multi-language support

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please read the PROJECT_STRUCTURE.md first to understand the organization.

## 📞 Support

For issues, questions, or suggestions, please open an issue on the project repository.

---

**Note**: This project contains two frontend implementations. Choose the one that best fits your needs. See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed comparison and usage guidelines.
