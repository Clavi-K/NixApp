"use client"

export default function Modal({ title, text, actionBtnText, actionBtnCallback, modalClass, setModalClass }) {

    const handleCloseBtn = () => {
        setModalClass("")
    }

    return (<dialog id="modal" className={`modal ${modalClass}`}>
        <div className="modal-box">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="py-4">{text}</p>
            <div className="modal-action">
                <button className="btn btn-primary fixed left-6" onClick={actionBtnCallback}>{actionBtnText}</button>
                <form method="dialog">
                    <button className="btn btn-soft btn-primary" onClick={handleCloseBtn}>Close</button>
                </form>
            </div>
        </div>
    </dialog>)
}