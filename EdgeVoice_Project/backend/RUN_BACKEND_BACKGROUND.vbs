' EdgeVoice Backend - Silent Background Runner
' This VBScript runs the backend batch file in the background without showing the console window

Set objShell = CreateObject("WScript.Shell")
strBatchFile = """" & CreateObject("WScript.Shell").CurrentDirectory & "\START_BACKEND_PERMANENT.bat"""

' Get the backend directory
Set objFSO = CreateObject("Scripting.FileSystemObject")
strBackendDir = objFSO.GetParentFolderName(WScript.ScriptFullName)

' Change to backend directory and run the batch file
objShell.Run strBatchFile, 1, False
