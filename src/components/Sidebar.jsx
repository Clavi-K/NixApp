"use client"

import { Wallet, CirclePlus } from "lucide-react"
import { redirect } from "next/navigation"

const handleWalletCreationBtn = () => {
    redirect("/wallet/create")
}

export default function Sidebar() {
    return (<div className="w-64 p-4 bg-navbar shadow-lg sticky top-0" style={{ height: "calc(100vh - 5rem)" }}>
        <h1 className="text-xl text-primary font-bold">Wallets</h1>
        <div className="divider"></div>
        <ul className="list rounded-box">

            <li className="list-row flex items-center transition-all transition-discrete hover:bg-primary hover:text-neutral hover:font-bold hover:cursor-pointer">
                <Wallet className="" />
                <h5>Wallets</h5>
            </li>

        </ul>
        <button className="btn btn-primary fixed bottom-5 px-2 rounded-2xl " onClick={handleWalletCreationBtn}>
            <div className="tooltip tooltip-right" data-tip="Create Wallet">
                <CirclePlus />
            </div>
        </button>
    </div>)
}