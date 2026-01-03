# EdgeVoice Project Structure

## Overview
This workspace contains the EdgeVoice speech AI system with two frontend implementations and a shared backend.

## Directory Organization

```
ai/
├── .venv/                          # Python virtual environment
├── EdgeVoice_Project/              # Main project (Vanilla JS implementation)
│   ├── backend/                    # Python backend server
│   │   ├── app.py                  # Flask server - receives audio from frontend
│   │   ├── command_detect.py       # Voice command detection logic
│   │   ├── mfcc.py                 # MFCC computation (software reference)
│   │   ├── temp/                   # Temporary files storage
│   │   └── __pycache__/            # Python cache files
│   │
│   └── frontend/                   # Vanilla JS frontend (HTML/CSS/JS)
│       ├── index.html              # Main UI page
│       ├── style.css               # Primary stylesheet
│       ├── style_hdr.css           # Header/additional styles
│       └── script.js               # Frontend logic & microphone access
│
└── edgevoice-ui/                   # React-based UI (Modern implementation)
    ├── public/                     # Static assets
    │   └── index.html              # React app entry point
    ├── src/                        # React source code
    │   ├── App.js                  # Main React component
    │   ├── App.css                 # Component styles
    │   ├── index.js                # React entry point
    │   └── index.css               # Global styles
    ├── package.json                # Node dependencies
    ├── tailwind.config.js          # Tailwind CSS configuration
    ├── postcss.config.js           # PostCSS configuration
    └── README.md                   # React UI documentation
```

## File Purpose

### Backend Files (Shared by both frontends)
- **app.py**: Flask server that receives audio data and processes it
- **command_detect.py**: Implements wake-word detection and command parsing
- **mfcc.py**: Software reference implementation of MFCC extraction

### Frontend Implementation #1: Vanilla JS (`EdgeVoice_Project/frontend/`)
- **Purpose**: Lightweight, no-build-required implementation
- **Best for**: Quick prototyping, simple deployments
- **Files**:
  - `index.html`: Complete UI with audio recording, playback, and MFCC visualization
  - `style.css`: Main styles with neon glow effects and animations
  - `style_hdr.css`: Additional header and supplementary styles
  - `script.js`: Handles microphone access, audio recording, and API calls

### Frontend Implementation #2: React (`edgevoice-ui/`)
- **Purpose**: Modern, component-based architecture with Tailwind CSS
- **Best for**: Scalable development, advanced features
- **Features**: Real-time waveform, MFCC heatmap, modern maroon/purple theme

## Which Frontend Should You Use?

### Use Vanilla JS Frontend if:
- You want a quick, no-build setup
- You need to run directly in a browser without Node.js
- You prefer simple file-based deployment
- You're doing rapid prototyping

### Use React Frontend if:
- You need a scalable, maintainable codebase
- You want component reusability
- You plan to add complex features
- You prefer modern development workflows

## Development Workflow

### Vanilla JS Frontend:
1. Navigate to `EdgeVoice_Project/backend/`
2. Run: `python app.py`
3. Open `EdgeVoice_Project/frontend/index.html` in a browser

### React Frontend:
1. Navigate to `edgevoice-ui/`
2. Run: `npm install` (first time only)
3. Run: `npm start`
4. Ensure backend is running at `http://localhost:5000`

## File Naming Conventions
- Python files: `snake_case.py`
- JavaScript files: `camelCase.js` or `PascalCase.js` for React components
- HTML/CSS files: `lowercase-hyphen.html`, `lowercase.css`
- Configuration files: `lowercase.config.js`

## Notes on Duplicate Files
- Both frontends share the same Python backend
- `index.html` exists in both projects but serves different purposes:
  - Vanilla version: Complete standalone application
  - React version: Minimal entry point for React app
- CSS files are separate between implementations (different styling approaches)
