import React from 'react'
import ReactDOM from 'react-dom/client'
import './routes/App'
import HandleRoutes from './routes/App'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HandleRoutes/>
  </React.StrictMode>,
)
