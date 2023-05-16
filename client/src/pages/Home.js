import Grid from '@mui/material/Grid'
import EventCard from "../components/EventCard";
import { Container } from '@mui/material';


export default function Home() {
    return (
       <>
       <h1>The event cards will be in a grid layout, able to be sorted by distance as well as categories </h1>
       <Container maxWidth>
       <Grid container rowSpacing={5} columnSpacing={{xs: 4, sm: 8, md: 10}}>
            <Grid item>
                <EventCard />
            </Grid>
            <Grid item>
                <EventCard />
            </Grid>
            <Grid item>
                <EventCard />
            </Grid>
            <Grid item>
                <EventCard />
            </Grid>
            <Grid item>
                <EventCard />
            </Grid>
            <Grid item>
                <EventCard />
            </Grid>
            <Grid item>
                <EventCard />
            </Grid>
            <Grid item>
                <EventCard />
            </Grid>
        </Grid>
       </Container>
       </>
    )
}