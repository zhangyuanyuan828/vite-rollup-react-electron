import { watch } from 'rollup'
import { createServer } from 'vite'
import config from '../rollup.config'

function watchMain() {
  const watcher = watch(config)

  watcher.on('event', event => {
    console.log(event)
  })
}

const server = await createServer()

await server.listen()

watchMain()
