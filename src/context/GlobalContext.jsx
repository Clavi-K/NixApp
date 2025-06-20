"use client"

import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const didMountRef = useRef(false)

    const [user, setUser] = useState(null)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const userToken = localStorage.getItem("nixAccessToken")
        if (userToken) {
            const decodedUserToken = jwtDecode(userToken)
            setUser(decodedUserToken._doc ? decodedUserToken._doc : decodedUserToken)
        }

        setLoading(false)

    }, []);

    useEffect(() => {
        if (didMountRef.current) {
            setTimeout(() => {
                setError("")
                setSuccess("")
            }, 3000)
        } else {
            didMountRef.current = true
        }
    }, [error, success])

    return (
        <GlobalContext.Provider value={{ user, setUser, setError, setSuccess }}>
            {
                loading ?
                    <div hidden={!loading} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                        <span className="loading loading-spinner text-primary w-16 h-16"></span>
                    </div>
                    :
                    <>{children}</>
            }
            <div className={`alert alert-error mt-0 w-full fixed bottom-0 right-32 left-32 rounded-b-none duration-500 ease-out transition-all ${error != "" ? "opacity-100" : "opacity-0"}`} style={{ width: "calc(100vw - 16rem)" }} >{error}</div>
            <div className={`alert alert-success mt-0 w-full fixed bottom-0 right-32 left-32 rounded-b-none duration-500 ease-out transition-all ${success != "" ? "opacity-100" : "opacity-0"}`} style={{ width: "calc(100vw - 16rem)" }} >{success}</div>
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => useContext(GlobalContext);