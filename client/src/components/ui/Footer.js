import { Box, Link, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#ffffff',
        padding: '1rem',
        display: 'flex',
        position: 'sticky',
        bottom: 0,
        width: '100%',
        height: '30px',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto'
      }}
    >
      <Link href="https://www.linkedin.com/in/jaguilar89" target="_blank" rel="noopener">
        <IconButton aria-label="LinkedIn" color="primary">
          <LinkedInIcon sx={{ fontSize: '32px' }} />
        </IconButton>
      </Link>
      <Link href="https://github.com/jaguilar89" target="_blank" rel="noopener">
        <IconButton aria-label="GitHub" color="primary">
          <GitHubIcon sx={{ fontSize: '32px' }} />
        </IconButton>
      </Link>
      <Link href="mailto:joseaguilardev@gmail.com" target="_blank" rel="noopener">
        <IconButton aria-label="Email" color="primary">
          <EmailIcon sx={{ fontSize: '32px' }} />
        </IconButton>
      </Link>
    </Box>
  );
}


