import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function PasswordResetRequestForm() {
    const [emailAddress, setEmailAddress] = useState("")
    const [alerts, setAlerts] = useState([])
    const [errors, setErrors] = useState([])

    async function handleSubmit(e) {
        e.preventDefault()
        
        const res = await fetch('/api/password/reset', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email_address: emailAddress
            })
        })

        if (res.ok) {
            const msg = await res.json()
            setAlerts([msg.alerts])
        } else {
            const err = await res.json()
            setErrors(err.errors)
        }

        e.target.reset()
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh' }}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <br />
                <Typography component="h1" variant="h5">
                    Request Password Reset
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, textAlign: 'center' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email-address"
                        label="Email Address"
                        name="email-address"
                        autoComplete
                        autoFocus
                        onChange={(e) => setEmailAddress(e.currentTarget.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
            {alerts && alerts.map((msg) => <Alert key={msg} severity="info">{msg}</Alert>)}
        </Container>
    )
}