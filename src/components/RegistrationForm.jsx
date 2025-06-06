"use client"

import axios from "axios"
import { useState } from "react";
import NextLink from "next/link"
import { Box, Button, TextField, Typography, Paper, Stack, Link, CircularProgress, Snackbar, Slide, Alert, SnackbarContent, useTheme } from '@mui/material';

import Loading from "./loading";
import { registerUser } from "@/app/actions"

export default function RegistrationForm() {

    const theme = useTheme()

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [snackbar, setSnackbar] = useState({ visible: false, msg: "", color: "primary" })
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
        setErrors(prev => ({ ...prev, [id]: "" }))
    }

    const handleSnackbar = (props) => {
        setSnackbar(prev => ({ ...prev, ...props }))
    }

    const onSnackbarClose = () => {
        handleSnackbar({ color: "primary", visible: false, msg: "" })
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

    const formValidation = () => {
        const newErrors = {}
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!form.name.trim()) newErrors.name = "Insert a valid first name"
        if (!form.surname.trim()) newErrors.surname = "Insert a valid last name"

        if (!form.email.trim() || !form.email.match(emailRegex)) newErrors.email = "Insert a valid email"

        let passwordErrorMsgs = isValidPassword(form.password)

        if (!form.password) {
            newErrors.password = ["Insert a valid password"]
        } else {
            if (passwordErrorMsgs.length != 0) newErrors.password = passwordErrorMsgs
        }

        if ((form.password && passwordErrorMsgs.length == 0) && !form.repeatPassword) newErrors.repeatPassword = "Please confirm your password"
        if ((form.password && passwordErrorMsgs.length == 0) && form.password != form.repeatPassword) newErrors.repeatPassword = "Password do not match"

        return newErrors
    }

    const formSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = formValidation()

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setLoading(true)
        const userRes = await registerUser(form)
        setLoading(false)

        if (userRes.accessToken) {

            localStorage.setItem("nixAccessToken", userRes.accessToken)
            setSnackbar({ visible: true, color: "success", msg: "User successfully created!" })
        } else if (userRes.error) {
            setSnackbar({ visible: true, color: "primary", msg: userRes.error })
        }

    }

    return (
        <>
            <Loading open={loading} />
            <Box
                component="section"
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'background.default',
                    px: 2,
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        maxWidth: 400,
                        width: '100%',
                        borderRadius: 3,
                        bgcolor: 'background.paper',
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h5" component="h1" sx={{ mb: 2, mt: -1 }} color="primary">Create Account</Typography>
                    <form onSubmit={formSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                id="name"
                                label="Name"
                                fullWidth
                                autoComplete="name"
                                value={form.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                            <TextField
                                id="surname"
                                label="Surname"
                                fullWidth
                                autoComplete="lastname"
                                value={form.surname}
                                onChange={handleChange}
                                error={!!errors.surname}
                                helperText={errors.surname}
                            />
                            <TextField
                                id="email"
                                label="Email"
                                type="email"
                                fullWidth
                                autoComplete="email"
                                value={form.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                fullWidth
                                autoComplete="new-password"
                                value={form.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={
                                    Array.isArray(errors.password) ? errors.password.map((e, idx) => { return (<span key={idx}>{e}<br /></span>) }) : ""
                                }
                            />
                            <TextField
                                id="repeatPassword"
                                label="Repeat Password"
                                type="password"
                                fullWidth
                                autoComplete="repeat-password"
                                value={form.repeatPassword}
                                onChange={handleChange}
                                error={!!errors.repeatPassword}
                                helperText={errors.repeatPassword}
                            />

                            <Button
                                color="primary"
                                size="large"
                                sx={{ border: 2, textTransform: "none" }}
                                type="submit"
                            >
                                <Typography>Register</Typography>
                            </Button>
                        </Stack>
                    </form>
                    <Typography variant='body2' color={theme.palette.text.subtle} alignSelf="end" sx={{ mt: 3, mb: -2 }}>Already have an account? <Link component={NextLink} color="secondary" href="/">Log in</Link></Typography>
                </Paper>
                <Slide direction="up" in={snackbar.visible} mountOnEnter={true} unmountOnExit={true}>
                    <Snackbar open={snackbar.visible} color="primary" autoHideDuration={4000} onClose={onSnackbarClose}>
                        <SnackbarContent sx={{ backgroundColor: theme.palette[snackbar.color].main, color: theme.palette.text.light }} message={snackbar.msg} />
                    </Snackbar>
                </Slide>
            </Box>
        </>)
}