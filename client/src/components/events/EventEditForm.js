import React, { useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import GooglePlacesAutocomplete from "../google_api/GooglePlacesAutocomplete";
import { DateTimePicker } from "@mui/x-date-pickers";
import TextEditor from "../ui/TextEditor";
import dayjs from "dayjs";

export default function EventEditForm({ eventId, setEventInfo }) {
    const [submitted, setSubmitted] = useState(false); // Display an success alert once submitted state is set to 'true'.
    const [open, setOpen] = useState(false);
    const [venueInfo, setVenueInfo] = useState(null)
    const [placeId, setPlaceId] = useState(null)
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({})
    const [eventDescription, setEventDescription] = useState('')
    const [eventStart, setEventStart] = useState(null)
    const [eventEnd, setEventEnd] = useState(null)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleChange(e) { //for typed inputs
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleChangeStart(value) {
        const newValue = dayjs(value).toISOString()
        setEventStart(newValue)
    }
    function handleChangeEnd(value) {
        const newValue = dayjs(value).toISOString()
        setEventEnd(newValue)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { main_text: placeName, secondary_text: placeAddress } = venueInfo?.structured_formatting

        let updatedFormData;

        if (placeId) {
            updatedFormData = {
                ...formData,
                place_identifier: placeId,
                place_name: placeName,
                place_address: placeAddress,
                event_start: eventStart,
                event_end: eventEnd,
                event_description: eventDescription
            }
        }

        const res = await fetch(`/api/events/${eventId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFormData)
        })

        if (res.ok) {
            const updatedEvent = await res.json()
            setEventInfo(updatedEvent)
            setSubmitted(true)
            setTimeout(() => {
                setOpen(false)
                setSubmitted(false)
            }, 1500)
        } else {
            const err = await res.json()
            setErrors(err.errors)
        }
    }

    return (
        <Box>
            <Button variant="contained" onClick={handleClickOpen} sx={{ marginRight: '20px' }}>Edit Event</Button>
            <Dialog open={open} maxWidth='md' fullWidth component='form' onSubmit={handleSubmit}>

                <DialogTitle>Edit Event Details</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={handleChange}
                        variant="standard"
                        label="Event Name"
                        name="event_name"
                        margin="dense"
                        sx={{ marginBottom: '20px' }}
                    />

                    <GooglePlacesAutocomplete setVenueInfo={setVenueInfo} setPlaceId={setPlaceId} />
                    <br />
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
                    <br />
                    <TextField
                        onChange={handleChange}
                        variant="standard"
                        label="Max # of attendees"
                        name="max_attendees"
                        margin="dense"
                        sx={{ marginBottom: '20px' }}
                    />


                    <TextEditor setEventDescription={setEventDescription} />


                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" type="submit">Submit</Button>
                </DialogActions>
                {submitted ? <Alert severity="success">Event has been successfully updated. Returning to your event...</Alert> : null}
                {errors && errors.map((err) => <Alert severity="error">{err}</Alert>)}
            </Dialog>
        </Box>
    )
}