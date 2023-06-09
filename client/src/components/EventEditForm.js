import React, { useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";

export default function EventEditForm({ eventId, setEventInfo }) {
    const [submitted, setSubmitted] = useState(false); // Display an success alert once submitted state is set to 'true'.
    const [open, setOpen] = useState(false);
    const [venueInfo, setVenueInfo] = useState(null)
    const [placeId, setPlaceId] = useState(null)
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({})

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
    async function handleSubmit(e) {
        console.log(venueInfo)
        e.preventDefault();
        const { main_text: placeName, secondary_text: placeAddress } = venueInfo?.structured_formatting 
        
        //TODO: Fix place name and address updating
        const res = await fetch(`/api/events/${eventId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (res.ok) {
            const updatedEvent = await res.json()
            setEventInfo(updatedEvent)
            setSubmitted(true)
            setTimeout(() => setOpen(false), 2000)
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
                    />
                    <br />
                    {/* <TextField
                variant="standard"
                label="Upload Image"
                name="event_image"
                margin="dense"
            /> */}
                    <br />

                    <GooglePlacesAutocomplete setVenueInfo={setVenueInfo} setPlaceId={setPlaceId} />


                    <TextField
                        onChange={handleChange}
                        variant="standard"
                        label="Max # of attendees"
                        name="max_attendees"
                        margin="dense"
                    />
                    <br />
                    <TextField
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        variant="standard"
                        label="Event Description"
                        name="event_description"
                        margin="dense"
                    />

                    <br />

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" type="submit">Submit</Button>
                </DialogActions>
                {submitted ? <Alert severity="success">Event has been successfully updated. Returning to your event page...</Alert> : null}
                {errors && errors.map((err) => <Alert severity="error">{err}</Alert>)}
            </Dialog>
        </Box>
    )
}