"use client"

import { useState } from "react"
import NextLink from "next/link"
import { redirect } from "next/navigation";
import { Box, Button, TextField, Typography, Paper, Stack, Link, Snackbar, Slide, SnackbarContent, useTheme } from '@mui/material';

import Loading from "./loading"
import { loginUser } from "@/app/actions";

export default function LoginForm() {

    if (localStorage.getItem("nixAccessToken")) {
        redirect("/")
    }

    const theme = useTheme()

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const [snackbar, setSnackbar] = useState({
        visible: false,
        msg: "",
        color: "primary"
    })

    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const handleSnackbar = (props) => {
        setSnackbar(prev => ({ ...prev, ...props }))
    }

    const onSnackbarClose = () => {
        handleSnackbar({ color: "primary", visible: false, msg: "" })
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        setForm(prev => ({ ...prev, [id]: value }))
        setErrors(prev => ({ ...prev, [id]: "" }))
    }

    const formValidation = () => {
        const newErrors = {}
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!form.email.trim() || !form.email.match(emailRegex)) newErrors.email = "Insert a valid email"
        if (!form.password || !form.password.trim()) newErrors.password = "Please insert a valid password"

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
        const userRes = await loginUser(form)
        setLoading(false)

        if (userRes.accessToken) {
            localStorage.setItem("nixAccessToken", userRes.accessToken)
            redirect("/")
        } else if (userRes.error) {
            if (userRes.error.includes("password")) {
                setErrors(prev => ({ ...prev, password: userRes.error }))
            } else {
                setErrors(prev => ({ ...prev, email: userRes.error }))
            }
        }

    }

    return (<>
        <Loading open={loading} />
        <Box
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
                <Typography variant="h5" component="h1" sx={{ mb: 2, mt: -1 }} color="primary">Log In</Typography>
                <form onSubmit={formSubmit}>
                    <Stack spacing={2}>
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
                            autoComplete="password"
                            value={form.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <Button
                            color="primary"
                            size="large"
                            sx={{ border: 2, textTransform: "none" }}
                            type="submit"
                        >
                            <Typography>Log in</Typography>
                        </Button>
                    </Stack>
                </form>
                <Typography variant='body2' color={theme.palette.text.subtle} alignSelf="end" sx={{ mt: 3, mb: -2 }}>Don't have an account? <Link component={NextLink} color="secondary" href="/user/register">Register</Link></Typography>
            </Paper>
            <Slide direction="up" in={snackbar.visible} mountOnEnter={true} unmountOnExit={true}>
                <Snackbar open={snackbar.visible} color="primary" autoHideDuration={4000} onClose={onSnackbarClose}>
                    <SnackbarContent sx={{ backgroundColor: theme.palette[snackbar.color].main, color: theme.palette.text.light }} message={snackbar.msg} />
                </Snackbar>
            </Slide>
        </Box >
    </>)
}