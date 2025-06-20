"use client"

import { createWallet } from "@/app/actions"
import { useGlobal } from "@/context/GlobalContext"
import { useState } from "react"
import { redirect } from "next/navigation"

export default function CreateWallet() {
    const { setError, setSuccess } = useGlobal()

    const userToken = localStorage.getItem("nixAccessToken")

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [radio, setRadio] = useState("ARS")

    const handleNameChange = (e) => {
        const { id, value } = e.target
        setName(value)
        setErrors(prev => ({ ...prev, [id]: "" }))
    }

    const handleRadioChange = (e) => {
        const { id } = e.target
        setRadio(id)
    }

    const formValidation = () => {
        const newErrors = {}
        if (!name || !name.trim()) newErrors.name = "Please insert a valid wallet name"
        if (!radio) newErrors.currency = "Please select a currency"

        return newErrors
    }

    const handlewalletSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = formValidation()

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setLoading(true)
        const walletRes = await createWallet(userToken, { name, currency: radio })

        if (walletRes._id) {
            setName("")
            setRadio("ARS")
            setSuccess("Wallet created successfully!")
            redirect(`/dashboard/wallet/${walletRes._id}`)
        } else {
            setError("Something went wrong")
        }

        setLoading(false)
    }

    return (<div className="flex flex-col items-center justify-center bg-base-100" style={{ width: "calc(100% - 2rem)", height: "calc(100% - 2rem)" }}>
        <form className="bg-secondary-content p-8 rounded-lg shadow-lg flex flex-col w-5xl" onSubmit={handlewalletSubmit}>
            <h3 className="text-2xl text-secondary font-bold">Create a wallet</h3>
            <div className="divider"></div>
            <fieldset className="fieldset w-full mb-5">
                <legend className="fieldset-legend text-secondary text-lg">Name</legend>
                <input id="name" className="input w-full text-lg" type="text" value={name} onChange={handleNameChange} />
                <span className="label text-error" hidden={!errors.name} >{errors.name}</span>
            </fieldset>

            <fieldset className="fieldset w-full mb-5">
                <legend className="fieldset-legend text-secondary text-lg mb-3">Currency</legend>

                <div className="flex justify-around">
                    <div className="flex justify-center">
                        <input type="radio" className="radio radio-primary" name="currency" id="ARS" onChange={handleRadioChange} defaultChecked />
                        <span className="label text-secondary text-lg ml-3">ARS</span>
                    </div>
                    <div className="flex justify-center">
                        <input type="radio" className="radio radio-primary" name="currency" id="USD" onChange={handleRadioChange} />
                        <span className="label text-secondary text-lg ml-3">USD</span>
                    </div>
                </div>
                <span className="label text-error" hidden={!errors.currency} >{errors.currency}</span>
            </fieldset>

            <button className="btn btn-primary mt-4 w-45 h-14 text-lg margin-auto" type="submit">Create</button>
        </form>
        <div className={`alert alert-error mt-0 w-full max-w-xl fixed bottom-0 rounded-b-none duration-500 ease-out transition-all ${alert.visible ? "opacity-100" : "opacity-0"}`} >{alert.msg}</div>
        <div hidden={!loading} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <span className="loading loading-spinner text-primary w-16 h-16"></span>
        </div>
    </div>)

}