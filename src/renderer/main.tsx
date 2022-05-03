import React from 'react'
import { createRoot } from 'react-dom/client'
import 'rsuite/dist/rsuite.css'
import { App } from './App'

createRoot(document.getElementById('root') || document.body.appendChild(document.createElement('div'))).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
