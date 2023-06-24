import { Avatar, Box, Typography, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import parse from 'html-react-parser'
import * as dayjs from 'dayjs'

export default function UserProfile() {
    const [profile, setProfile] = useState([])
    const { id } = useParams()

    const userBio = profile?.bio
    const parsedBio = userBio && userBio.toString() && parse(userBio)
    const currentDate = new Date()

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


    const pastAttendedEvents = 
     profile.attended_events && 
     profile.attended_events.filter((event) => new Date(event.event_end) < currentDate)
     .map((event) => (
        <Grid item
            key={event.id}
        >
            <EventCard
                eventName={event.event_name}
                eventLocation={event.place_name}
                eventDate={event.event_start}
            />
        </Grid>
     ))

     //console.log(pastAttendedEvents)
    return (
        <Container maxWidth='lg'>
            <Box display='flex' flexDirection='column' alignItems='center' sx={{ marginTop: '2%' }}>
                <Box sx={{ paddingLeft: '2%', marginTop: '5px' }} flexDirection='column'>
                    <Avatar sx={{ height: 200, width: 200, marginBottom: '15px' }} />
                    <Typography variant="h4" >{profile.user?.full_name} </Typography>
                    <Typography variant="body1" textAlign='center'>Joined on {dayjs(new Date(profile.user?.created_at).toLocaleDateString()).format('MMMM YYYY')}</Typography>
                </Box>
                <Box sx={{ marginTop: '50px', paddingBottom: '50px' }}>
                    <Typography variant="body1">{parsedBio}</Typography>
                </Box>

                    <Box><Typography variant="h4">Past Events</Typography></Box>

            </Box>
                    <Grid container sx={{border: '1px solid black',}} justifyContent='center' rowSpacing={5} columnSpacing={{ xs: 4, sm: 8, md: 10 }}>
                        {<Typography variant="h4">This person has not attended any events</Typography>}
                    </Grid>
        </Container>
    )
}

/* .map((event) => (
    <Grid item
        key={event.id}
    >
        <EventCard
            eventName={event.event_name}
            eventLocation={event.place_name}
            eventDate={event.event_start}
            attendances={event.attendances.length}
            availableSpots={event.available_spots}
            organizer={event.organizer.full_name}
        />
    </Grid> */