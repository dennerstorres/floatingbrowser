const { app, BrowserWindow, globalShortcut } = require('electron')
const fs = require('fs');
const path = require('path');
const ini = require('ini');

const config = ini.parse(fs.readFileSync(path.join('./SoluregWEB.ini'), 'utf-8'));

let win = null
let contents = null

function createWindow () {

  win = new BrowserWindow({
    width: config.PARAMS.width,
    height: config.PARAMS.height,
    // transparent:true,
    // frame:false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    },
  })

  win.loadURL(config.CONEXAO.url)

  contents = win.webContents

}

function toggleDevTools() {
  contents.toggleDevTools()
}

function createShortcuts() {
  globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady()
.then(createWindow)
.then(createShortcuts)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', recreateWindow)


function recreateWindow() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.