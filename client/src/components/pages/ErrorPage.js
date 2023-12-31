import { Typography, Box, Button } from "@mui/material";

export default function ErrorPage({ error }) {
    console.log(error)
    return (
        <Box textAlign='center' marginTop='5%' height='100vh'>
            <Typography variant="h1">Oops!</Typography>
            <Typography variant="body1">Something went wrong.</Typography>
            <Typography variant="body1">Error: {error}</Typography>
            <Button variant="contained" href="/home">Return Home</Button>
        </Box>
    )
}