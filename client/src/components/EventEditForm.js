import { useState } from "react";
import { Alert, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//TODO: FIX ALL OF THIS
export default function EventEditForm() {
    const [open, setOpen] = useState(false)
    const [submitted, setSubmitted] = useState(false); // Display an success alert once submitted state is set to 'true'.

    function handleChange(e) {
        
    }

    async function handleSubmit(e) {
        
    } 

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      return <p>EventEditForm.js</p>
}
