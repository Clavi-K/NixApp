"use client"

import { useGlobal } from "@/context/GlobalContext"
import { useParams } from "next/navigation"
import React, { useEffect } from "react"


export default function Wallet({ params }) {
    const { walletId } = useParams()

    const userToken = localStorage.getItem("nixAccessToken")
    const { user } = useGlobal()

    useEffect(() => {
        if (!user || !userToken) redirect("/user/login")
    })

    return (<div>This is a wallet, or will be at some point hopefully oh btw walletId {walletId}</div>)
}