import { 
    Accordion,
    Box, 
    Grid, 
    AccordionSummary, 
    AvatarGroup, 
    Typography, 
    Link, 
    Avatar 
} from "@mui/material";
import { useState } from "react";


export default function RsvpList({ attendees }) {
    const [expanded, setExpanded] = useState(false);

    function handleToggleExpand() {
        setExpanded(!expanded)
    }

    return (
        <>
        <Typography variant="h3" sx={{ textAlign: 'center', pb: 2 }}> RSVPs</Typography>

            <Accordion expanded={expanded} onChange={handleToggleExpand}>
                <AccordionSummary>
                    <Box component='div' display='flex' alignItems='center' justifyContent='center' m='auto'>
                        {attendees && (
                            <AvatarGroup total={attendees.length}>
                                {attendees && attendees.slice(0, 4).map((obj) => (
                                    <Avatar 
                                        key={obj}
                                        alt={obj.full_name}
                                        src={obj.avatar}
                                    />
                                ))}
                            </AvatarGroup>
                        )}
                        {attendees.length === 0 && (
                            <Typography variant="h5">There are no RSVPs for this event so far</Typography>
                        )}
                    </Box>
                </AccordionSummary>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Grid container rowSpacing={1} columnSpacing={10} sx={{ justifyContent: 'center' }}>
                        {attendees && attendees.map((el) => (
                            <Grid item key={el.user} xs={6} sm={6} md={6} sx={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                                <Box
                                    display='flex'
                                    flexDirection='column'
                                    alignItems='center'
                                    sx={{ width: '80%', maxWidth: '300px'}} 
                                >
                                        <Avatar 
                                            alt={el.user.full_name}
                                            src={el.avatar}
                                        />
                                    <Link 
                                        href={`/profiles/${el.user.id}`} 
                                        sx={{"&.MuiLink-root": {textDecoration: 'none'}}}
                                    >
                                        <Typography variant="h6">{el.user.full_name}</Typography>
                                    </Link>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Accordion>
            <br />
            </>
    )
}