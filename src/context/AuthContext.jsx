"use client"

// context/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const userToken = localStorage.getItem("nixAccessToken")
        if (userToken) {
            const decodedUserToken = jwtDecode(userToken)
            setUser(decodedUserToken._doc ? decodedUserToken._doc : decodedUserToken)
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);