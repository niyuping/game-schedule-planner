const { app, BrowserWindow } = require('electron')
const path = require('path')

const url = process.env.VITE_DEV_SERVER_URL

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './main/preload.ts')
    }
  })

  mainWindow.loadURL(url)

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
