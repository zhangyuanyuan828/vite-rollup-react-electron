import { ChildProcess, spawn } from 'child_process'
import electron from 'electron'
import { AddressInfo } from 'net'
import { watch } from 'rollup'
import { createServer } from 'vite'
import { mainOptions, preloadOptions } from '../rollup.config'

(async function start() {
  const server = await createServer()
  await server.listen()
  server.printUrls()

  const addressInfo = server?.httpServer?.address() as AddressInfo
  const protocol = server.config.server.https ? 'https://' : 'http://'
  const hostname = 'localhost'
  const port = addressInfo.port
  const base = server.config.base
  const VITE_DEV_SERVER_URL = protocol + hostname + ':' + port + base
  const env = Object.assign(process.env, {
    VITE_DEV_SERVER_URL
  })
  const mainWatcher = watch(mainOptions)
  const preloadWatcher = watch(preloadOptions)

  let electronProcess: ChildProcess
  mainWatcher.on('event', event => {
    if (event.code !== 'END') {
      return
    }
    if (electronProcess) {
      electronProcess.removeAllListeners('close')
      electronProcess.kill()
    }
    electronProcess = spawn(electron as unknown as string, ['.'], { env, stdio: 'inherit' })
    electronProcess.on('close', () => {
      server.close()
      mainWatcher.close()
      preloadWatcher.close()
    })
  })
  preloadWatcher.on('event', event => {
    if (event.code !== 'END') {
      return
    }
    server.ws.send({ type: 'full-reload' })
  })
})()
