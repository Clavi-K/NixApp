"use client"

import { useEffect, useState } from "react"
import * as Icons from "lucide-react"

import { useGlobal } from "@/context/GlobalContext"
import { createWalletCategory } from "@/app/actions"

export default function NewCatModel({ catModalClass, setCatModalClass, setCategories, user, userToken, walletId }) {

    const iconNames = []

    for (const icon in Icons) {
        let Icon = Icons[icon]
        if (Icon.displayName && !icon.includes("Icon") && !icon.includes("Lucide")) iconNames.push(icon)
    }

    const { setSuccess, setError } = useGlobal()

    const [iconList, setIconList] = useState(iconNames.slice(0, 5))
    const [categoryFilter, setCategoryFilter] = useState("")
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({
        name: "",
        type: "",
        icon: ""
    })
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

    const handleTrxTypeSelect = (e) => {
        setErrors(prev => ({ ...prev, type: "" }))
        setNewCategory(prev => ({ ...prev, type: e.target.id }))
    }

    const handleSearchFieldChange = (e) => {
        setErrors(prev => ({ ...prev, icon: "" }))
        setNewCategory(prev => ({ ...prev, icon: e.target.value }))

        let filterValue = e.target.value
        setCategoryFilter(filterValue)
        setIconList(iconNames.filter(i => i.toLowerCase().includes(filterValue.toLowerCase())).slice(0, 5))
    }

    const handleIconItemClick = (e) => {
        let pressedItem = e.currentTarget
        setErrors(prev => ({ ...prev, icon: "" }))
        setNewCategory(prev => ({ ...prev, icon: pressedItem.id }))

        setCategoryFilter(e.currentTarget.id)
        setIconList(iconNames.filter(i => i === pressedItem.id))
    }

    const handleCatNameChange = (e) => {
        setErrors(prev => ({ ...prev, name: "" }))
        setNewCategory(prev => ({ ...prev, name: e.target.value }))
    }

    const handleLoadMore = (e) => {
        e.preventDefault()
        setIconList(iconNames.filter(i => i.toLowerCase().includes(categoryFilter.toLowerCase())).slice(0, iconList.length + 5))
    }

    const handleFormSubmit = async (e) => {
        const validationErrors = formValidation()
        if (Object.keys(validationErrors).length != 0) {
            setErrors(validationErrors)
            return
        }

        setLoading(true)
        const categoryRes = await createWalletCategory(userToken, newCategory)

        if (!categoryRes.error) {
            setSuccess("Category successfully created!")
            setCategories(prev => ({ ...prev, categoryRes }))
            
            setNewCategory({
                userId: user._id,
                walletId,
                name: "",
                type: "",
                icon: ""
            })

            setCatModalClass("")
        } else {
            setError(`Something went wrong: ${categoryRes.error}`)
        }



        setLoading(false)
    }

    const formValidation = () => {
        const newErrors = {}

        if (!newCategory.name || !newCategory.name.trim()) newErrors.name = "Please type a category name"
        if (newCategory.type != "addition" && newCategory.type != "substraction") newErrors.type = "Please select a category type"
        if (!newCategory.icon || !iconNames.find(i => i == newCategory.icon)) newErrors.icon = "Please select a valid icon (Case sensitive field)"

        return newErrors
    }

    return (<dialog className={`modal ${catModalClass}`}>
        <div className="modal-box mt-13">

            <h3 className="text-2xl text-primary font-bold">New Category</h3>

            <form className="flex flex-col">
                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend text-secondary">Category name</legend>
                    <input type="text" name="name" id="name" className="input w-full" onChange={handleCatNameChange} value={newCategory.value} />
                    <span className="label text-error" hidden={!errors.name}>{errors.name}</span>
                </fieldset>

                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend text-secondary">Category type</legend>
                    <div className="flex p-2 w-full justify-center">
                        <h5 id="addition" className={`w-28 p-2 border border-secondary text-center rounded-lg rounded-r-none border-success cursor-pointer transition-all transition-discrete hover:bg-success hover:text-secondary-content ${newCategory.type == "addition" ? "bg-success text-secondary-content" : ""}`} onClick={handleTrxTypeSelect}>Addition</h5>
                        <h5 id="substraction" className={`w-28 p-2 border border-secondary text-center rounded-lg rounded-l-none cursor-pointer transition-all transition-discrete hover:bg-error hover:text-secondary-content ${newCategory.type == "substraction" ? "bg-error text-secondary-content" : ""}`} style={{ borderColor: "var(--color-error)" }} onClick={handleTrxTypeSelect}>Substraction</h5>
                    </div>
                    <span className="label text-error" hidden={!errors.type}>{errors.type}</span>
                </fieldset>

                <fieldset className="fieldset w-full flex flex-col">
                    <legend className="fieldset-legend text-secondary">Icon</legend>
<<<<<<< Updated upstream
                    <input type="text" name="icon" id="icon" className="input w-full rounded-r-none" placeholder="Choose icon from below" />
=======
                    <input type="text" name="icon" id="icon" className="input w-full" placeholder="Search the icon here" onChange={handleSearchFieldChange} value={categoryFilter} />
                    <span className="label text-error" hidden={!errors.icon}>{errors.icon}</span>

                    <div className="iconContainer">
                        <ul className="list rounded-box rounded-lg overflow-auto w-full h-40">
                            {
                                iconList.map(i => {
                                    const Icon = Icons[i]
                                    return (<li id={i} key={i} className="list-row flex items-center cursor-pointer hover:bg-primary hover:text-secondary-content" onClick={handleIconItemClick}>
                                        <div className="p-1 rounded-xl mr-2 border-2 border-secondary"><Icon /></div>
                                        <h5 className="text">{i}</h5>
                                    </li>)
                                })
                            }
                            <li className="list-row flex items-center cursor-pointer hover:bg-primary hover:text-secondary-content"><button className="btn btn-primary btn-soft w-full" onClick={handleLoadMore}>Load more</button></li>
                        </ul>


                    </div>
>>>>>>> Stashed changes
                </fieldset>
            </form>


            <div className="modal-action flex justify-between m-0">
                <button className="btn btn-primary" onClick={handleFormSubmit}>Create</button>
                <button className="btn btn-soft btn-primary" onClick={handleCloseBtn}>Close</button>
            </div>

            <div hidden={!loading} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                <span className="loading loading-spinner text-primary w-16 h-16"></span>
            </div>
        </div>
    </dialog>)
}