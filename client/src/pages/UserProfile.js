import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    console.log(profile)
    return (
        <Box display='flex' justifyContent='center' sx={{marginBottom: '50%'}}>
            <h1>{profile.user?.full_name}'s profile</h1>
        </Box>
    )
}