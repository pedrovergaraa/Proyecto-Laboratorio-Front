import React from 'react'
import ReactDOM from 'react-dom/client'
import './routes/index'
import HandleRoutes from './routes'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HandleRoutes/>
  </React.StrictMode>,
)
