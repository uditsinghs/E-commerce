import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/Auth.jsx'
import { SearchProvider } from './context/Search.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SearchProvider>
      <StrictMode>
        <App />
      </StrictMode>,
    </SearchProvider>
  </AuthProvider>

)
