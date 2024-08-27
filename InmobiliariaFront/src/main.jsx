import React from 'react'
import ReactDOM from 'react-dom/client'
import './routes/index'
import HandleRoutes from './routes'
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoicGVkcm92ZXJnYXJhIiwiYSI6ImNsend1cGtqZjBuYTYya29sejl0NTNldGkifQ.E0Oh0vPRQkDRU3DD67dfKw';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HandleRoutes/>
  </React.StrictMode>,
)
