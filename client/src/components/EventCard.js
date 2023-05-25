import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function EventCard({ eventName, eventLocation, availableSpots }) {

  return (
    <Card sx={{ maxWidth: 320, m: 'auto', bgcolor: '#f5f5f5' }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='180'
          image='https://media.istockphoto.com/id/894635514/photo/he-makes-success-sound-easy.jpg?b=1&s=170667a&w=0&k=20&c=1M6TCnI_mFkHoaooAuzyksZxhEQpCyuC5G-gWQAEbL4='
          alt='event-image'
        />
        <Typography variant="h6">
          {eventName}
        </Typography>
        <Typography gutterBottom variant="body1">Event Date</Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography variant='subtitle2'>{availableSpots} spots free</Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}