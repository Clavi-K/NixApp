"use client"

import { useState } from "react"

export default function NewTrxModal({ modalClass, setModalClass }) {

    const [trxType, setTrxType] = useState("")
    const [categories, setCategories] = useState([])

    const handleCloseBtn = () => {
        setModalClass("")
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    const handleTrxTypeSelect = (e) => {
        setTrxType(e.currentTarget.id)
    }

    return (<>
        <dialog className={`modal ${modalClass}`}>
            <div className="modal-box">
                <h3 className="text-2xl text-primary font-bold">New Transaction</h3>
                <div className="divider" />
                <form className="flex flex-col" onSubmit={handleFormSubmit}>
                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend text-secondary">Transaction type</legend>
                        <div className="flex p-2 w-full justify-center">
                            <h5 id="addition" className={`w-28 p-2 border border-secondary text-center rounded-lg rounded-r-none border-success cursor-pointer transition-all transition-discrete hover:bg-success hover:text-secondary-content ${trxType == "addition" ? "bg-success text-secondary-content" : ""}`} onClick={handleTrxTypeSelect}>Addition</h5>
                            <h5 id="substraction" className={`w-28 p-2 border border-secondary text-center rounded-lg rounded-l-none cursor-pointer transition-all transition-discrete hover:bg-error hover:text-secondary-content ${trxType == "substraction" ? "bg-error text-secondary-content" : ""}`} style={{ borderColor: "var(--color-error)" }} onClick={handleTrxTypeSelect}>Substraction</h5>
                        </div>
                    </fieldset>

                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend text-secondary">Transaction category</legend>
                    </fieldset>

                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend text-secondary">Transaction amount</legend>
                        <input type="number" name="amount" id="amount" className="input w-full text-lg" />
                    </fieldset>
                </form>
                <div className="modal-action">
                    <form method="dialog"><button className="btn btn-soft btn-primary" onClick={handleCloseBtn}>Close</button></form>
                </div>
            </div>
        </dialog>
    </>)
}