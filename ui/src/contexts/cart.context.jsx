import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null)

export const CartContextProvider = ({children}) => {

    const [cartItems, setCartItems] = useState([]);

    const addItem = (product) => {
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity++;
            setCartItems(updatedCartItems);
        } else {
            const newItem = { ...product, quantity: 1 };
            setCartItems([...cartItems, newItem]);
        }
    }

    const removeItem = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
    }

    const updateQuantity = (itemId, newQuantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const getCartSize = ( ) =>{
        return cartItems.length
    }

    return (
        <CartContext.Provider
        value={{ cartItems, addItem, removeItem, getCartSize, updateQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
