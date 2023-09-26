import { useState } from "react";

export default function PasswordResetRequestForm() {
    const [emailAddress, setEmailAddress] = useState("")
    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch("/api/password/reset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email_address: emailAddress
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

    function Copyright(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="https://github.com/jaguilar89">
                    Jose Aguilar
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete='current-password'
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />

                        {errors && errors.map((err) => <Alert key={err} severity="error">{err}</Alert>)}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href='/login/signup'>
                                    Don't have an account? Sign up here
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <br />
                {Copyright()}
            </Container>

        </>
    );
}