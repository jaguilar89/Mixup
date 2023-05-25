import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function EventPage() {
    const [eventPage, setEventPage] = useState([])
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/events/${id}`)
            if (res.ok) {
                const event = await res.json()
                setEventPage(event)
            } else {
                const error = await res.json()
                console.log(error)
            }
        })()
    }, [id])
    return (
        <div>
            <h1>{eventPage.event_name}</h1>
            <h2>{eventPage.event_location}</h2>
            <h2>{eventPage.event_description}</h2>
            <h2>{eventPage.available_spots} spots left.</h2>
        </div>
    )
};