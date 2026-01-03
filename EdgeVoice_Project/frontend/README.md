# EdgeVoice Frontend - Vanilla JavaScript

## Overview
This is the vanilla JavaScript implementation of EdgeVoice UI. It provides a lightweight, no-build-required interface for real-time MFCC extraction and voice command detection.

## Features
- 🎤 **Real-time Audio Recording** - Direct browser microphone access
- 📊 **MFCC Visualization** - Interactive heatmap and waveform display
- 📁 **File Upload** - Support for WAV, MP3, and other audio formats
- ▶️ **Audio Playback** - Custom audio player with controls
- 💾 **Data Export** - Download WAV files and MFCC data as CSV
- 📈 **Statistics Display** - Real-time MFCC statistics
- ⚡ **Hardware Accelerator** - Integration with FPGA-based processing
- 🎨 **HDR Neon Design** - Stunning visual effects with glassmorphism

## Files
- **index.html** - Main UI structure
- **style.css** - Complete stylesheet with animations and effects
- **script.js** - Frontend logic and API integration

## Quick Start
1. Ensure the backend server is running:
   ```bash
   cd ../backend
   python app.py
   ```

2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge recommended)

3. Allow microphone permissions when prompted

## Usage

### Recording Audio
1. Click **🎤 Record** to start recording
2. Speak into your microphone
3. Click **⏹️ Stop** when finished
4. Use **▶️ Playback** to listen to your recording

### Uploading Files
1. Click **📁 Choose File**
2. Select an audio file from your computer
3. The file will be automatically uploaded to the server

### Extracting MFCC
1. After recording or uploading
2. Click **📊 Extract MFCC**
3. View the results in:
   - MFCC Heatmap
   - Statistics Panel
   - Real-Time Output Panel

### Running Hardware Accelerator
1. Click **⚡ Run Accelerator**
2. View real-time processing results
3. Check detection status for wake-word recognition

## API Integration
The frontend communicates with the backend at `http://localhost:5000`:

| Endpoint | Purpose |
|----------|---------|
| `/upload` | Upload audio files |
| `/extract_mfcc` | Extract MFCC coefficients |
| `/run_accelerator` | Trigger hardware acceleration |

## Browser Requirements
- **Modern browser** with Web Audio API support
- **HTTPS or localhost** for microphone access
- **JavaScript enabled**
- Recommended: Chrome 90+, Firefox 88+, Edge 90+

## Customization
All styles are in `style.css` with organized sections:
- Base styles and animations
- Button effects and glassmorphism
- Panel designs with neon glow
- Custom audio player styling
- Responsive design rules

## Advantages
✅ No build process required  
✅ Instant deployment  
✅ Lightweight and fast  
✅ Easy to modify  
✅ Works offline (with backend)  
✅ No npm dependencies  

## Comparison with React Version
This vanilla JS version is ideal for:
- Quick prototyping
- Simple deployments
- Learning and experimentation
- Environments without Node.js

For production apps with complex features, consider the React version in `../edgevoice-ui/`

## Development Tips
- Use browser DevTools for debugging
- Check Console for error messages
- Network tab shows API communication
- Use file:// protocol works but localhost is better for CORS

## License
MIT - See root LICENSE file
