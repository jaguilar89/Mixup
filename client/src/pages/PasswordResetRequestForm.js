import Box from "@mui/material/Box";
import { Container, Typography, TextField, Button } from "@mui/material";
import logo from '../images/logo-transparent.png'
import { useState } from "react";

export default function PasswordResetRequestForm() {
    const [emailAddress, setEmailAddress] = useState("")
    const [alert, setAlert] = useState(null)

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
                <Box component="form" noValidate sx={{ mt: 1 }}>
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
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>
            </Box>
        </Container>
    )
}