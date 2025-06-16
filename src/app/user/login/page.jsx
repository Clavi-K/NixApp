"use client"

import { loginUser } from "@/app/actions"
import { useAuth } from "@/context/AuthContext"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import Link from "next/link"

export default function Login() {

    const { user, setUser } = useAuth()

    useEffect(() => {
        if (user) redirect("/")
    }, [])

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setForm(prev => ({ ...prev, [id]: value }))
        setErrors(prev => ({ ...prev, [id]: id !== "password" ? "" : [] }))
    }

    const formValidation = () => {
        const newErrors = {}
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!form.email || !form.email.trim() || !form.email.match(emailRegex)) newErrors.email = "Insert a valid email"
        if (!form.password || !form.password.trim()) newErrors.password = ["Insert a valid password"]

        return newErrors
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = formValidation()

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setLoading(true)
        const userRes = await loginUser(form)

        if (userRes.accessToken) {
            localStorage.setItem("nixAccessToken", userRes.accessToken)
            const user = jwtDecode(userRes.accessToken)
            setUser(user._doc ? user._doc : user)
            redirect("/")
        } else if (userRes.error) {

            if (userRes.error.includes("password")) {
                setErrors(prev => ({ ...prev, password: userRes.error }))
            } else {
                setErrors(prev => ({ ...prev, email: userRes.error }))
            }

        }

        setLoading(false)
    }

    return (<div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
        <form className="bg-secondary-content p-8 rounded-lg shadow-lg flex flex-col items-center w-full max-w-xl" onSubmit={handleFormSubmit}>
            <h3 className="text-2xl text-secondary font-bold">Log in</h3>
            <div className="divider"></div>
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

            <h5 className="text-xs text-neutral-content">Don't have an account? <Link href="/user/register" className="link text-primary">Register</Link></h5>
            <button className="btn btn-primary mt-4 w-70" type="submit">Log in</button>
        </form>
        <div hidden={!loading} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <span className="loading loading-spinner text-primary w-16 h-16"></span>
        </div>

    </div>)
}