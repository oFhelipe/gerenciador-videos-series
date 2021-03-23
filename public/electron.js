const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev');
const path = require('path');

function createWindow () {

  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth:800,
    minHeight:600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    frame:false,
    center: true,
    title:"Video Player",
  })

  win.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.resolve(__dirname, '..', 'build', 'index.html')}`
  );

  win.webContents.session.loadExtension(path.resolve(__dirname, '..', 'extentions', 'react-dev-tools'));

  win.maximize();

}


app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
