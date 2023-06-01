import Grid from '@mui/material/Grid'
import EventCard from "../components/EventCard";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LoginForm from '../components/LoginForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



export default function Home({ user, events, setEvents }) {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/events')
            if (res.ok) {
                const eventsList = await res.json();
                setEvents(eventsList)
            } else {
                const error = await res.json()
                console.log(error)
            }
        })()
    }, []);

    const eventCards = events.map((event) => (
        <Grid item
            onClick={() => navigate(`/events/${event.id}`)}
            key={event.id}
        >
            <EventCard
                eventName={event.event_name}
                eventLocation={event.event_location}
                attendances={event.attendances.length}
                availableSpots={event.available_spots}
                organizer={event.organizer.full_name}
            />
        </Grid>
    ))
    if (!user) return <LoginForm />
    return (
        <>
            <h1>The event cards will be in a grid layout, able to be sorted by distance as well as categories </h1>
            <Container sx={{ border: '1px solid black' }}>
                <Button
                    variant='contained'
                    component='a'
                    href='/events/new'
                >Create Event
                </Button>
                <br />
                <Grid container rowSpacing={5} columnSpacing={{ xs: 4, sm: 8, md: 10 }}>
                    {eventCards}
                </Grid>
            </Container>
        </>
    )
}