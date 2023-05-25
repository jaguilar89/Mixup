import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { useState } from "react";

export default function NewEventForm() {
    const [eventName, setEventName] = useState('')
    const [eventLocation, setEventLocation] = useState('')
    const [maxAttendees, setMaxAttendees] = useState('')
    const [eventDescription, setEventDescription] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_name: eventName,
                event_location: eventLocation,
                available_spots: maxAttendees,
                event_description: eventDescription
            })
        });

        if (res.ok) {
            const event = await res.json()
            console.log(event)
        } else {
            const error = await res.json();
            console.log(error)
        }
    }

    return (
        <Container maxWidth='md' sx={{ border: '1px solid black' }}>
            <Box component='form'
                onSubmit={handleSubmit}
                sx={{
                    border: '1px dotted black',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50%',
                    m: 'auto'
                }
                }>
                <TextField
                    margin="normal"
                    required
                    id="event-name"
                    label='Event Name'
                    name="event_name"
                    onChange={(e) => setEventName(e.target.value)}
                />
                <FormControl required>
                    <InputLabel id='event-select-label'>City</InputLabel>
                    <Select
                        labelId="event-location-select-label"
                        id="event-location"
                        name='event_location'
                        label="Event Location"
                        onChange={(e) => setEventLocation(e.target.value)}
                        value={eventLocation}
                    >
                        <MenuItem value="nyc">New York City</MenuItem>
                        <MenuItem value="denver">Denver</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="normal"
                    required
                    multiline
                    id="available-spots"
                    label='Max # of Attendees'
                    name="available_spots"
                    onChange={(e) => setMaxAttendees(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    multiline
                    id="event-description"
                    label='Event Description'
                    name="event_description"
                    onChange={(e) => setEventDescription(e.target.value)}
                />
                <Button variant="contained" type="submit">Submit</Button>
            </Box>
        </Container>
    )
}