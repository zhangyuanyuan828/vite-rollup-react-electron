import { ChildProcess, spawn } from 'child_process'
import electron from 'electron'
import { AddressInfo } from 'net'
import { watch } from 'rollup'
import { createServer } from 'vite'
import options from '../rollup.config'

(async function start() {
  const server = await createServer()
  await server.listen()
  server.printUrls()

  console.log(process.env.NODE_ENV)

  const addressInfo = server?.httpServer?.address() as AddressInfo
  const protocol = server.config.server.https ? 'https://' : 'http://'
  const hostname = 'localhost'
  const port = addressInfo.port
  const base = server.config.base
  const VITE_DEV_SERVER_URL = protocol + hostname + ':' + port + base
  const env = Object.assign(process.env, {
    VITE_DEV_SERVER_URL
  })
  const watcher = watch(options)

  let electronProcess: ChildProcess
  watcher.on('event', event => {
    if (event.code !== 'END') {
      return
    }
    if (electronProcess) {
      electronProcess.removeAllListeners('close')
      electronProcess.kill()
    }
    electronProcess = spawn(electron as unknown as string, ['.'], { env })
    electronProcess.on('close', () => {
      server.close()
      watcher.close()
    })
  })
})()
