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
    const userAttendances = user?.attendances

    //TODO: SECOND USEEFFECT FOR ATTENDANCES FETCH?
    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/events/${eventId}`)
            
            if (res.ok) {
                const event = await res.json();
                const rsvp = event.is_attending
                const attendances = event.attendances
                console.log(attendances)
                const attendanceRecord = userAttendances.filter((record) => record.event_id === eventId)
                console.log(attendanceRecord)
                Boolean(attendanceRecord.length) && setUserAttendanceInfo(attendanceRecord)
                setEventInfo(event)
                setAttendees(attendances)
                setIsAttending(rsvp)
                console.log(event.is_attending)
            } else {
                const error = await res.json()
                console.log(error)
            }
        })()
    }, [user?.id])
    
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
            setUserAttendanceInfo(attendance)
            setIsAttending((isAttending) => !isAttending)
        } else {
            const error = await res.json()
            console.log(error)
        }
    }

     async function handleRemoveRsvp(e) {
        e.preventDefault()
       const attendanceId = userAttendanceInfo.id
       console.log('attendance id is ' + ' ' + attendanceId)
       /* const res = await fetch(`/api/events/${eventId}/attendances/58`, {
        method: 'DELETE'
       })
       if (res.ok) {
        const response = await res.json()
        setIsAttending(false)
       } else {
        const error = await res.json()
        console.log(error)
       } */
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