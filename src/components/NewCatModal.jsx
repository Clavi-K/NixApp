"use client"

import { useEffect, useState } from "react"

export default function NewCatModel({ catModalClass, setCatModalClass, user, walletId }) {

    const [newCategory, setNewCategory] = useState({
        userId: user._id,
        walletId,
        name: "",
        type: "",
        icon: ""
    })

    const handleCloseBtn = () => {
        setCatModalClass("")
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    const handleTrxTypeSelect = (e) => {
        let catType = e.currentTarget.id
        setNewCategory(prev => ({ ...prev, type: catType }))
    }

    return (<dialog className={`modal ${catModalClass}`}>
        <div className="modal-box">

            <h3 className="text-2xl text-primary font-bold">New Category</h3>

            <form className="flex flex-col" onSubmit={handleFormSubmit}>
                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend text-secondary">Category name</legend>
                    <input type="text" name="name" id="name" className="input w-full" />
                </fieldset>

                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend text-secondary">Category type</legend>
                    <div className="flex p-2 w-full justify-center">
                        <h5 id="addition" className={`w-28 p-2 border border-secondary text-center rounded-lg rounded-r-none border-success cursor-pointer transition-all transition-discrete hover:bg-success hover:text-secondary-content ${newCategory.type == "addition" ? "bg-success text-secondary-content" : ""}`} onClick={handleTrxTypeSelect}>Addition</h5>
                        <h5 id="substraction" className={`w-28 p-2 border border-secondary text-center rounded-lg rounded-l-none cursor-pointer transition-all transition-discrete hover:bg-error hover:text-secondary-content ${newCategory.type == "substraction" ? "bg-error text-secondary-content" : ""}`} style={{ borderColor: "var(--color-error)" }} onClick={handleTrxTypeSelect}>Substraction</h5>
                    </div>
                </fieldset>

                <fieldset className="fieldset w-full flex">
                    <legend className="fieldset-legend text-secondary">Icon</legend>
                    <input type="text" name="icon" id="icon" className="input w-full rounded-r-none" />
                    <button className="btn btn-primary rounded-l-none">test</button>
                </fieldset>
            </form>

            <div className="modal-action flex justify-between">
                <button className="btn btn-primary">Create</button>
                <button className="btn btn-soft btn-primary" onClick={handleCloseBtn}>Close</button>
            </div>
        </div>
    </dialog>)
}