import { app, BrowserWindow, globalShortcut, Menu, protocol } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import { join } from 'path'

const isDevelopment = process.env.NODE_ENV === 'development'

protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createProtocol(scheme: string) {
  protocol.registerFileProtocol(scheme, (request, response) => {
    const pathname = decodeURI(new URL(request.url).pathname)
    response({
      path: join(__dirname, '../renderer', pathname)
    })
  })
}

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js')
    }
  })
  Menu.setApplicationMenu(null)
  if (isDevelopment) {
    globalShortcut.register('CommandOrControl+Shift+i', () => {
      mainWindow.webContents.openDevTools()
    })
  }
  if (process.env.VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    mainWindow.loadURL('app://./index.html')
  }
}

app.whenReady().then(async () => {
  if (isDevelopment) {
    try {
      await installExtension(REACT_DEVELOPER_TOOLS)
    } catch (error) {
      console.error('React Devtools failed to install:', error)
    }
  }
  createWindow()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
