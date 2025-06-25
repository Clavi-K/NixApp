"use client"

import { useParams } from "next/navigation"
import { BanknoteArrowUp, ListPlus } from "lucide-react"
import React, { useEffect, useState } from "react"

import { useGlobal } from "@/context/GlobalContext"
import { getUserWallet, getWalletCategories } from "@/app/actions"
import NewTrxModal from "@/components/NewTrxModal"
import NewCatModel from "@/components/NewCatModal"

export default function Wallet({ params }) {
    const { walletId } = useParams()

    const userToken = localStorage.getItem("nixAccessToken")
    const { setError } = useGlobal({})

    const [loading, setLoading] = useState(true)
    const [wallet, setWallet] = useState(null)
    const [categories, setCategories] = useState([])
    const [trxModalClass, setTrxModalClass] = useState("")
    const [catModalClass, setCatModalClass] = useState("")

    useEffect(() => {

        getUserWallet(userToken, walletId)
            .then(r => {
                if (r.error) {
                    setError("Something went wrong looking for the wallet")
                    return
                }
                setWallet(r[0])
            })
            .finally(() => setLoading(false))

        getWalletCategories(userToken, walletId)
            .then(r => {
                if (r.error) {
                    setError("Something went wrong looking for the wallet categories")
                    return
                }
                console.log(r)
                setCategories(r)
            })
    }, [])


    const handleNewTrx = () => {
        setTrxModalClass("modal-open")
    }

    const handleNewCat = () => {
        setCatModalClass("modal-open")
    }

    return (<div className="flex justify-start w-full h-full">
        {
            wallet ? (
                <div className="m-3 flex justify-between items-center w-full h-fit rounded-2xl bg-content">
                    <div className="flex flex-col p-2">
                        <h1 className="text-3xl text-primary font-bold mb-2">{wallet.name}</h1>
                        <h1 className="text-xl text-content font-bold ml-5">${wallet.balance}</h1>
                    </div>

                    <div className="flex">
                        <div className="tooltip tooltip-left" data-tip="New Category">
                            <button className="btn btn-outline btn-primary rounded-xl mr-5 p-2" onClick={handleNewCat}>
                                <ListPlus />
                            </button>
                        </div>

                        <div className="tooltip tooltip-left" data-tip="New Transaction">
                            <button className="btn btn-outline btn-primary rounded-xl mr-3 p-2" onClick={handleNewTrx}>
                                <BanknoteArrowUp />
                            </button>
                        </div>
                    </div>
                    <NewTrxModal trxModalClass={trxModalClass} setTrxModalClass={setTrxModalClass} />
                    <NewCatModel catModalClass={catModalClass} setCatModalClass={setCatModalClass} />
                </div>
            ) : <></>
        }
        <div hidden={!loading} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <span className="loading loading-spinner text-primary w-16 h-16"></span>
        </div>
    </div >)
}