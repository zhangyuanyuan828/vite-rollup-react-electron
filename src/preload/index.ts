import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('api', {
  sayHello() {
    console.log('Hello, world!')
  }
})
