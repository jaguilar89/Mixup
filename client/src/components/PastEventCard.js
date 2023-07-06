import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography';
import cardImage from '../images/cardimage.jpeg'
import * as dayjs from 'dayjs';

export default function PastEventCard({eventName, eventLocation, eventDate}) {
  const formattedDate = dayjs(eventDate).format('llll')
  return (
    <Card sx={{ maxWidth: 320, m: 'auto', bgcolor: '#f5f5f5' }}>
        <CardMedia
          component='img'
          height='180'
          image={cardImage}
          alt='event-image'
        />
        <Typography variant="h6">
          {eventName}
        </Typography>
        <Typography gutterBottom variant="body1">{eventLocation}</Typography>
        <Typography gutterBottom variant="body1">{formattedDate}</Typography>
    </Card>
  )
}