import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null)

export const CartContextProvider = ({children}) => {

    const [items, setItems] = useState([])

    const addItem = (item) => {
        setItems(prevState => [...prevState, item]);
    }

    const removeItem = (removable) => {
        setItems(prevState => prevState.filter(item => item !== removable));
    }

    const getCartSize = ( ) =>{
        return items.length
    }

    return (
        <CartContext.Provider
        value={{ items, addItem, removeItem, getCartSize }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
