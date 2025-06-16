
export default function Modal() {
    return (<dialog id="modalTest" className="modal">
        <div className="modal-box">
            <h3 className="text-lg font-bold">Confirmation</h3>
            <p className="py-4">Are you sure you want to log out?</p>
            <div className="modal-action">
                <form method="dialog">
                    <button className="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>)
}