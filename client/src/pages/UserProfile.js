import { Avatar, Box, Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from 'html-react-parser'

import * as dayjs from 'dayjs'

export default function UserProfile() {
    const [profile, setProfile] = useState([])
    const { id } = useParams()

    const userBio = profile?.bio
    const parsedBio = userBio && userBio.toString() && parse(userBio)

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/profiles/${id}`)

            if (res.ok) {
                const profileInfo = await res.json()
                setProfile(profileInfo)
            } else {
                const err = await res.json()
                console.log(err.errors)
            }
        })()
    }, [id])

    return (
        <Container maxWidth='lg'>
            <Box display='flex' flexDirection='column' alignItems='center' sx={{ marginTop: '2%', marginBottom: '50%' }}>
                <Box sx={{ paddingLeft: '2%', marginTop: '5px' }} flexDirection='column'>
                    <Avatar sx={{ height: 200, width: 200, marginBottom: '15px' }} />
                    <Typography variant="h4" >{profile.user?.full_name} </Typography>
                    <Typography variant="body1" textAlign='center'>Joined on {dayjs(new Date(profile.user?.created_at).toLocaleDateString()).format('MMMM YYYY')}</Typography>
                </Box>
                <Box sx={{ marginTop: '50px', paddingBottom: '50px' }}>
                    <Typography variant="body1">{parsedBio}</Typography>
                </Box>
                <Box>
                    <Typography variant="h4">Past Events</Typography>
                </Box>
            </Box>
        </Container>
    )
}