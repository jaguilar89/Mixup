import Grid from '@mui/material/Grid'
import EventCard from "../components/EventCard";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import LoginForm from '../components/LoginForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


export default function Home({ user, setUser, events, setEvents }) {
    const [isLoading, setIsLoading] = useState(true)
    const [cityFilter, setCityFilter] = useState("all")
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/events')
            if (res.ok) {
                const eventsList = await res.json();
                setEvents(eventsList)
                setIsLoading(false)
            } else {
                const error = await res.json()
                console.log(error)
            }
        })()
    }, []);

    const eventCards =
        events.filter((event) => cityFilter === 'all' ? true : event.event_city === cityFilter)
              .filter((event) => new Date() < new Date(event.event_end)) //filter out events that have already passed
              .map((event) => (
                    <Grid item
                        onClick={() => navigate(`/events/${event.id}`)}
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
                    </Grid>
            ))

    function handleCityChange(e) {
        setCityFilter(e.target.value)
    }

    return (
        <>
            <Box display='flex' justifyContent='center' marginTop='50px' marginBottom='25px'>
                <FormControl sx={{ width: '25%' }}>
                    <InputLabel>Search By City</InputLabel>
                    <Select
                        id='city-select'
                        onChange={handleCityChange}
                        value={cityFilter}
                    >
                        <MenuItem value='all'>All</MenuItem>
                        <MenuItem value='nyc'>NYC</MenuItem>
                        <MenuItem value='denver'>Denver</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Container sx={{ marginBottom: '40%', paddingTop: '50px' }}>
                {isLoading && <LoadingScreen />}
                <br />
                <Grid container justifyContent='center' rowSpacing={5} columnSpacing={{ xs: 4, sm: 8, md: 10 }}>
                    {events && eventCards}
                </Grid>
            </Container>
        </>
    )
}

