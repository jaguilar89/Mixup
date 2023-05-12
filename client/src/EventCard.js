import { CardMedia } from '@mui/material';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography';

export default function EventCard() {
    return (
    <Card variant="outlined" sx={{ width: 320, m: 'auto', bgcolor: '#f5f5f5' }}>
      <Typography variant="body1">Event Date</Typography>
      <Typography variant="h5" sx={{ m: 'auto' }}>
        Event Name
      </Typography>
      <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
      >
      </IconButton>
        <CardMedia
            component='img'
            height='194'
            image='https://media.istockphoto.com/id/894635514/photo/he-makes-success-sound-easy.jpg?b=1&s=170667a&w=0&k=20&c=1M6TCnI_mFkHoaooAuzyksZxhEQpCyuC5G-gWQAEbL4='
            alt='something'
            />

      <Box sx={{ display: 'flex' }}>
        <Button
          variant="contained"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ m: 'auto', fontWeight: 600 }}
        >
          Details
        </Button>
      </Box>
    </Card>
    )
}