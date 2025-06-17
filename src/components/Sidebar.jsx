import { Wallet, CirclePlus} from "lucide-react"

export default function Sidebar() {
    return (<div className="w-64 p-4 bg-navbar shadow-lg sticky top-0" style={{ height: "calc(100vh - 5rem)" }}>
        <ul className="list rounded-box">

            <li className="list-row flex items-center transition-all transition-discrete hover:bg-primary hover:text-neutral hover:font-bold hover:cursor-pointer">
                <Wallet className="" />
                <h5>Wallets</h5>
            </li>

        </ul>
    </div>)
}