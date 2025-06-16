"use client"

// context/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const userToken = localStorage.getItem("nixAccessToken")
        if (userToken) {
            const decodedUserToken = jwtDecode(userToken)
            setUser(decodedUserToken._doc ? decodedUserToken._doc : decodedUserToken)
        }

        setLoading(false)

    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {
                loading ?
                    <div hidden={!loading} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                        <span className="loading loading-spinner text-primary w-16 h-16"></span>
                    </div>
                    :
                    <>{children}</>
            }
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);