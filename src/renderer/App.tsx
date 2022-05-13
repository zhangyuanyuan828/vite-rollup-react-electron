import { useEffect, useState } from 'react'
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore } from 'react-icons/vsc'
import './App.scss'
import { api } from './preload'

export function App() {
  const [maximize, setMaximize] = useState(false)

  useEffect(() => {
    api.onWindowMaximize(() => {
      setMaximize(true)
    })
    api.onWindowRestore(() => {
      setMaximize(false)
    })
    api.onWindowUnmaximize(() => {
      setMaximize(false)
    })
  }, [])

  function handleMinimizeClick() {
    api.ipcRenderer.send('window-minimize')
  }

  function handleMaximizeClick() {
    api.ipcRenderer.send('window-maximize')
  }

  function handleRestoreClick() {
    api.ipcRenderer.send('window-restore')
  }

  function handleCloseClick() {
    api.ipcRenderer.send('window-close')
  }

  return (
    <div className="app">
      <div className="app-header">
        <div className="app-logo">
          <span>App Name</span>
        </div>
        <div className="app-menus"></div>
        <div className="app-window-icon" onClick={handleMinimizeClick}>
          <VscChromeMinimize />
        </div>
        <div className="app-window-icon" onClick={maximize ? handleRestoreClick : handleMaximizeClick}>
          {maximize ? <VscChromeRestore /> : <VscChromeMaximize />}
        </div>
        <div className="app-window-icon window-close" onClick={handleCloseClick}>
          <VscChromeClose />
        </div>
      </div>
      <div className="app-content"></div>
    </div>
  )
}
