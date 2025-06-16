import { LogOut } from "lucide-react"

export default function Navbar() {
    return (<div className="navbar bg-navbar shadow-lg nixNavbar">
        <div className="navbar-start">
            <h3 className="text-2xl text-secondary font-bold">Nix_</h3>
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-end" hidden={false}>
            <p className="mr-5 transition-all transition-discrete hover:text-primary">Luciano</p>
            <LogOut className="transition-all transition-discrete hover:text-error mr-3"/>
        </div>
    </div>)
}