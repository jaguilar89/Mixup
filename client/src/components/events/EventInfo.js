import {
    Avatar,
    Box,
    Container,
    Typography,
    Link
} from "@mui/material"
import GoogleMaps from "../google_api/GoogleMaps"

export default function EventInfo({
    displayAlert,
    eventInfo,
    parsedEventDetails,
    renderEventOptions,
    formattedEventDateTime
}) {

    const eventName = eventInfo?.event_name
    const eventPic = eventInfo?.event_pic
    const organizerName = eventInfo?.organizer?.full_name
    const organizerId = eventInfo?.organizer?.id
    const organizer_avatar = eventInfo?.organizer_avatar
    const placeId = eventInfo?.place_identifier
    const eventStart = eventInfo?.event_start
    const eventEnd = eventInfo?.event_end
    const availableSpots = eventInfo?.available_spots

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Container sx={{ mb: '20px', width: '70%', textAlign: 'center' }}>
                {displayAlert()}

                <Box component='div' sx={{ pb: '20px', marginTop: '10px' }}>
                    <Typography variant="h3">{eventName}</Typography>
                    <Link href={`/profiles/${organizerId}`}>
                        <Typography variant="h6" sx={{ display: 'inline-flex', gap: '10px', pt: '10px' }}>
                            <Avatar alt={organizerName} src={organizer_avatar} />
                            Hosted by {organizerName}
                        </Typography>
                    </Link>
                </Box>
                <Box
                    component='img'
                    sx={{
                        height: 400,
                        width: 700
                    }}
                    alt="event picture"
                    src={eventPic}
                />
                <Box component='div'>
                    <Typography variant="h4">Details</Typography>
                    {parsedEventDetails}
                </Box>
            </Container>

            <Container sx={{ mb: '20px', mt: '15px', width: '35%' }}>
                {renderEventOptions()}
                <Box component='div' sx={{ p: '10px' }}>
                    <Typography variant="h6">Starts at: {formattedEventDateTime(eventStart)} </Typography>
                    <Typography variant="h6">Ends at: {formattedEventDateTime(eventEnd)} </Typography>
                    <Typography variant="h6">Spots available: {availableSpots} spots(s) left</Typography>

                    <br />

                    {placeId && <GoogleMaps eventInfo={eventInfo} />}
                </Box>
            </Container>
        </Box>
    )
}