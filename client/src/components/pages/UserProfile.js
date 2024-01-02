import { Avatar, Box, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PastEventCard from "../events/PastEventCard";
import parse from 'html-react-parser'
import * as dayjs from 'dayjs'
import ErrorPage from "./ErrorPage";

export default function UserProfile() {
  const [profile, setProfile] = useState([])
  const [error, setError] = useState(null)
  const { id } = useParams()

  const userBio = profile?.bio
  const parsedBio = userBio && userBio.toString() && parse(userBio)
  const currentDate = new Date()

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`/api/profiles/${id}`)
        if (res.ok) {
          const profile = await res.json();
          setProfile(profile)
        }
      } catch (error) {
        setError(error.message)
      }
    }

    fetchProfile()
  }, [id])


  const pastAttendedEvents =
    profile.attended_events &&
    profile.attended_events.filter((event) => new Date(event.event_end) < currentDate)
      .map((event) => (
        <Grid item
          key={event.id}
        >
          <PastEventCard
            eventName={event.event_name}
            eventLocation={event.place_name}
            eventDate={event.event_start}
          />
        </Grid>
      ))

  {error && <ErrorPage error={error}/>}
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{paddingTop: '2%' }}>
        <Avatar
          sx={{ height: 200, width: 200 }}
          src={profile.avatar}
        />
        <Typography variant="h4" paddingTop='30px'>{profile.user?.full_name}</Typography>
        <Typography variant="body1" textAlign="center">
          Joined on{' '}
          {dayjs(new Date(profile.user?.created_at).toLocaleDateString()).format(
            'MMMM YYYY'
          )}
        </Typography>
      </Box>
      <Box sx={{ paddingBottom: '40px', width: '1000px', textAlign: 'center' }}>
        <Typography variant="h4">About Me</Typography>
        <Typography variant="body1">{parsedBio}</Typography>
      </Box>
      <Box>
        <Typography variant="h4">Past Events</Typography>
      </Box>
      {!profile.attended_events?.length > 0 && <Typography variant="h5">This person has not attended any events</Typography>}
      <Grid
        container
        justifyContent="center"
        rowSpacing={5}
        columnSpacing={{ xs: 4, sm: 8, md: 10 }}
      >
        {pastAttendedEvents}
      </Grid>
    </Box>
  );
}
