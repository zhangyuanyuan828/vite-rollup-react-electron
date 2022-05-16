import { chakra } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscChromeRestore } from 'react-icons/vsc'
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
    <chakra.div
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexFlow: 'column nowrap'
      }}>
      <chakra.div
        sx={{
          width: 'full',
          height: 8,
          display: 'flex',
          flexFlow: 'row nowrap',
          alignItems: 'center',
          userSelect: 'none',
          WebkitAppRegion: 'drag'
        }}>
        <chakra.div
          sx={{
            flexShrink: 0,
            px: 4,
            fontWeight: 'bold'
          }}>
          <span>App Name</span>
        </chakra.div>
        <chakra.div sx={{ flex: 1 }}></chakra.div>
        <chakra.div
          sx={{
            height: 'full',
            px: 4,
            display: 'inline-flex',
            alignItems: 'center',
            transitionProperty: 'background-color',
            transitionDuration: 'slow',
            transitionTimingFunction: 'ease-in-out',
            WebkitAppRegion: 'no-drag',
            _hover: {
              backgroundColor: '#ccc'
            },
            _active: {
              backgroundColor: '#aaa'
            }
          }}
          onClick={handleMinimizeClick}>
          <VscChromeMinimize />
        </chakra.div>
        <chakra.div
          sx={{
            height: 'full',
            px: 4,
            display: 'inline-flex',
            alignItems: 'center',
            transitionProperty: 'background-color',
            transitionDuration: 'slow',
            transitionTimingFunction: 'ease-in-out',
            WebkitAppRegion: 'no-drag',
            _hover: {
              backgroundColor: '#ccc'
            },
            _active: {
              backgroundColor: '#aaa'
            }
          }}
          onClick={maximize ? handleRestoreClick : handleMaximizeClick}>
          {maximize ? <VscChromeRestore /> : <VscChromeMaximize />}
        </chakra.div>
        <chakra.div
          sx={{
            height: 'full',
            px: 4,
            display: 'inline-flex',
            alignItems: 'center',
            transitionProperty: 'background-color',
            transitionDuration: 'slow',
            transitionTimingFunction: 'ease-in-out',
            WebkitAppRegion: 'no-drag',
            _hover: {
              backgroundColor: 'red.500',
              color: 'white'
            },
            _active: {
              backgroundColor: 'red.400',
              color: 'white'
            }
          }}
          onClick={handleCloseClick}>
          <VscChromeClose />
        </chakra.div>
      </chakra.div>
    </chakra.div>
  )
}
