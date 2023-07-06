import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function GoogleMaps({ eventInfo }) {
    const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY

    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {eventInfo.place_name}
                        </Typography>
                        <Typography variant="body3" color="text.secondary">
                            {eventInfo.place_address}
                        </Typography>
                    </CardContent>
                <CardMedia
                    component="iframe"
                    height="350"
                    src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}
          &q=place_id:${eventInfo.place_identifier}`}
                    alt="event location"
                />
            </CardActionArea>
        </Card>
    );
}