import { Typography, Box } from "@mui/material";

export default function PageNotFound() {
    return (
        <Box textAlign='center' marginTop='5%'>
        <Typography variant="h1">Oops!</Typography>
        <Typography variant="body1">Sorry, but the page you are looking for was not found. Make sure you have typed the correct path.</Typography>
        </Box>
    )
}