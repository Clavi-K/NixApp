"use client"

import { getUserWallets } from "@/app/actions"
import { useGlobal } from "@/context/GlobalContext"
import { Wallet, CirclePlus } from "lucide-react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"


export default function Sidebar({ setModalClass }) {

    const { user } = useGlobal()
    const userToken = localStorage.getItem("nixAccessToken")

    const [wallets, setWallets] = useState([])

    useEffect(() => {
        if (!user || !userToken) redirect("user/login")
        getUserWallets(userToken)
            .then(r => { if (r.length) setWallets(r) })
    }, [])

    const handleWalletCreationBtn = () => {
        redirect("/dashboard/wallet/create")
    }

    return (<div className="w-64 pt-24 p-4 bg-navbar shadow-lg fixed top-0 left-0 flex flex-col" style={{ height: "100vh" }}>
        <h1 className="text-xl text-primary font-bold">Wallets</h1>
        <div className="divider"></div>
        {wallets.length ?
            <ul className="list rounded-box">
                {wallets.map(w =>
                (<li key={w._id} className="list-row flex items-center transition-all transition-discrete hover:bg-primary hover:text-neutral hover:font-bold hover:cursor-pointer">
                    <Wallet className="" />
                    <h5>{w.name}</h5>
                </li>)
                )}
            </ul>

            : 

                <span className="label text-sm self-center mt-45">No wallets created yet :c</span>

            }
        <button className="btn btn-primary fixed bottom-5 px-2 rounded-2xl " onClick={handleWalletCreationBtn}>
            <div className="tooltip tooltip-right" data-tip="Create Wallet">
                <CirclePlus />
            </div>
        </button>
    </div>)
}