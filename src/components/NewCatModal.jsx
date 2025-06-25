"use client"

export default function NewCatModel({ catModalClass, setCatModalClass, user, walletId }) {


    
    const handleCloseBtn = () => {
        setCatModalClass("")
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
    }

    return (<dialog className={`modal ${catModalClass}`}>
        <div className="modal-box">

            <h3 className="text-2xl text-primary font-bold">New Category</h3>

            <form className="flex flex-col" onSubmit={handleFormSubmit}>
                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend text-secondary">Name</legend>
                    <input type="text" name="name" id="name" className="input" />
                </fieldset>

                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend text-secondary">Type</legend>
                </fieldset>

                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend text-secondary">Icon</legend>
                </fieldset>
            </form>

            <div className="modal-action flex justify-between">
                <button className="btn btn-primary">Create</button>
                <button className="btn btn-soft btn-primary" onClick={handleCloseBtn}>Close</button>
            </div>
        </div>
    </dialog>)
}