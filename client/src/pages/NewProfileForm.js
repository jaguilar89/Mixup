import { Container, TextField, Button, Box, Alert, Typography } from "@mui/material"
import BioTextEditor from "../components/BioTextEditor"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function NewProfileForm() {
    const [homeCity, setHomeCity] = useState('')
    const [bio, setBio] = useState('')
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch('/api/profiles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bio,
                home_city: homeCity
            })
        })

        if (res.ok) {
            const profile = await res.json()
            navigate(`/profiles/${profile.id}`)
        } else {
            const err = await res.json()
            setErrors(err.errors)
        }
    }
    return (
         <Container maxWidth='md' sx={{marginBottom: '15%', marginTop: '2%'}}>
            <Typography variant="h4" textAlign='center'>Create your profile</Typography>
            <Box component='form'
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    width: '60%',
                    m: 'auto'
                }
                }>

                <TextField
                    margin="normal"
                    required
                    id="home-city"
                    label='Home City'
                    name="home_city"
                    onChange={(e) => setHomeCity(e.target.value)}
                />

                <BioTextEditor setBio={setBio}/>

                <Button variant="contained" type="submit">Submit</Button>
                {errors && errors.map((err) => <Alert key={err} severity="error">{err}</Alert>)}
            </Box>
        </Container>
    )
}