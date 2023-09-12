import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo-transparent.png'

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/jaguilar89">
          Jose Aguilar
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  } 

export default function SignupForm({ setUser }) {
    const [fullName, setFullName] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                full_name: fullName,
                email_address: emailAddress,
                password,
                password_confirmation: passwordConfirmation
            })
        })

        if (res.ok) {
            const user = await res.json()
            setUser(user)
            navigate('/profiles/new')
        } else {
            const err = await res.json()
            //setIsLoading(false)
            setErrors(err.errors)
        }

    }

    return (
            <>
            <Container component="main" maxWidth="xs">

                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src={logo} width="350px" height="50px" alt='logo'/>
                    <br />
                    <Typography component="h1" variant="h5">
                        Sign Up For An Account
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="full-name"
                            label="Full Name"
                            name="full name"
                            autoFocus
                            onChange={(e) => setFullName(e.currentTarget.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email_address"
                            label="Email Address"
                            name= "email_address"
                            autoFocus
                            onChange={(e) => setEmailAddress(e.currentTarget.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password-confirmation"
                            label="Password Confirmation"
                            type="password"
                            id="password-confirmation"
                            onChange={(e) => setPasswordConfirmation(e.currentTarget.value)}
                        />

                        {errors && errors.map((err) => <Alert key={err} severity="error">{err}</Alert>)}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create Account
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href='/login'>
                                    Already have an account? Log in here.
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <br />
            {Copyright()}
            </>
    );
}

