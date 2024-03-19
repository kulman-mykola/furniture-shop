import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Products } from './pages/products.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: '/products',
        element: <Products/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
