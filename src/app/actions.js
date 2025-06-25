"use server"

export const registerUser = async (user) => {
    try {
        const response = await fetch(`${process.env.API_URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })

        const jsonResponse = await response.json()
        return jsonResponse
    } catch (e) {
        console.error(e)

        const errorMsg = e.response?.data || e
        return { error: errorMsg.toString() }
    }

}

export const loginUser = async (user) => {
    try {
        const response = await fetch(`${process.env.API_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })

        const jsonResponse = await response.json()
        return jsonResponse
    } catch (e) {
        console.error(e)

        const errorMsg = e.response?.data || e
        return { error: errorMsg.toString() }
    }
}

export const logoutUser = async (userToken) => {
    try {
        const response = await fetch(`${process.env.API_URL}/user/logout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
        })

        const jsonResponse = await response.json()
        return jsonResponse
    } catch (e) {
        console.error(e)

        const errorMsg = e.response?.data || e
        return { error: errorMsg.toString() }
    }
}

export const pingUser = async (userToken) => {
    try {
        const response = await fetch(`${process.env.API_URL}/user/ping`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
        })

        if (response.status == 403) {
            throw new Error("Forbidden")
        } else {
            return "Valid session"
        }
    } catch (e) {
        console.error(e)

        const errorMsg = e.response?.data || e
        return { error: errorMsg.toString() }
    }
}

export const getUserWallets = async (userToken) => {

    try {
        const response = await fetch(`${process.env.API_URL}/wallet`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
        })

        const jsonResponse = await response.json()
        return jsonResponse

    } catch (e) {
        const errorMsg = e.response?.data || e
        return { error: errorMsg.toString() }
    }

}

export const createWallet = async (userToken, wallet) => {
    try {
        const response = await fetch(`${process.env.API_URL}/wallet`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify(wallet)
        })

        const jsonResponse = await response.json()
        return jsonResponse

    } catch (e) {
        const errorMsg = e.response?.data || e
        return { error: errorMsg.toString() }
    }
}

export const getUserWallet = async (userToken, walletId) => {
    try {
        const response = await fetch(`${process.env.API_URL}/wallet?id=${walletId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
        })

        const jsonResponse = await response.json()
        return jsonResponse

    } catch (e) {
        const errorMsg = e.response?.data || e
        return { error: errorMsg.toString() }
    }
}

export const getWalletCategories = async (userToken, walletId) => {
    try {
        const response = await fetch(`${process.env.API_URL}/category?walletId=${walletId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
        })

        const jsonResponse = await response.json()
        console.log(jsonResponse)
        return jsonResponse

    } catch (e) {
        const errorMsg = e.response?.data || e
        return { error: errorMsg.toString() }
    }
}