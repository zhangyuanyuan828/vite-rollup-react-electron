import { contextBridge, ipcRenderer } from 'electron'

const api = {
  sayHello() {
    console.log('Hello, world!')
  },
  ipcRenderer,
  onWindowMaximize(callback: () => void) {
    ipcRenderer.on('window-maximize', callback)
  },
  onWindowUnmaximize(callback: () => void) {
    ipcRenderer.on('window-unmaximize', callback)
  },
  onWindowRestore(callback: () => void) {
    ipcRenderer.on('window-restore', callback)
  }
}

export type Api = typeof api

contextBridge.exposeInMainWorld('api', api)
