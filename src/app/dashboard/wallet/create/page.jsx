"use client"

import { useState } from "react"

export default function CreateWallet() {

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [wallet, setWallet] = useState({})
    const [radio, setRadio] = useState("")

    const handleChange = (e) => {
        const { id, value } = e.target
        setWallet(prev => ({ ...prev, [id]: value }))
        setErrors(prev => ({ ...prev, [id]: id !== "password" ? "" : [] }))
    }

    const handleRadioChange = (e) => {
        const { id } = e.target
        setRadio(id)
    }

    const handlewalletSubmit = () => {

    }

    return (<div className="flex flex-col items-center justify-center bg-base-100" style={{ width: "calc(100% - 2rem)", height: "calc(100% - 2rem)" }}>
        <form className="bg-secondary-content p-8 rounded-lg shadow-lg flex flex-col w-5xl" onSubmit={handlewalletSubmit}>
            <h3 className="text-2xl text-secondary font-bold">Create a wallet</h3>
            <div className="divider"></div>
            <fieldset className="fieldset w-full mb-5">
                <legend className="fieldset-legend text-secondary text-lg">Name</legend>
                <input id="name" className="input w-full text-lg" type="text" value={wallet.name} onChange={handleChange} />
                <span className="label text-error" hidden={!errors.name} >{errors.name}</span>
            </fieldset>

            <fieldset className="fieldset w-full mb-5">
                <legend className="fieldset-legend text-secondary text-lg mb-3">Currency</legend>

                <div className="flex justify-around">
                    <div className="flex justify-center">
                        <input type="radio" className="radio radio-primary" name="currency" id="ARS" onChange={handleRadioChange} />
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