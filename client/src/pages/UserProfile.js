import { Avatar, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as dayjs from 'dayjs'

export default function UserProfile() {
    const [profile, setProfile] = useState([])
    const { id } = useParams()

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
        <>
        <Box display='flex' flexDirection='column' alignItems='center' sx={{marginTop: '2%', marginBottom: '50%'}}>
            <Box sx={{paddingLeft: '2%', marginTop: '5px'}} flexDirection='column'>
            <Avatar sx={{height: 200, width: 200, marginBottom: '15px'}}/>
            <Typography variant="h4" >{profile.user?.full_name} </Typography>
            <Typography variant="body1" textAlign='center'>Joined on {new Date(profile.user?.created_at).toLocaleDateString()}</Typography>
            </Box>
        </Box>
        </>
    )
}