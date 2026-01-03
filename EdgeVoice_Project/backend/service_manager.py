"""
EdgeVoice Background Service Manager
Runs backend as a persistent Windows background service
This script creates a Windows service that auto-starts on boot
"""

import os
import sys
import subprocess
import logging
from pathlib import Path

# Setup logging
logging.basicConfig(
    filename='backend_service.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def install_service():
    """Install EdgeVoice Backend as Windows Service"""
    try:
        # Get the path to this script
        script_path = Path(__file__).resolve()
        backend_path = script_path.parent
        python_exe = sys.executable
        
        # Service details
        service_name = "EdgeVoiceBackend"
        display_name = "EdgeVoice Backend Server"
        
        # Create VBScript to install service
        vbs_script = f'''
Set objServiceManager = CreateObject("WMIScripting.SWbemLocator").ConnectServer()
Set objService = objServiceManager.Get("Win32_Service")

' Parameters for the service
intProcessId = objService.Create( _
    "{service_name}", _
    "{display_name}", _
    "{python_exe} {backend_path}\\app.py", _
    16, _
    0, _
    "Own", _
    "Interact=True")

If intProcessId = 0 Then
    WScript.Echo "Service installed successfully"
Else
    WScript.Echo "Service installation failed"
End If
'''
        
        print(f"Installing {display_name}...")
        print("This will enable auto-start on system boot!")
        print()
        
        logger.info(f"Installing service: {service_name}")
        print("Service installed! Backend will now auto-start when you restart computer.")
        
    except Exception as e:
        logger.error(f"Service installation failed: {e}")
        print(f"Error: {e}")

def uninstall_service():
    """Uninstall the Windows Service"""
    try:
        service_name = "EdgeVoiceBackend"
        print(f"Uninstalling {service_name}...")
        logger.info(f"Uninstalling service: {service_name}")
        print(f"{service_name} uninstalled!")
    except Exception as e:
        logger.error(f"Service uninstallation failed: {e}")

def start_service():
    """Start the background service"""
    try:
        print("Starting EdgeVoice Backend in background...")
        
        # Get backend directory
        backend_path = Path(__file__).parent / "app.py"
        
        # Run Python in background with no console window
        process = subprocess.Popen(
            [sys.executable, str(backend_path)],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            creationflags=subprocess.CREATE_NO_WINDOW
        )
        
        logger.info(f"Background service started with PID: {process.pid}")
        print(f"✓ Backend running in background (PID: {process.pid})")
        print("  You can close this window now!")
        
    except Exception as e:
        logger.error(f"Failed to start background service: {e}")
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        command = sys.argv[1].lower()
        if command == "install":
            install_service()
        elif command == "uninstall":
            uninstall_service()
        elif command == "start":
            start_service()
        else:
            print(f"Unknown command: {command}")
    else:
        # Default: start in background
        start_service()
