"use client"

import { useParams } from "next/navigation"
import { BanknoteArrowUp, ListPlus, Pencil, Check, Edit } from "lucide-react"
import React, { useEffect, useState } from "react"

import { useGlobal } from "@/context/GlobalContext"
import { getUserWallet, getWalletCategories, updateUserWallet } from "@/app/actions"
import NewTrxModal from "@/components/NewTrxModal"
import NewCatModel from "@/components/NewCatModal"

export default function Wallet() {
    const { walletId } = useParams()

    const userToken = localStorage.getItem("nixAccessToken")
    const { setSuccess, setError, user } = useGlobal({})

    const [loading, setLoading] = useState(true)
    const [wallet, setWallet] = useState(null)
    const [categories, setCategories] = useState([])
    const [trxModalClass, setTrxModalClass] = useState("")
    const [catModalClass, setCatModalClass] = useState("")
    const [edit, setEdit] = useState(false)

    const [editWallet, setEditWallet] = useState({
        name: "",
        balance: 0
    })

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
                setCategories(r)
            })
    }, [])


    const handleNewTrx = () => {
        setTrxModalClass("modal-open")
    }

    const handleNewCat = () => {
        setCatModalClass("modal-open")
    }

    const handleWalletEditBtn = async (e) => {
        setEdit(prev => !prev)
        if (!edit) {
            setEditWallet({ name: wallet.name, balance: wallet.balance })
        } else {
            if ((editWallet.name.trim()) &&
                (Number(editWallet.balance) && editWallet.balance > 0) &&
                editWallet.name.trim() != wallet.name || editWallet.balance != wallet.balance) {

                setLoading(true)
                const walletRes = await updateUserWallet(userToken, { ...wallet, name: editWallet.name, balance: editWallet.balance })
                setLoading(false)

                if (walletRes.error) {
                    setError(walletRes.error)
                } else if (walletRes.msg) {
                    setSuccess(walletRes.msg)
                    setWallet(prev => ({ ...prev, ...editWallet }))
                }

            }
        }
    }

    const handleWalletFieldChange = (e) => {
        e.preventDefault()
        let newValue = e.target.value
        setEditWallet(prev => ({ ...prev, [e.target.id]: newValue }))
    }

    return (<div className="flex justify-start w-full h-full">
        {
            wallet ? (
                <div className="m-3 flex justify-between items-center w-full h-fit rounded-2xl bg-content">
                    <div className="flex flex-col p-2">
                        <div className="nameContainer flex items-center">
                            <h1 className="text-3xl text-primary font-bold mb-2 mr-1" hidden={edit}>{wallet.name}</h1>
                            <input id="name" type="text" className="input input-primary" hidden={!edit} value={editWallet.name} onChange={handleWalletFieldChange} />
                        </div>
                        <div className="balanceContainer flex items-center">
                            <h1 className="text-xl text-content font-bold ml-5 mr-1" hidden={edit}>${wallet.balance}</h1>
                            <input id="balance" type="number" className="input input-content w-3xs" hidden={!edit} value={editWallet.balance} onChange={handleWalletFieldChange} />
                        </div>
                    </div>

                    <div className="flex">
                        <div className="tooltip tooltip-left" data-tip="Edit Wallet">
                            <label className="swap btn btn-outline btn-primary rounded-xl mr-5 p-2">
                                <input type="checkbox" onClick={handleWalletEditBtn} />

                                <Pencil className="swap-off" />
                                <Check className="swap-on" />
                            </label>
                        </div>

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
                    <NewCatModel catModalClass={catModalClass} setCatModalClass={setCatModalClass} setCategories={setCategories} user={user} userToken={userToken} walletId={walletId} />
                </div>
            ) : <></>
        }
        <div hidden={!loading} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <span className="loading loading-spinner text-primary w-16 h-16"></span>
        </div>
    </div >)
}