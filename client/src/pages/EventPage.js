import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import EventEditForm from "../components/EventEditForm";
import EventCancelDialog from "../components/EventCancelDialog";
import Alert from "@mui/material/Alert";
import cardImage from '../images/cardimage.jpeg'
import * as dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import parse from 'html-react-parser'
import RsvpList from "../components/RsvpList";
import EventInfo from "../components/EventInfo";

export default function EventPage({ user }) {
    const [eventInfo, setEventInfo] = useState([])
    const [userAttendanceInfo, setUserAttendanceInfo] = useState([])
    const [attendees, setAttendees] = useState([])
    const [isAttending, setIsAttending] = useState(false)
    const { eventId } = useParams(); //EVENT_ID
    const userId = user?.id
    const eventDetails = eventInfo?.event_description
    const parsedEventDetails = eventDetails && eventDetails.toString() && parse(eventDetails)  //parse the event details in HTML format in order to render correctly

    dayjs.extend(LocalizedFormat)
    const currentDate = new Date()
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const timeZoneoptions = { timeZone: userTimezone, timeZoneName: 'short', hour: '2-digit', minute: '2-digit' }
    const formattedTimeZone = (event) => new Date(event).toLocaleTimeString('en-US', timeZoneoptions)
    const formattedEventDateTime = (event) => {
        return dayjs(event).format('LL') + ' ' + formattedTimeZone(event)
    }

    const eventHasPassed = currentDate > new Date(eventInfo?.event_end)

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/events/${eventId}`)

            if (res.ok) {
                const event = await res.json();
                setEventInfo(event)
            } else {
                const error = await res.json()
                console.error(error)
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
                console.error(error)
            }
        })()
    }, [eventId, isAttending]);

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
            console.error(error)
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
                setUserAttendanceInfo(null)
                setIsAttending((isAttending) => !isAttending)
            } else {
                const error = await res.json()
                console.error(error)
            }
        } else {
            console.error('userAttendanceInfo is empty')
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
        if (eventHasPassed) return;

        if (eventInfo?.organizer?.id === userId) {
            return (
                <Box component='div' display='flex' justifyContent='flex-start' alignItems='flex-start'>
                    <EventEditForm eventId={eventId} setEventInfo={setEventInfo} />
                    <br />
                    <EventCancelDialog onCancelEvent={handleCancelEvent} />
                </Box>
            )
        } else if (isAttending && eventInfo?.organizer?.id !== userId) {
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

    function displayAlert() {
        if (eventHasPassed) {
            return (
                <Alert severity="error" sx={{ "&.MuiAlert-root": { justifyContent: 'center' } }}>
                    This event has already ended.
                </Alert>
            )
        } else if (isAttending && !eventHasPassed) {
            return (
                <Alert severity="success" sx={{ "&.MuiAlert-root": { justifyContent: 'center' } }}>
                    You are attending this event!
                </Alert>
            )
        } else if (eventInfo?.organizer?.id === userId && !eventHasPassed) {
            return (
                <Alert severity="info" sx={{ "&.MuiAlert-root": { justifyContent: 'center' } }}>
                    You are organizing this event.
                </Alert>
            )
        }
    }

    return (
        <>
            <EventInfo
                displayAlert={displayAlert}
                eventInfo={eventInfo}
                cardImage={cardImage}
                parsedEventDetails={parsedEventDetails}
                renderEventOptions={renderEventOptions}
                formattedEventDateTime={formattedEventDateTime}
            />
            <RsvpList attendees={attendees} />
        </>
    );

};
