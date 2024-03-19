import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Products from './pages/products.tsx';
import Checkout from './pages/checkout.tsx';
import './App.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Products/>,
    },
    {
        path: '/checkout/:id',
        element:
            <Checkout/>
    }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
