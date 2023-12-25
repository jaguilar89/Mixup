import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import cardImage from '../../images/cardimage.jpeg'
import * as dayjs from 'dayjs';

export default function EventCard({ eventName, eventDate, eventPic, eventLocation, attendances, availableSpots, organizer }) {
  const formattedDate = dayjs(eventDate).format('llll')
  return (
    <Card sx={{ width: 320, m: 'auto', bgcolor: '#f5f5f5' }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='180'
          image={eventPic || cardImage}
          alt='event-image'
        />
        <Typography variant="h6">
          {eventName}
        </Typography>
        <Typography gutterBottom variant="body1">{eventLocation}</Typography>
        <Typography gutterBottom variant="body1">{formattedDate}</Typography>
        <Typography variant="body1">
          Hosted by {organizer}
        </Typography>
        <Box sx={{ display: 'flex', marginTop: '5px' }}>
          <Typography variant='subtitle2'>{attendances} RSVP(s) • {availableSpots - attendances} spot(s) left</Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}