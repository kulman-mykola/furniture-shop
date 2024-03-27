import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token'))

    return (
        <AuthContext.Provider
            value={{
                token,
                setToken}}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
