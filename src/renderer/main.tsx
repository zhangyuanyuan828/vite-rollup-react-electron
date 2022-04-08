import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root') || document.body.appendChild(document.createElement('div'))).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
