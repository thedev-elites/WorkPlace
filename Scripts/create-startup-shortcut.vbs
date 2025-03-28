Set objWShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

' Get the scripts directory path
scriptDir = objFSO.GetParentFolderName(WScript.ScriptFullName)

' Path to the batch file
batchPath = objFSO.BuildPath(scriptDir, "start-auto-ip-daemon.bat")

' Create a shortcut in the Windows Startup folder
startupFolder = objWShell.SpecialFolders("Startup")
shortcutPath = objFSO.BuildPath(startupFolder, "MongoDB IP Updater.lnk")

Set objShortcut = objWShell.CreateShortcut(shortcutPath)
objShortcut.TargetPath = batchPath
objShortcut.Description = "MongoDB Atlas IP Whitelist Updater"
objShortcut.WorkingDirectory = scriptDir
objShortcut.WindowStyle = 7  ' Minimized
objShortcut.Save

MsgBox "Startup shortcut created successfully!" & vbCrLf & vbCrLf & _
       "The MongoDB IP updater will now start automatically when you log in to Windows." & vbCrLf & vbCrLf & _
       "Shortcut location: " & shortcutPath, _
       vbInformation, "MongoDB IP Updater Setup" 