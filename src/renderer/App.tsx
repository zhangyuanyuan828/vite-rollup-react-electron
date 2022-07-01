import { useEffect, useState } from 'react'
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore } from 'react-icons/vsc'
import { Button, BUTTON_COLOR_THEMES } from './components'
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
    <div className="w-screen h-screen flex flex-col flex-nowrap">
      <div className="w-full h-8 flex-shrink-0 flex flex-row flex-nowrap items-center select-none app-drag">
        <div className="flex-shrink-0 font-bold px-4">
          <span>App Name</span>
        </div>
        <div className="flex-1"></div>
        <div className="h-full px-4 inline-flex items-center app-no-drag transition-colors duration-300 hover:bg-gray-300" onClick={handleMinimizeClick}>
          <VscChromeMinimize />
        </div>
        <div
          className="h-full px-4 inline-flex items-center app-no-drag transition-colors duration-300 hover:bg-gray-300"
          onClick={maximize ? handleRestoreClick : handleMaximizeClick}>
          {maximize ? <VscChromeRestore /> : <VscChromeMaximize />}
        </div>
        <div
          className="h-full px-4 inline-flex items-center app-no-drag transition-colors duration-300 hover:bg-red-600 hover:text-white"
          onClick={handleCloseClick}>
          <VscChromeClose />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-baseline">
            <Button size="small">Small</Button>
            <Button>Default</Button>
            <Button size="large">Large</Button>
            <Button disabled>Disabled</Button>
            <Button round>Round</Button>
          </div>
          {BUTTON_COLOR_THEMES.map(colorTheme => (
            <div key={colorTheme} className="flex gap-4 items-baseline">
              <Button colorTheme={colorTheme} size="small">
                Small
              </Button>
              <Button colorTheme={colorTheme}>Default</Button>
              <Button colorTheme={colorTheme} size="large">
                Large
              </Button>
              <Button colorTheme={colorTheme} disabled>
                Disabled
              </Button>
              <Button colorTheme={colorTheme} round>
                Round
              </Button>
            </div>
          ))}
          <Button colorTheme="blue" block>
            Block
          </Button>
        </div>
      </div>
    </div>
  )
}
