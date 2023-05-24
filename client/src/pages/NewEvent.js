import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { useState } from "react";

export default function NewEvent() {
    const [eventFormData, setEventFormData] = useState({})

    function handleChange(e) {
        e.preventDefault();
        setEventFormData({
            ...eventFormData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {

    }
    
    return (
        <Container maxWidth='md' sx={{ border: '1px solid black' }}>
            <Box component='form'
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
                        onChange={handleChange}
                    />
                <FormControl required>
                    <InputLabel id='event-select-label'>City</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name='event_city'
                        label="Event City"
                        onChange={handleChange}
                        value=''
                    >
                        <MenuItem value="nyc">New York City</MenuItem>
                        <MenuItem value="denver">Denver</MenuItem>
                    </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        multiline
                        id="event-description"
                        label='Event Description'
                        name="event_description"
                        onChange={handleChange}
                    />
                <Button variant="contained">Submit</Button>
            </Box>
        </Container>
    )
}