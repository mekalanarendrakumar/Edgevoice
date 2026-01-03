# EdgeVoice Backend

## Overview
Python-based Flask server that handles audio processing, MFCC extraction, and hardware accelerator simulation for the EdgeVoice project.

## Files
- **app.py** - Main Flask server with API endpoints
- **mfcc.py** - MFCC extraction implementation (software reference)
- **command_detect.py** - Voice command detection and wake-word logic
- **temp/** - Temporary storage for uploaded audio files

## Requirements
```
flask
numpy
librosa
scipy
```

## Installation
```bash
# Create virtual environment
python -m venv ../.venv

# Activate virtual environment
# Windows:
..\.venv\Scripts\activate
# macOS/Linux:
source ../.venv/bin/activate

# Install dependencies
pip install flask numpy librosa scipy
```

## Running the Server
```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### GET /
Health check endpoint
```
Response: "EdgeVoice Backend is Running!"
```

### POST /upload
Upload audio file
```
Request: multipart/form-data with 'audio' file
Response: {"success": true, "filename": "audio.wav"}
```

### POST /extract_mfcc
Extract MFCC coefficients from uploaded audio
```
Request: {"filename": "audio.wav"}
Response: {
  "mfcc": [[...]], 
  "shape": [13, 100],
  "stats": {...}
}
```

### POST /run_accelerator
Simulate hardware accelerator processing
```
Request: {"filename": "audio.wav"}
Response: {
  "status": "complete",
  "mfcc_coefficients": [...],
  "detection": "wake_word_detected"
}
```

## Configuration
Edit these variables in `app.py`:
- `UPLOAD_FOLDER` - Temporary file storage location
- `ALLOWED_EXTENSIONS` - Supported audio formats
- `PORT` - Server port (default: 5000)
- `DEBUG` - Debug mode (default: True for development)

## MFCC Parameters
Configured in `mfcc.py`:
- Sample rate: 16000 Hz
- Frame length: 25ms
- Frame overlap: 10ms
- Number of MFCC coefficients: 13
- Number of Mel filters: 40

## Development
### Adding New Endpoints
1. Define route in `app.py`
2. Implement processing logic
3. Return JSON response
4. Update frontend to call new endpoint

### Debugging
- Check console output for errors
- Use Flask debug mode for detailed errors
- Monitor temp/ folder for uploaded files
- Use Postman or curl for API testing

## Testing
Test endpoints with curl:
```bash
# Health check
curl http://localhost:5000/

# Upload file
curl -X POST -F "audio=@sample.wav" http://localhost:5000/upload

# Extract MFCC
curl -X POST -H "Content-Type: application/json" \
  -d '{"filename":"sample.wav"}' \
  http://localhost:5000/extract_mfcc
```

## Production Deployment
For production use:
1. Set `DEBUG = False` in app.py
2. Use production WSGI server (gunicorn, waitress)
3. Add authentication if needed
4. Configure CORS properly
5. Set up file size limits
6. Implement request rate limiting

## Common Issues
- **CORS errors**: Add `flask-cors` and configure origins
- **Large files**: Increase `MAX_CONTENT_LENGTH` in Flask config
- **Slow processing**: Optimize MFCC computation or use hardware accelerator
- **Memory issues**: Clear temp/ folder regularly

## License
MIT - See root LICENSE file
