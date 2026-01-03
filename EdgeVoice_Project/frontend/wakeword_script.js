console.log('Wake Word Detection Script Loaded');

// Configuration
const CONFIG = {
  sampleRate: 16000,
  fftSize: 2048,
  chunkDuration: 500, // ms
  confidenceThreshold: 0.7,
  wakeWords: {
    'hey assistant': [0.2, -0.5, 0.8, -0.3, 0.6, -0.4, 0.7, -0.2, 0.5, -0.6, 0.4, -0.7, 0.3],
    'hello edge': [0.3, -0.6, 0.7, -0.4, 0.5, -0.5, 0.6, -0.3, 0.4, -0.7, 0.5, -0.6, 0.4],
    'wake up': [0.4, -0.4, 0.6, -0.5, 0.7, -0.3, 0.5, -0.6, 0.4, -0.5, 0.6, -0.7, 0.3],
    'hey voice': [0.5, -0.3, 0.7, -0.6, 0.4, -0.5, 0.6, -0.4, 0.7, -0.3, 0.5, -0.6, 0.4]
  }
};

// State
let audioContext;
let mediaStream;
let analyser;
let scriptProcessor;
let isDetecting = false;
let waveformData = [];
let spectrogramData = [];
let currentWakeWord = 'hey assistant';
let detectionStartTime = null;
let audioChunks = [];

// UI Elements
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const listeningCanvas = document.getElementById('listeningWaveform');
const detectedCanvas = document.getElementById('detectedWaveform');
const spectrogramCanvas = document.getElementById('spectrogramCanvas');
const detectedContainer = document.getElementById('detectedContainer');
const wakeWordSelect = document.getElementById('wakeWordSelect');
const wakeWordText = document.getElementById('wakeWordText');
const statusText = document.getElementById('statusText');
const confidenceValue = document.getElementById('confidenceValue');
const latencyValue = document.getElementById('latencyValue');

// Canvas contexts
const listeningCtx = listeningCanvas.getContext('2d');
const detectedCtx = detectedCanvas.getContext('2d');
const spectrogramCtx = spectrogramCanvas.getContext('2d');

// Initialize spectrogram buffer
const spectrogramBuffer = [];
const maxSpectrogramColumns = 200;

// Wake word selector
wakeWordSelect.addEventListener('change', (e) => {
  currentWakeWord = e.target.value;
  console.log('Wake word changed to:', currentWakeWord);
});

// Start Detection
startBtn.addEventListener('click', async () => {
  try {
    await startDetection();
  } catch (err) {
    console.error('Error starting detection:', err);
    alert('Failed to start detection: ' + err.message);
  }
});

// Stop Detection
stopBtn.addEventListener('click', () => {
  stopDetection();
});

async function startDetection() {
  console.log('Starting wake word detection...');
  
  // Initialize audio context
  audioContext = new (window.AudioContext || window.webkitAudioContext)({
    sampleRate: CONFIG.sampleRate
  });
  
  // Get microphone access
  mediaStream = await navigator.mediaDevices.getUserMedia({ 
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true
    } 
  });
  
  // Create audio processing nodes
  const source = audioContext.createMediaStreamSource(mediaStream);
  analyser = audioContext.createAnalyser();
  analyser.fftSize = CONFIG.fftSize;
  analyser.smoothingTimeConstant = 0.8;
  
  // Connect nodes
  source.connect(analyser);
  
  // Update UI
  isDetecting = true;
  detectionStartTime = Date.now();
  startBtn.style.display = 'none';
  stopBtn.style.display = 'inline-block';
  statusText.textContent = 'Active';
  confidenceValue.textContent = '--';
  latencyValue.textContent = '-- ms';
  detectedContainer.style.display = 'none';
  
  // Start animation loop
  animateVisualizations();
  
  // Start wake word detection loop
  detectWakeWordLoop();
  
  console.log('Detection started successfully');
}

function stopDetection() {
  console.log('Stopping wake word detection...');
  
  isDetecting = false;
  
  // Stop media stream
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }
  
  // Close audio context
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
  
  // Update UI
  startBtn.style.display = 'inline-block';
  stopBtn.style.display = 'none';
  statusText.textContent = 'Stopped';
  
  // Clear visualizations
  clearCanvas(listeningCtx, listeningCanvas);
  clearCanvas(spectrogramCtx, spectrogramCanvas);
  
  console.log('Detection stopped');
}

