import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box";
import LoadingScreen from "../components/LoadingScreen";

export default function EventPage({user}) {
    const [isLoading, setIsLoading] = useState(true)
    const [eventInfo, setEventInfo] = useState([])
    const [userAttendance, setUserAttendance] = useState(null)
    const [attendees, setAttendees] = useState([])
    const [isAttending, setIsAttending] = useState(false)
    const { eventId } = useParams(); //EVENT_ID
    
    const userId = user?.id
    
    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const res = await fetch(`/api/events/${eventId}`)
            
            if (res.ok) {
                const event = await res.json();
                setEventInfo(event)
                setAttendees(event.attendances)
            } else {
                const error = await res.json()
                console.log(error)
            }
        })()
        console.log(attendees)
    }, [eventId])
    
    console.log('attending? ' + ' ' + isAttending)
    async function handleSubmitRsvp(e) {
        e.preventDefault();
        const res = await fetch(`/api/events/${eventId}/attendances`, { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user.id,
                event_id: eventId
            })
        })
        if (res.ok) {
            const attendance = await res.json()
            setUserAttendance(attendance)
            setIsAttending(true)
            console.log(userAttendance)
        } else {
            const error = await res.json()
            console.log(error)
        }
    }

    async function handleRemoveRsvp(e) {
       console.log(userAttendance)
    }

   {isLoading && <LoadingScreen />}

    return (
        <div>
            {isAttending && <h1>You're attending!</h1>}
            <h1>{eventInfo.event_name}</h1>
            <h2>{eventInfo.event_location}</h2>
            <h2>{eventInfo.event_description}</h2>
            <h2>{eventInfo.available_spots} spots left.</h2>
            {!isAttending ? (
                <Box component='form' onSubmit={handleSubmitRsvp}>
                    <Button variant="contained" type="submit">RSVP</Button>
                </Box>
            ): (
                <Box component='form' onSubmit={handleRemoveRsvp}>
                    <Button variant="contained" type="submit">Remove RSVP</Button>
                </Box>
            )}
        </div>
    )
};