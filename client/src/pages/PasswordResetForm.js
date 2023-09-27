import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { useState, useLocation } from 'react';
import logo from '../images/logo-transparent.png'

export default function PasswordResetForm() {
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState("")
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token')

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch("/api/password/reset/edit", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: newPassword,
                password_confirmation: newPasswordConfirmation
            })
        });
        if (res.ok) {
            const res = await res.json();
            console.log(res)
        } else {
            const err = await res.json();
            setErrors(err.errors)
        }

    }


    return (
        <>
            <CssBaseline />
            <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh' }}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src={logo} width="350px" height="50px" alt='logo' />
                    <br />
                    <Typography component="h1" variant="h5">
                        Reset Your Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="new-password"
                            label="New Password"
                            name="new-password"
                            autoComplete
                            autoFocus
                            onChange={(e) => setNewPassword(e.currentTarget.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password-confirmation"
                            label="Confirm New Password"
                            type="password-confirmation"
                            id="password-confirmation"
                            autoComplete='password-confirmation'
                            onChange={(e) => setNewPasswordConfirmation(e.currentTarget.value)}
                        />

                        {errors && errors.map((err) => <Alert key={err} severity="error">{err}</Alert>)}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reset Password
                        </Button>
                    </Box>
                </Box>
                <br />
            </Container>

        </>
    );
}