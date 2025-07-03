"use client"

import * as Icons from "lucide-react"
import { use, useState } from "react"

export default function NewTrxModal({ trxModalClass, setTrxModalClass, categories, user, userToken, walletId }) {

    const catIconNames = categories.map(c => c.icon)
    const catIcons = {}

    for (const icon in Icons) {
        if (catIconNames.includes(icon)) catIcons[icon] = Icons[icon]
    }

    const [categoryFilter, setCategoryFilter] = useState("")
    const [categoryList, setCategoryList] = useState(categories)
    const [errors, setErrors] = useState({
        note: "",
        amount: 0,
        dateTime: "",
        categoryId: "",
        walletId: walletId,
        userId: user._id
    })
    const [newTransaction, setNewTransasction] = useState({
        name: "",
        amount: 0,
        categoryId: "",
        walletId: walletId
    })

    const handleCloseBtn = () => {
        setTrxModalClass("")
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    const handleCatSearchChange = (e) => {
        setErrors(prev => ({ ...prev, category: "" }))

        let filterValue = e.target.value
        setCategoryFilter(filterValue)
        setCategoryList(categories.filter(c => c.name.toLowerCase().includes(filterValue.toLowerCase())))
    }

    const handleCatClick = (e) => {
        let catText = e.currentTarget.innerText
        let catId = e.currentTarget.id

        setErrors(prev => ({ ...prev, category: "" }))
        setCategoryFilter(catText)
        setNewTransasction(prev => ({ ...prev, categoryId: catId }))
    }

    return (<>
        <dialog className={`modal ${trxModalClass}`}>
            <div className="modal-box">
                <h3 className="text-2xl text-primary font-bold">New Transaction</h3>
                <div className="divider" />
                <form className="flex flex-col" onSubmit={handleFormSubmit}>

                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend text-secondary">Transaction category</legend>
                        <input type="text" name="trxCat" id="trxCat" className="input w-full" placeholder="Search the category here" onChange={handleCatSearchChange} value={categoryFilter} />
                        <div className="categoryContainer">
                            <ul className="list rounded-box rounded-lg overflow-auto w-full h-40">
                                {
                                    categoryList.map(c => {
                                        let Icon = c.icon ? Icons[c.icon] : Icons["BookTemplate"]
                                        return (<li id={c._id} key={c._id} className="list-row flex items-center cursor-pointer hover:bg-primary hover:text-secondary-content" onClick={handleCatClick}>
                                            <div className="p-1 rounded-xl mr-2 border-2 border-secondary"  ><Icon /></div>
                                            <h1>{c.name}</h1>
                                        </li>)
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