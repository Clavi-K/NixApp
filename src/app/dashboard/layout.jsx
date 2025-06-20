"use client"

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

import { pingUser, logoutUser } from '../actions';
import { useAuth } from '@/context/AuthContext';

import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {

    const { user, setUser } = useAuth()
    const userToken = localStorage.getItem("nixAccessToken")

    const [modalClass, setModalClass] = useState("")

    useEffect(() => {
        if (!user || !userToken) {
            redirect("/user/login")
        } else {
            pingUser(userToken)
                .then((r) => {
                    if (r.error && r.error.includes("Forbidden")) {
                        setUser(null)
                        logoutUser(userToken)
                        localStorage.removeItem("nixAccessToken")
                        redirect("/user/login")
                    }
                })
        }
    }, [])

    return (
        <div className='fixed bottom-0 right-0' style={{ height: "calc(100vh - 5rem)" }}>
            <Sidebar modalClass={modalClass} setModalClass={setModalClass} />
            <div className='flex justify-center items-center sitcky right-0' style={{ width: "calc(100vw - 16rem)", height:"100%" }}>
                {children}
            </div>
        </div>
    );
}
