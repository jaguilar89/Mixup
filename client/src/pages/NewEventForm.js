import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import GooglePlacesAutocomplete from "../components/GooglePlacesAutocomplete";
import Alert from "@mui/material/Alert";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import TextEditor from "../components/TextEditor";

export default function NewEventForm({ setEvents }) {
    const [eventName, setEventName] = useState('')
    const [eventCity, setEventCity] = useState('')
    const [maxAttendees, setMaxAttendees] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [placeId, setPlaceId] = useState(null) //each location on Google Maps has a unique 'place_id' identifier
    const [eventStart, setEventStart] = useState(null)
    const [eventEnd, setEventEnd] = useState(null)
    const [venueInfo, setVenueInfo] = useState(null)
    const [errors, setErrors] = useState([])
    const { user } = useContext(UserContext)
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const { main_text: placeName, secondary_text: placeAddress } = venueInfo?.structured_formatting

        const res = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_name: eventName,
                event_city: eventCity,
                event_start: eventStart,
                event_end: eventEnd,
                place_identifier: placeId,
                place_name: placeName,
                place_address: placeAddress,
                max_attendees: maxAttendees,
                event_description: eventDescription,
                organizer_id: user.id
            })
        });

        if (res.ok) {
            const event = await res.json()
            setEvents(event)
            navigate(`/events/${event.id}`)
        } else {
            const errorObj = await res.json();
            setErrors(errorObj.errors)
            console.log(errorObj)
        }
    }

    function handleChangeStart(value) {
        const newValue = dayjs(value).toISOString()
        setEventStart(newValue)
    }
    function handleChangeEnd(value) {
        const newValue = dayjs(value).toISOString()
        setEventEnd(newValue)
    }

    return (
        <Container maxWidth='md' sx={{paddingBottom: '50px'}}>
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
                    id="event-name"
                    label='Event Name'
                    name="event_name"
                    onChange={(e) => setEventName(e.target.value)}
                />

                <GooglePlacesAutocomplete setVenueInfo={setVenueInfo} setPlaceId={setPlaceId} />
                
                <DateTimePicker
                    disablePast
                    label='Starts at'
                    onChange={handleChangeStart}
                />
                <DateTimePicker
                    disablePast
                    label='Ends at'
                    onChange={handleChangeEnd}
                />



                <FormControl required>
                    <InputLabel id='event-select-label'>City</InputLabel>
                    <Select
                        labelId="event-location-select-label"
                        id="event-city"
                        name='event_city'
                        label="Event City"
                        onChange={(e) => setEventCity(e.target.value)}
                        value={eventCity}
                    >
                        <MenuItem value="nyc">New York City</MenuItem>
                        <MenuItem value="denver">Denver</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="normal"
                    required
                    id="max-attendees"
                    label='Max # of Attendees'
                    name="max_attendees"
                    onChange={(e) => setMaxAttendees(e.target.value)}
                />

                {/*event details*/}
                <TextEditor setEventDescription={setEventDescription}/>

                <Button variant="contained" type="submit">Submit</Button>
                {errors && errors.map((err) => <Alert key={err} severity="error">{err}</Alert>)}
            </Box>
        </Container>
    )
}