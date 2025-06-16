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

        /*  const userToken = localStorage.getItem("nixAccessToken")
 
         if (userToken) {
             await logoutUser(userToken)
             localStorage.removeItem("nixAccessToken")
             setUser(null)
         }
 
         redirect("/user/login") */
    }

    return (<div className="navbar bg-navbar shadow-lg ">
        <div className="navbar-start">
            <h3 className="text-2xl text-secondary font-bold">Nix_</h3>
        </div>
        <div className="navbar-center"></div>

        {/* <div className="navbar-end" hidden={!user}> */}
        <div className="navbar-end" hidden={false}>
            <p className="mr-5 transition-all transition-discrete hover:text-primary">{user?.name}</p>
            <LogOut className="transition-all transition-discrete hover:text-error mr-3" onClick={handleLogoutBtn} />
        </div>

        <Modal title="test" text="a" callback="" modalState={{ modalClass, setModalClass }} />

    </div>)
}