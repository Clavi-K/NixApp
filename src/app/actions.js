"use server"

import axios from "axios"

export const registerUser = async (user) => {

    try {
        const response = await axios.post(process.env.API_URL, user)
        return response
    } catch (e) {
        console.error(e)
        return e.toString()
    }

}