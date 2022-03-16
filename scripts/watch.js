const { spawn } = require('child_process')
const electron = require('electron')
const path = require('path')
const rollup = require('rollup')
const vite = require('vite')
const options = require('../rollup.config')

async function createServer() {
  const server = await vite.createServer({
    configFile: path.resolve(__dirname, '../vite.config.ts')
  })
  await server.listen()
  return server
}

/**
 * 
 * @param {vite.ViteDevServer} server
 */
async function watchMain(server) {
  const watcher = rollup.watch(options)
  const protocol = server.config.server.https ? 'https://' : 'http://'
  const hostname = 'localhost'
  const port = server.httpServer.address().port
  const base = server.config.base
  const VITE_DEV_SERVER_URL = protocol + hostname + ':' + port + base
  const env = Object.assign(process.env, {
    VITE_DEV_SERVER_URL
  })
  let electronProcess = null
  watcher.on('event', event => {
    if (event.code !== 'END') {
      return
    }
    if (electronProcess) {
      electronProcess.removeAllListeners('close')
      electronProcess.kill()
    }
    electronProcess = spawn(electron, ['.'], { env })
    electronProcess.on('close', () => {
      server.close()
      watcher.close()
    })
  })
}

async function watch() {
  const server = await createServer()
  watchMain(server)
}

watch()
