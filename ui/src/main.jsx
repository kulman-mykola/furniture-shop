import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Products } from './pages/products.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { CartContextProvider } from './contexts/cart.context.jsx';
import { Header } from './common/components/header.jsx';

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
                path: '/products',
                element: <Products/>
            }
        ]
    },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