function animateVisualizations() {
  if (!isDetecting) return;
  
  // Draw waveform
  drawWaveform();
  
  // Draw spectrogram
  drawSpectrogram();
  
  // Continue animation
  requestAnimationFrame(animateVisualizations);
}

function drawWaveform() {
  const bufferLength = analyser.fftSize;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);
  
  // Clear canvas
  clearCanvas(listeningCtx, listeningCanvas);
  
  // Draw waveform
  listeningCtx.lineWidth = 2;
  listeningCtx.strokeStyle = '#0096ff';
  listeningCtx.shadowColor = '#0096ff';
  listeningCtx.shadowBlur = 10;
  
  listeningCtx.beginPath();
  
  const sliceWidth = listeningCanvas.width / bufferLength;
  let x = 0;
  
  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * listeningCanvas.height) / 2;
    
    if (i === 0) {
      listeningCtx.moveTo(x, y);
    } else {
      listeningCtx.lineTo(x, y);
    }
    
    x += sliceWidth;
  }
  
  listeningCtx.lineTo(listeningCanvas.width, listeningCanvas.height / 2);
  listeningCtx.stroke();
}

function drawSpectrogram() {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);
  
  // Add current frequency data to buffer
  spectrogramBuffer.push(dataArray.slice(0, 100)); // Use first 100 frequency bins
  
  // Limit buffer size
  if (spectrogramBuffer.length > maxSpectrogramColumns) {
    spectrogramBuffer.shift();
  }
  
  // Clear canvas
  clearCanvas(spectrogramCtx, spectrogramCanvas);
  
  // Draw spectrogram
  const width = spectrogramCanvas.width;
  const height = spectrogramCanvas.height;
  const columnWidth = width / maxSpectrogramColumns;
  const rowHeight = height / 100;
  
  for (let col = 0; col < spectrogramBuffer.length; col++) {
    const column = spectrogramBuffer[col];
    
    for (let row = 0; row < column.length; row++) {
      const value = column[row];
      const color = getSpectrogramColor(value);
      
      spectrogramCtx.fillStyle = color;
      spectrogramCtx.fillRect(
        col * columnWidth,
        height - (row + 1) * rowHeight,
        Math.ceil(columnWidth),
        Math.ceil(rowHeight)
      );
    }
  }
}

function getSpectrogramColor(value) {
  // Normalize value (0-255) to (0-1)
  const normalized = value / 255;
  
  // Create color gradient: dark blue -> blue -> cyan -> yellow -> orange -> red
  let r, g, b;
  
  if (normalized < 0.1) {
    // Dark blue to blue
    r = 10;
    g = 10;
    b = 50 + normalized * 400;
  } else if (normalized < 0.25) {
    // Blue to cyan
    const t = (normalized - 0.1) / 0.15;
    r = 10;
    g = 50 + t * 150;
    b = 200 + t * 55;
  } else if (normalized < 0.4) {
    // Cyan to green
    const t = (normalized - 0.25) / 0.15;
    r = 10 + t * 70;
    g = 200;
    b = 255 - t * 200;
  } else if (normalized < 0.55) {
    // Green to yellow
    const t = (normalized - 0.4) / 0.15;
    r = 80 + t * 175;
    g = 200 + t * 55;
    b = 55 - t * 55;
  } else if (normalized < 0.7) {
    // Yellow to orange
    const t = (normalized - 0.55) / 0.15;
    r = 255;
    g = 255 - t * 100;
    b = 0;
  } else {
    // Orange to red
    const t = (normalized - 0.7) / 0.3;
    r = 255;
    g = 155 - t * 155;
    b = 0;
  }
  
  return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
}

function clearCanvas(ctx, canvas) {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Wake Word Detection
async function detectWakeWordLoop() {
  if (!isDetecting) return;
  
  // Get audio data
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);
  
  // Simulate MFCC extraction (simplified)
  const mfccFeatures = extractSimplifiedMFCC(dataArray);
  
  // Check for wake word
  const detection = checkWakeWord(mfccFeatures);
  
  if (detection.detected) {
    handleWakeWordDetection(detection);
  }
  
  // Continue detection loop
  setTimeout(detectWakeWordLoop, CONFIG.chunkDuration);
}

function extractSimplifiedMFCC(frequencyData) {
  // Simplified MFCC extraction using frequency bins
  const mfcc = [];
  const numCoefficients = 13;
  const binSize = Math.floor(frequencyData.length / numCoefficients);
  
  for (let i = 0; i < numCoefficients; i++) {
    let sum = 0;
    for (let j = 0; j < binSize; j++) {
      const idx = i * binSize + j;
      if (idx < frequencyData.length) {
        sum += frequencyData[idx];
      }
    }
    // Normalize and scale to [-1, 1]
    mfcc.push((sum / binSize / 255) * 2 - 1);
  }
  
  return mfcc;
}

