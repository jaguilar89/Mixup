import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box";
import LoadingScreen from "../components/LoadingScreen";
import Container from "@mui/material/Container";
import EventEditForm from "../components/EventEditForm";
import EventCancelDialog from "../components/EventCancelDialog";
import Alert from "@mui/material/Alert";
import GoogleMaps from "../components/GoogleMaps";
import { Typography } from "@mui/material";
import * as dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import parse from 'html-react-parser'

export default function EventPage({ user, events, setEvents }) {
    const [isLoading, setIsLoading] = useState(true)
    const [eventInfo, setEventInfo] = useState([])
    const [organizer, setOrganizer] = useState([])
    const [userAttendanceInfo, setUserAttendanceInfo] = useState([])
    const [attendees, setAttendees] = useState([])
    const [isAttending, setIsAttending] = useState(false)
    const { eventId } = useParams(); //EVENT_ID
    
    const userId = user?.id
    const eventDetails = eventInfo?.event_description
    const parsedEventDetails = eventDetails && eventDetails.toString() && parse(eventDetails)

    dayjs.extend(LocalizedFormat)
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const timeZoneoptions = {timeZone: userTimezone, timeZoneName: 'short', hour: '2-digit', minute: '2-digit'}
    const eventStart = eventInfo?.event_start
    const eventEnd = eventInfo?.event_end               //TODO: destructure eventInfo to tidy up variables
    const formattedTimeZone = (event) => new Date(event).toLocaleTimeString('en-US', timeZoneoptions)
    const formattedEventDateTime = (event) => {
        return dayjs(event).format('LL') + ' ' + formattedTimeZone(event)
    }

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/events/${eventId}`)

            if (res.ok) {
                const event = await res.json();
                setEventInfo(event)
                setOrganizer(event.organizer)
                setIsAttending(event.is_attending)
                setIsLoading(false)
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

    async function handleCancelEvent(e) {
        e.preventDefault();
        const res = await fetch(`/api/events/${eventId}`, {
            method: 'DELETE'
        })
        if (res.ok) {
            window.location.href = '/home'
        } else {
            const error = await res.json()
            console.log(error)
        }
    }

    function renderEventOptions() {  
        if (organizer.id === userId) {
            return (
                <Box component='div' display='flex' justifyContent='flex-start' alignItems='flex-start'>
                    <EventEditForm eventId={eventId} setEventInfo={setEventInfo}/>
                    <br/>
                    <EventCancelDialog onCancelEvent={handleCancelEvent}/>
                </Box>
            )
        } else if (isAttending && organizer.id !== userId) {
            return (
               <div>
                <Box component='form' onSubmit={handleRemoveRsvp}>
                    <Button variant="contained" type="submit">Cancel RSVP</Button>
                </Box>
               </div>
            )
        } else if (!isAttending) {
            return (
                <div>
                <Box component='form' onSubmit={handleSubmitRsvp}>
                    <Button variant="contained" type="submit">RSVP</Button>
                </Box>
            </div>
            )
        }
    }
   
    //handle loading screen logic
    return (
        <Box sx={{ display: 'flex', border: '1px solid red'}}>
          <Container sx={{ border: '1px solid black', mb: '20px', width: '70%' }}>
            {isAttending && (
              <Alert severity="success" sx={{"&.MuiAlert-root": {justifyContent: 'center'} }}>
                You are attending this event!
              </Alert>
            )}
            {eventInfo?.organizer?.id === userId && (
              <Alert severity="info" sx={{"&.MuiAlert-root": {justifyContent: 'center'} }}>
                You are organizing this event
              </Alert>
            )}
            {isLoading && <LoadingScreen />}
            <Box component='div' display='flex' flexDirection='column' gap='1px' sx={{ border: '1px dotted black' }}>
              {isAttending && <h1>You're attending!</h1>}
              <h1>{eventInfo.event_name}</h1>
              {renderEventOptions()}
            </Box>
            <Box component='div'>
              <h2>Details </h2>
            {parsedEventDetails}
            </Box>
          </Container>

          <Container sx={{ border: '1px solid black', mb: '20px', width: '35%' }}>
            <Box component='div' sx={{ border: '1px dotted blue', p: '10px' }}>
                <Typography variant="h6">Starts at: {formattedEventDateTime(eventStart)} </Typography>
                <Typography variant="h6">Ends at: {formattedEventDateTime(eventEnd)} </Typography>
                
                <br/>

              <GoogleMaps eventInfo={eventInfo}/>
              <h2>Availability: {eventInfo.available_spots} spot(s) left.</h2>
            </Box>
          </Container>
        </Box>
      );
      
};