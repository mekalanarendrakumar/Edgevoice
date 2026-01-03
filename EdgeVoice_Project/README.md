# EdgeVoice_Project

EdgeVoice is a real-time, on-device speech AI system for wake-word detection and smart device control at the edge. It combines a web-based UI, Python backend, hardware MFCC accelerator, and microcontroller firmware for robust, low-latency operation.

## Project Structure

```
EdgeVoice_Project/
│
├── frontend/                 # Website (UI)
│   ├── index.html
│   ├── style.css
│   └── script.js             # Mic access, record voice
│
├── backend/                  # Local server (optional)
│   ├── app.py                # Receive audio from website
│   ├── mfcc.py               # MFCC (software reference)
│   └── command_detect.py     # Turn ON light / fan logic
│
├── hardware/                 # Main EdgeVoice part
│   ├── rtl/                  # RTL design (Verilog)
│   │   ├── adc_interface.v
│   │   ├── framing.v
│   │   ├── fft.v
│   │   ├── mel_filter.v
│   │   ├── log_dct.v
│   │   ├── mfcc_top.v
│   │   └── wake_word.v
│   │
│   ├── testbench/
│   │   ├── mfcc_tb.v
│   │   └── wake_word_tb.v
│   │
│   └── constraints/
│       └── pins.xdc          # FPGA pin mapping
│
├── firmware/                 # Controller code
│   ├── gpio_control.c        # Relay ON/OFF
│   └── main.c
│
├── models/                   # Stored voice patterns
│   ├── light_on.mfcc
│   ├── light_off.mfcc
│   └── fan_on.mfcc
│
├── docs/                     # Explanation & diagrams
│   ├── block_diagram.png
│   ├── flow_chart.png
│   └── explanation.md
│
└── README.md                 # Project explanation
```

## Quick Start

1. **Frontend:**
   - Open `frontend/index.html` in your browser.
   - Record voice and visualize waveform in real time.

2. **Backend:**
   - Run `python backend/app.py` to start the server.
   - Receives audio, extracts MFCC, detects command, and sends to hardware/firmware.

3. **Hardware:**
   - Synthesize and deploy RTL in `hardware/rtl/` to FPGA.
   - Use testbenches in `hardware/testbench/` for simulation.

4. **Firmware:**
   - Flash `firmware/main.c` and `gpio_control.c` to your microcontroller.
   - Controls relays based on received commands.

5. **Models:**
   - Store reference MFCC patterns for each command in `models/`.

6. **Docs:**
   - See `docs/` for block diagrams, flow charts, and detailed explanations.

## Features
- Real-time audio recording and visualization
- Software and hardware MFCC extraction
- Wake-word/command detection
- Edge device relay control (light, fan, etc.)
- Modular and extensible design

## License
MIT
