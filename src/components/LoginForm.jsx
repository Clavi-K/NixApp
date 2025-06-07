"use client"

import { useState } from "react"
import NextLink from "next/link"
import { Box, Button, TextField, Typography, Paper, Stack, Link, CircularProgress, Snackbar, Slide, Alert, SnackbarContent, useTheme } from '@mui/material';

import Loading from "./loading"

export default function LoginForm() {

    const theme = useTheme()

    const [loading, setLoading] = useState(false)
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