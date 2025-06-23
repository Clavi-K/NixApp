"use client"

import { useParams } from "next/navigation"
import { CirclePlus } from "lucide-react"
import React, { useEffect, useState } from "react"

import { useGlobal } from "@/context/GlobalContext"
import { getUserWallet } from "@/app/actions"
import NewTrxModal from "@/components/NewTrxModal"

export default function Wallet({ params }) {
    const { walletId } = useParams()

    const userToken = localStorage.getItem("nixAccessToken")
    const { setError } = useGlobal({})

    const [loading, setLoading] = useState(true)
    const [wallet, setWallet] = useState(null)
    const [modalClass, setModalClass] = useState("")

    const handleNewTrx = () => {
        setModalClass("modal-open")
    }

    useEffect(() => {

        getUserWallet(userToken, walletId)
            .then(r => {
                console.log(r)
                if (r.error) {
                    setError("Something went wrong looking for the wallet")
                    return
                }
                setWallet(r[0])
            })
            .finally(() => setLoading(false))
    }, [])

    return (<div className="flex justify-start w-full h-full">
        {
            wallet ? (
                <div className="m-3 flex justify-between items-center w-full h-fit rounded-2xl bg-content">
                    <div className="flex flex-col p-2">
                        <h1 className="text-3xl text-primary font-bold mb-2">{wallet.name}</h1>
                        <h1 className="text-xl text-content font-bold ml-5">${wallet.balance}</h1>
                    </div>
                    <button className="btn btn-outline btn-primary rounded-xl mr-5" onClick={handleNewTrx}>New Transaction</button>
                    <NewTrxModal modalClass={modalClass} setModalClass={setModalClass} />
                </div>
            ) : <></>
        }
        <div hidden={!loading} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <span className="loading loading-spinner text-primary w-16 h-16"></span>
        </div>
    </div >)
}