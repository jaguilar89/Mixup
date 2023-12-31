import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel";
import GooglePlacesAutocomplete from "../google_api/GooglePlacesAutocomplete";
import Alert from "@mui/material/Alert";
import Input from "@mui/material/Input";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import TextEditor from "../ui/TextEditor";
import LoadingScreen from "../ui/LoadingScreen";

export default function NewEventForm({ setEvents }) {
    const [loading, setLoading] = useState(null)
    const [eventName, setEventName] = useState('')
    const [eventPic, setEventPic] = useState(null)
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
        setLoading(true)

        const { main_text: placeName, secondary_text: placeAddress } = venueInfo?.structured_formatting

        const formData = new FormData()
        formData.append('event_name', eventName)
        formData.append('event_start', eventStart)
        formData.append('event_end', eventEnd)
        formData.append('event_pic', eventPic)
        formData.append('place_identifier', placeId)
        formData.append('place_name', placeName)
        formData.append('place_address', placeAddress)
        formData.append('max_attendees', maxAttendees)
        formData.append('event_description', eventDescription)
        formData.append('organizer_id', user.id)

        const res = await fetch('/api/events', {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            const event = await res.json()
            setLoading(false)
            setEvents(event)
            navigate(`/events/${event.id}`)
        } else {
            const errorObj = await res.json();
            setErrors(errorObj.errors)
            console.log(errors)
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

    function handleFileChange(e) {
        const selectedFile = e.target.files[0]
        setEventPic(selectedFile)
    }

    if (loading) return <LoadingScreen />
    return (
        <Container maxWidth='md' sx={{ paddingBottom: '50px' }}>
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

                <TextField
                    margin="normal"
                    required
                    id="max-attendees"
                    label='Max # of Attendees'
                    name="max_attendees"
                    onChange={(e) => setMaxAttendees(e.target.value)}
                />

                <InputLabel htmlFor='file-input' required>Upload Event Picture</InputLabel>
                <Input
                    type="file"
                    inputProps={{ accept: 'image/*' }}
                    onChange={handleFileChange}
                    required
                />
                {/*event details*/}
                <TextEditor setEventDescription={setEventDescription} />

                <Button variant="contained" type="submit">Submit</Button>
                {errors && errors.map((err) => <Alert key={err} severity="error">{err}</Alert>)}
            </Box>
        </Container>
    )
}