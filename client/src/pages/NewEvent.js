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
    const [eventName, setEventName] = useState("")
    const [city, setCity] = useState(null)

    return (
        <Container component='main' maxWidth='md' sx={{ border: '1px solid black' }}>
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
                    name="event name"
                />
                <FormControl required>
                    <InputLabel id='event-select-label'>City</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={city}
                        label="Age"
                        //onChange={handleChange}
                    >
                        <MenuItem value="nyc">New York City</MenuItem>
                        <MenuItem value='denver'>Denver</MenuItem>
                    </Select>
                </FormControl>
                <TextField 
                    margin="normal"
                    required
                    multiline
                    id="event-description"
                    label='Event Description'
                    name="event description"
                />
            <Button variant="contained">Submit</Button>
            </Box>
        </Container>
    )
}