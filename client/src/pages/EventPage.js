import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box";
import LoadingScreen from "../components/LoadingScreen";
import Container from "@mui/material/Container";

export default function EventPage({user}) {
    const [isLoading, setIsLoading] = useState(true)
    const [eventInfo, setEventInfo] = useState([])
    const [userAttendanceInfo, setUserAttendanceInfo] = useState([])
    const [attendees, setAttendees] = useState([])
    const [isAttending, setIsAttending] = useState(false)
    const { eventId } = useParams(); //EVENT_ID
    
    const userId = user?.id
    
    //Not the cleanest code but it finally works!! Refactor later(maybe).
    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/events/${eventId}`)
            
            if (res.ok) {
                const event = await res.json();
                setEventInfo(event)
                setIsAttending(event.is_attending)
            } else {
                const error = await res.json()
                console.log(error)
            }
        })()
    }, [eventId])
    
    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/events/${eventId}/attendances`)

            if (res.ok) {
                const attendanceRecords = await res.json()
                setAttendees(attendanceRecords)
                const userRecord = attendanceRecords.filter((rec) => rec.user_id === userId)
                if (userRecord.length !== 0) setUserAttendanceInfo(userRecord)
            } else {
                const error = await res.json()
                console.log(error)
            }
        })()
    }, [isAttending]);

    async function handleSubmitRsvp(e) {
        e.preventDefault();
        const res = await fetch(`/api/events/${eventId}/attendances`, { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: userId,
                event_id: eventId
            })
        })
        if (res.ok) {
            const attendance = await res.json()
            if (attendance) setIsAttending((isAttending) => !isAttending)
        } else {
            const error = await res.json()
            console.log(error)
        }
    }

     async function handleRemoveRsvp(e) {
        e.preventDefault()
        if (userAttendanceInfo.length !== 0) {
            const attendanceId = userAttendanceInfo[0].id
            const res = await fetch(`/api/events/${eventId}/attendances/${attendanceId}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                const msg = await res.json()
                setUserAttendanceInfo(null)
                setIsAttending((isAttending) => !isAttending)
                console.log(msg)
            } else {
                const error = await res.json()
                console.log(error)
            }
        } else {
            console.log('userAttendanceInfo is empty')
        }
    }

    //handle loading screen logic
    return (
        <Container sx={{border: '1px solid black'}}>
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
        </Container>
    )
};