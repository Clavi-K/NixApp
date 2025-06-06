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