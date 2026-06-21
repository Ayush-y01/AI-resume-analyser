import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProvider } from './context/AppContext.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google"

export const server = "http://localhost:5000"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
        <GoogleOAuthProvider clientId='637107361928-51590te5gig5od9udbjdf0ncpvtmqa63.apps.googleusercontent.com'>
          <App /> 
        </GoogleOAuthProvider>
    </AppProvider>
  </StrictMode>,
)
