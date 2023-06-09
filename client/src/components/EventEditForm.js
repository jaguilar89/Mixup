import React, { useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";

export default function EventEditForm({ }) {
    const [submitted, setSubmitted] = useState(false); // Display an success alert once submitted state is set to 'true'.
    const [open, setOpen] = useState(false);
    const [venueInfo, setVenueInfo] = useState(null)
    const [placeId, setPlaceId] = useState(null)

    const [formData, setFormData] = useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleChange(e) {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (placeId) formData['place_identifier'] = placeId
        //TODO: FINISH SUBMIT FUNCTION, ADD UPDATE ACTION IN CONTROLLER
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
                {submitted ? <Alert severity="success">Event has been successfully updated. You may close this window.</Alert> : null}
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}