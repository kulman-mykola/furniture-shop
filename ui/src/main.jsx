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
import Auth from './pages/auth.jsx';
import { AuthContextProvider } from './contexts/auth.context.jsx';
import { UserPanel } from './pages/user-panel.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element:
            <ChakraProvider>
                <AuthContextProvider>
                    <CartContextProvider>
                        <Header/>
                        <App/>
                    </CartContextProvider>
                </AuthContextProvider>
            </ChakraProvider>,
        children: [
            {
                path: '/',
                element:<Home/>
            },
            {
                path: 'auth',
                element:<Auth/>
            },
            {
                path: 'products',
                element: <Products/>
            },
            {
                path: 'checkout',
                element: <Checkout/>
            },
            {
                path: 'user',
                element: <Outlet/>,
                children: [
                    {
                        path: 'panel',
                        element: <UserPanel/>
                    }
                ]
            }
        ]
    },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
