"use client"

import { useEffect, useState } from "react"

export default function NewTrxModal({ trxModalClass, setTrxModalClass, categories }) {

    const handleCloseBtn = () => {
        setTrxModalClass("")
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
    }


    return (<>
        <dialog className={`modal ${trxModalClass}`}>
            <div className="modal-box">
                <h3 className="text-2xl text-primary font-bold">New Transaction</h3>
                <div className="divider" />
                <form className="flex flex-col" onSubmit={handleFormSubmit}>

                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend text-secondary">Transaction category</legend>
                        <div className="categoryContainer">
                            <ul className="list rounded-box rounded-lg overflow-auto w-full h-40">
                                {
                                    categories.map(c => {
                                        return (<h1>{c.name}</h1>)
                                    })
                                }
                            </ul>
                        </div>
                    </fieldset>

                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend text-secondary">Transaction amount</legend>
                        <input type="number" name="amount" id="amount" className="input w-full text-lg" />
                    </fieldset>
                </form>
                <div className="modal-action flex justify-between">
                    <button className="btn btn-primary">Create</button>
                    <button className="btn btn-soft btn-primary" onClick={handleCloseBtn}>Close</button>
                </div>
            </div>
        </dialog>
    </>)
}