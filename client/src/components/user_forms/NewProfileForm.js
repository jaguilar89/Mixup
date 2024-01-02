import { Container, Button, Box, Alert, Typography, Input, Avatar, InputLabel } from "@mui/material"
import BioTextEditor from "../ui/BioTextEditor"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ErrorPage from '../pages/ErrorPage'

export default function NewProfileForm() {
    const [avatar, setAvatar] = useState(null)
    const [previewUrl, setPreviewUrl] = useState('')
    const [bio, setBio] = useState('')
    const [error, setError] = useState([])
    const navigate = useNavigate()

    function handleFileChange(e) {
        const selectedFile = e.target.files[0]
        setAvatar(selectedFile)
        setPreviewUrl(URL.createObjectURL(selectedFile))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const controller = new AbortController()
        const signal = controller.signal

        const formData = new FormData()
        formData.append('avatar', avatar)
        formData.append('bio', bio)

        try {
            const res = await fetch('/api/profiles', {
                method: 'POST',
                body: formData,
                signal
            })

            if (res.ok) {
                const profile = await res.json()
                navigate(`/profiles/${profile.id}`)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    { error && <ErrorPage error={error} /> }
    return (
        <Container maxWidth='md' sx={{ paddingTop: '20px', paddingBottom: '20px' }}>
            <Typography variant="h4" textAlign='center'>Create your profile</Typography>
            <Box component='form'
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    width: '60%',
                    m: 'auto',
                    alignItems: 'center'
                }
                }>

                <Avatar
                    sx={{ height: 200, width: 200 }}
                    src={previewUrl}
                />

                <InputLabel htmlFor='file-input'>Upload Profile Picture</InputLabel>
                <Input
                    type="file"
                    inputProps={{ accept: 'image/*' }}
                    onChange={handleFileChange}
                />

                <BioTextEditor setBio={setBio} />

                <Button variant="contained" type="submit">Submit</Button>
                {error && error.map((err) => <Alert key={err} severity="error">{err}</Alert>)}
            </Box>
        </Container>
    )
}