import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Products } from './pages/products.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { CartContextProvider } from './contexts/cart.context.jsx';
import { Header } from './common/components/header.jsx';
import { Home } from './pages/home.jsx';
import { Checkout } from './pages/checkout.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element:
            <ChakraProvider>
                <CartContextProvider>
                    <Header/>
                    <App/>
                </CartContextProvider>
            </ChakraProvider>,
        children: [
            {
                path: '/',
                element:<Home/>
            },
            {
                path: '/products',
                element: <Products/>
            },
            {
                path: '/checkout',
                element: <Checkout/>
            }
        ]
    },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
