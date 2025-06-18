"use client"

import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {

    const { user } = useAuth()

    useEffect(() => {
        if (!user) redirect("/user/login")
    }, [])

    return (
        <div className='flex'>
            <Sidebar />
            {children}
        </div>
    );
}
