"use client"

import { getUserWallets } from "@/app/actions"
import { useGlobal } from "@/context/GlobalContext"
import { Wallet, CirclePlus } from "lucide-react"
import { redirect } from "next/navigation"
import { act, useEffect, useState } from "react"


export default function Sidebar() {

    const userToken = localStorage.getItem("nixAccessToken")
    const { user, wallets, setWallets } = useGlobal()

    const [loading, setLoading] = useState(true)
    const [activeItem, setActiveItem] = useState("")

    useEffect(() => {
        if (!user || !userToken) redirect("user/login")
        getUserWallets(userToken)
            .then(r => { if (r.length) setWallets(r) })
            .finally(() => setLoading(false))
    }, [])

    const handleWalletCreationBtn = () => {
        redirect("/dashboard/wallet/create")
    }

    const handleWalletClick = (e) => {
        e.preventDefault()
        console.log("break")
        let itemId = e.currentTarget.id
        if (activeItem !== itemId) {
            if (activeItem !== "") {
                let prevActiveItem = document.getElementById(activeItem)
                prevActiveItem.classList.remove("border-3")
                prevActiveItem.classList.remove("border-primary")
            }

            e.currentTarget.classList.toggle("border-3")
            e.currentTarget.classList.toggle("border-primary")
            setActiveItem(itemId)
            redirect(`/dashboard/wallet/${itemId}`)
        }
    }

    return (<div className="w-64 pt-24 p-4 bg-navbar shadow-lg fixed top-0 left-0 flex flex-col" style={{ height: "100vh" }}>
        <h1 className="text-xl text-primary font-bold">Wallets</h1>
        <div className="divider" />
        {wallets.length ?
            <ul className="list rounded-box">
                {wallets.map(w =>
                (<li key={w._id} id={w._id} className="list-row flex flex-col items-center justify-between hover:bg-primary hover:text-neutral hover:font-bold hover:cursor-pointer" onClick={handleWalletClick}>
                    <div className="flex items-center w-full">
                        <Wallet className="mr-4" />
                        <h5 className="font-bold text-lg truncate">{w.name}</h5>
                    </div>
                    <h5 className="text-xs text-secondary whitespace-nowrap w-full">${w.balance}</h5>
                </li>)
                )}
            </ul>

            :

            <span hidden={loading} className="label text-sm self-center mt-45">No wallets created yet :c</span>

        }
        <div hidden={!loading} className="fixed top-70 left-25 z-50 flex items-center justify-center">
            <span className="loading loading-spinner text-primary w-16 h-16"></span>
        </div>
        <button className="btn btn-primary fixed bottom-5 px-2 rounded-2xl " onClick={handleWalletCreationBtn}>
            <div className="tooltip tooltip-right" data-tip="Create Wallet">
                <CirclePlus />
            </div>
        </button>
    </div>)
}