import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box";
import { UserContext } from "../context/UserContext";
import LoadingScreen from "../components/LoadingScreen";

export default function EventPage({user}) {
    const [isLoading, setIsLoading] = useState(true)
    const [eventInfo, setEventInfo] = useState([])
    const [userAttendance, setUserAttendance] = useState([])
    const [isAttending, setIsAttending] = useState(null)
    const [attendees, setAttendees] = useState([])
    const { id } = useParams(); //EVENT_ID
    
    useEffect(() => {
            (async () => {
                const res = await fetch(`/api/events/${id}`)
                if (res.ok) {
                    const event = await res.json()
                    setEventInfo(event)
                    setAttendees(event.attendances)
                } else {
                    const error = await res.json()
                    console.log(error)
                }
            })()     
    }, [])
    

    async function handleSubmitRsvp(e) {
        e.preventDefault();
        const res = await fetch(`/api/events/${id}/attendances`, { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user.id,
                event_id: id
            })
        })
        if (res.ok) {
            const attendance = await res.json()
            setUserAttendance(attendance)
            setIsAttending(true)
        } else {
            const error = await res.json()
            console.log(error)
        }
    }

    async function handleEditRsvp(e) {
        e.preventDefault();

        const res = await fetch(`/api/events/${id}/attendances/${userAttendance.id}`, {
            method: 'DELETE'
        })
        setIsAttending(false) 
    }
    return (
        <div>
            <h1>{eventInfo.event_name}</h1>
            <h2>{eventInfo.event_location}</h2>
            <h2>{eventInfo.event_description}</h2>
            <h2>{eventInfo.available_spots} spots left.</h2>
            {!isAttending ? (
                <Box component='form' onSubmit={handleSubmitRsvp}>
                    <Button variant="contained" type="submit">RSVP</Button>
                </Box>
            ): (
                <Box component='form' onSubmit={handleEditRsvp}>
                    <Button variant="contained" type="submit">Edit RSVP</Button>
                </Box>
            )}
        </div>
    )
};