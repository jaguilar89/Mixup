import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Box } from '@mui/material';

export default function EventCancelDialog({onCancelEvent}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box component='form' onSubmit={onCancelEvent}>
      <Button variant="contained" onClick={handleClickOpen}>
        Cancel Event
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Cancel Event"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel the event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box component='form'>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleClose} autoFocus type='submit'>
            Yes
          </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}