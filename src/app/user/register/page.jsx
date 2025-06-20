"use client"

import { registerUser } from "@/app/actions"
import { useGlobal } from "@/context/GlobalContext"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

export default function Register() {

    const { user, setUser, setError, setSuccess } = useGlobal()

    useEffect(() => {
        if (user) redirect("/dashboard")
    }, [])

    const [alert, setAlert] = useState({
        visible: false,
        msg: ""
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        repeatPassword: ""
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setForm(prev => ({ ...prev, [id]: value }))
        setErrors(prev => ({ ...prev, [id]: id !== "password" ? "" : [] }))
    }

    const handleAlert = (alert) => {
        setAlert(alert)
        setTimeout(() => setAlert(prev => ({ ...prev, visible: false })), 3000)
        setTimeout(() => setAlert({ msg: "", visible: false }), 3500)
    }

    const formValidation = () => {
        const newErrors = {}
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!form.name || !form.name.trim()) newErrors.name = "Insert a valid first name"
        if (!form.surname || !form.surname.trim()) newErrors.surname = "Insert a valid last name"

        if (!form.email || !form.email.trim() || !form.email.match(emailRegex)) newErrors.email = "Insert a valid email"

        let passwordErrorMsgs = isValidPassword(form.password)

        if (!form.password || !form.password.trim()) {
            newErrors.password = ["Insert a valid password"]
        } else {
            if (passwordErrorMsgs.length != 0) newErrors.password = passwordErrorMsgs
        }

        if ((form.password && passwordErrorMsgs.length == 0) && !form.repeatPassword) newErrors.repeatPassword = "Please confirm your password"
        if ((form.password && passwordErrorMsgs.length == 0) && form.password != form.repeatPassword) newErrors.repeatPassword = "Password do not match"

        return newErrors
    }

    const isValidPassword = (pass) => {
        const specialChars = '|°|!"#$%&/()=?¡¿{}[]´+,;.:-_^`~¬*'
        const errorMsgs = []

        if (!pass || typeof pass != "string" || pass.trim().length == 0) return false

        let hasSpecialChars = false
        let hasUppercaseChars = false

        for (let i = 0; i < pass.length; i++) {
            if (hasSpecialChars && hasUppercaseChars) {
                continue
            } else {
                if (pass[i] != pass[i].toLowerCase()) hasUppercaseChars = true
                if (specialChars.includes(pass[i])) hasSpecialChars = true
            }
        }

        if (!hasSpecialChars) errorMsgs.push("Password must contain special characters")
        if (!hasUppercaseChars) errorMsgs.push("Password must contain uppercase characters")
        if (pass.length < 8) errorMsgs.push("Password must be at least 8 characters long")

        return errorMsgs
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = formValidation()

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setLoading(true)
        const userRes = await registerUser(form)

        if (userRes.accessToken) {
            localStorage.setItem("nixAccessToken", userRes.accessToken)
            const user = jwtDecode(userRes.accessToken)
            setUser(user._doc ? user._doc : user)
            setLoading(false)
            setSuccess("Registered successfully!")
            redirect("/dashboard")
        } else if (userRes.error) {
            setLoading(false)
            setError(userRes.error)
        }

    }

    return (<div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
        <form className="bg-secondary-content p-4 px-8 rounded-lg shadow-lg flex flex-col items-center w-full max-w-xl mt-20" onSubmit={handleFormSubmit}>
            <h3 className="text-2xl text-secondary font-bold">Register</h3>
            <div className="divider"></div>
            <fieldset className="fieldset w-full">
                <legend className="fieldset-legend text-secondary">First Name</legend>
                <input id="name" className="input w-full" type="text" value={form.name} onChange={handleChange} />
                <span className="label text-error" hidden={!errors.name} >{errors.name}</span>
            </fieldset>

            <fieldset className="fieldset w-full">
                <legend className="fieldset-legend text-secondary">Last Name</legend>
                <input id="surname" className="input w-full" type="text" value={form.surname} onChange={handleChange} />
                <span className="label text-error" hidden={!errors.surname} >{errors.surname}</span>
            </fieldset>

            <fieldset className="fieldset w-full">
                <legend className="fieldset-legend text-secondary">Email</legend>
                <input id="email" className="input w-full" type="email" value={form.email} onChange={handleChange} />
                <span className="label text-error" hidden={!errors.email} >{errors.email}</span>
            </fieldset>

            <fieldset className="fieldset w-full">
                <legend className="fieldset-legend text-secondary">Password</legend>
                <input id="password" className="input w-full" type="password" value={form.password} onChange={handleChange} />
                {
                    errors.password?.map((p, idx) => (
                        <span className="label text-error" key={idx}>{p}</span>
                    ))
                }
            </fieldset>

            <fieldset className="fieldset w-full">
                <legend className="fieldset-legend text-secondary">Repeat password</legend>
                <input id="repeatPassword" className="input w-full" type="password" value={form.repeatPassword} onChange={handleChange} />
                <span className="label text-error" hidden={!errors.repeatPassword} >{errors.repeatPassword}</span>
            </fieldset>

            <h5 className="text-xs text-neutral-content">Already have an account? <Link href="/user/login" className="link text-primary">Log in</Link></h5>
            <button className="btn btn-primary mt-4 w-70" type="submit">Register</button>
        </form>
        <div hidden={!loading} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <span className="loading loading-spinner text-primary w-16 h-16"></span>
        </div>
    </div>)

}