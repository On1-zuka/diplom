import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './router.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { UserProvider } from './context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <UserProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    </UserProvider>
  </AuthProvider>
)
