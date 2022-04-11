import { contextBridge } from 'electron'

const api = {
  sayHello() {
    console.log('Hello, world!')
  }
}

export type Api = typeof api

contextBridge.exposeInMainWorld('api', api)
