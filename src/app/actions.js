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

export const getUserWallets = async (userToken) => {

    try {
        const response = await fetch(`${process.env.API_URL}/user/login`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
        })

        const jsonResponse = await response.json()
        console.log(jsonResponse)

    } catch (e) {
        const errorMsg = e.response?.data || e
        return { error: errorMsg.toString() }
    }

}