"use client"

import { LogOut } from "lucide-react"

import { logoutUser } from "@/app/actions"
import { redirect } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"

import Modal from "./Modal"

export default function Navbar() {

    const { user, setUser } = useAuth()
    const [modalClass, setModalClass] = useState("")

    const handleLogoutBtn = async () => {
        setModalClass("modal-open")
    }

    const handleLogoutCallback = async () => {
        const userToken = localStorage.getItem("nixAccessToken")

        if (userToken) {
            await logoutUser(userToken)
            localStorage.removeItem("nixAccessToken")
            setUser(null)
        }

        setModalClass("")
        redirect("/user/login")
    }

    const handleHomeRedirect = () => {
        if (user) redirect("/dashboard")
    }

    return (<div className="fixed top-0 navbar bg-navbar shadow-lg h-20" style={{zIndex:"1"}}>
        <div className="navbar-start">
            <h3 className="text-2xl text-primary font-bold cursor-pointer transition-all transition-discrete hover:text-3xl" onClick={handleHomeRedirect}>Nix_</h3>
        </div>
        <div className="navbar-center"></div>

        <div className="navbar-end" hidden={!user}>
            <p className="mr-5 transition-all transition-discrete hover:text-primary">{user?.name}</p>
            <LogOut className="transition-all transition-discrete hover:text-error mr-3" onClick={handleLogoutBtn} />
        </div>

        <Modal title="Confirmation" text="Do you want to log out?" actionBtnText="Log out" actionBtnCallback={handleLogoutCallback} modalClass={modalClass} setModalClass={setModalClass} />

    </div>)
}