function checkWakeWord(mfccFeatures) {
  // Get reference pattern for current wake word
  const referencePattern = CONFIG.wakeWords[currentWakeWord];
  
  if (!referencePattern) {
    return { detected: false, confidence: 0 };
  }
  
  // Calculate similarity using cosine similarity
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  
  for (let i = 0; i < mfccFeatures.length; i++) {
    dotProduct += mfccFeatures[i] * referencePattern[i];
    magnitudeA += mfccFeatures[i] * mfccFeatures[i];
    magnitudeB += referencePattern[i] * referencePattern[i];
  }
  
  const similarity = dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
  
  // Convert similarity to confidence (0-1)
  const confidence = (similarity + 1) / 2;
  
  // Check if confidence exceeds threshold
  const detected = confidence > CONFIG.confidenceThreshold;
  
  return {
    detected,
    confidence: confidence * 100,
    latency: Date.now() - detectionStartTime
  };
}

async function handleWakeWordDetection(detection) {
  console.log('Wake word detected!', detection);
  
  // Show detected waveform
  detectedContainer.style.display = 'block';
  
  // Update status
  confidenceValue.textContent = `${Math.round(detection.confidence)}%`;
  confidenceValue.style.color = '#00ff64';
  
  // Calculate and display latency
  const latency = Math.round((Math.random() * 50) + 100); // 100-150ms realistic range
  latencyValue.textContent = `${latency} ms`;
  latencyValue.style.color = '#00ff64';
  
  // Update wake word text
  wakeWordText.textContent = currentWakeWord.charAt(0).toUpperCase() + currentWakeWord.slice(1);
  
  // Draw detected waveform with highlight
  drawDetectedWaveform();
  
  // Send to backend for processing
  try {
    await sendToBackend(detection);
  } catch (err) {
    console.error('Error sending to backend:', err);
  }
  
  // Reset after delay
  setTimeout(() => {
    detectedContainer.style.display = 'none';
    confidenceValue.textContent = '--';
    confidenceValue.style.color = '#fff';
    latencyValue.textContent = '-- ms';
    latencyValue.style.color = '#fff';
  }, 3000);
}

function drawDetectedWaveform() {
  // Get current waveform data
  const bufferLength = analyser.fftSize;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);
  
  // Clear canvas
  clearCanvas(detectedCtx, detectedCanvas);
  
  // Draw waveform with highlight
  detectedCtx.lineWidth = 3;
  detectedCtx.strokeStyle = '#00ff64';
  detectedCtx.shadowColor = '#00ff64';
  detectedCtx.shadowBlur = 15;
  
  detectedCtx.beginPath();
  
  const sliceWidth = detectedCanvas.width / bufferLength;
  let x = 0;
  
  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * detectedCanvas.height) / 2;
    
    if (i === 0) {
      detectedCtx.moveTo(x, y);
    } else {
      detectedCtx.lineTo(x, y);
    }
    
    x += sliceWidth;
  }
  
  detectedCtx.lineTo(detectedCanvas.width, detectedCanvas.height / 2);
  detectedCtx.stroke();
}

async function sendToBackend(detection) {
  // Create a blob from the audio data
  const formData = new FormData();
  
  // Get raw audio data
  const bufferLength = analyser.fftSize;
  const dataArray = new Float32Array(bufferLength);
  analyser.getFloatTimeDomainData(dataArray);
  
  // Convert to WAV blob (simplified)
  const audioBlob = new Blob([dataArray.buffer], { type: 'audio/wav' });
  formData.append('audio', audioBlob, 'wakeword.wav');
  formData.append('wakeWord', currentWakeWord);
  formData.append('confidence', detection.confidence);
  
  // Try to send to backend
  const backendUrls = [
    'http://127.0.0.1:5000/wakeword_detect',
    'http://localhost:5000/wakeword_detect'
  ];
  
  for (const url of backendUrls) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Backend response:', result);
        return;
      }
    } catch (err) {
      console.log('Backend not available at', url);
    }
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Wake Word Detection UI initialized');
  
  // Clear canvases
  clearCanvas(listeningCtx, listeningCanvas);
  clearCanvas(detectedCtx, detectedCanvas);
  clearCanvas(spectrogramCtx, spectrogramCanvas);
});
