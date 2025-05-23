import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />
  }
], {
  future: {
    v7_relativeSplatPath: true,
    v7_startTransition: true
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)