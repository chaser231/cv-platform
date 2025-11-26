import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../App.jsx'
import './index.css'
import './i18n' // Инициализация i18next для мультиязычности

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

