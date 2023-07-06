import { Typography, Button, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import networkingImage from '../images/networking.png'
import meetupImage from '../images/meetups.jpg'
import splashImage from '../images/splash.jpg'

const HeroSection = styled('div')(({ theme }) => ({
  backgroundImage: `url(${splashImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  marginBottom: theme.spacing(4),
}));

const CardContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
}));

const EventCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
  borderRadius: theme.spacing(2),
}));

const CardMediaWrapper = styled(CardMedia)(({ theme }) => ({
  height: '200px',
  objectFit: 'cover',
}));

/* const linkStyle = {
    textDecoration: 'none',
    color: '#f5f5f5',
    "&:hover": {
      color: 'inherit'
    },
    "&:visited": {
      color: 'inherit',
      textDecoration: 'none'
    }
  } */

export default function LandingPage() {
    const navigate = useNavigate()
  return (
    <div>
      <HeroSection>
        <Container maxWidth="sm">
          <Typography variant="h2" align="center" gutterBottom>
            Welcome to Mixup
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Discover, connect, and attend exciting events near you.
          </Typography>
          <Button onClick={() => navigate('/home')}variant="contained" color="primary" size="large" sx={{ display: 'block', margin: '0 auto', marginTop: 2 }}>
            Explore Events
          </Button>
        </Container>
      </HeroSection>
      <CardContainer maxWidth="md" sx={{marginBottom: '50px'}}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <EventCard>
              <CardMediaWrapper
                component="img"
                image={networkingImage}
                alt="Networking"
              />
              <CardContent>
                <Typography variant="h5" component="h2" align="center">
                  Networking
                </Typography>
                <Typography align="center" paragraph>
                  Connect and make friends through networking events.
                </Typography>
              </CardContent>
            </EventCard>
          </Grid>
          <Grid item xs={12} sm={6}>
            <EventCard>
              <CardMediaWrapper
                component="img"
                image={meetupImage}
                alt="Meetup"
              />
              <CardContent>
                <Typography variant="h5" component="h2" align="center">
                  Meetups
                </Typography>
                <Typography align="center" paragraph>
                  Join and organize meetups for shared interests and hobbies.
                </Typography>
              </CardContent>
            </EventCard>
          </Grid>
        </Grid>
      </CardContainer>
    </div>
  );
}

