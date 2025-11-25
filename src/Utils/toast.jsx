import React, { useState } from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = (props) => {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    }
    const show = open && props.open;
    return <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={show}
        autoHideDuration={3000}
       // onClose={() => { handleClose() }}
        key={{ vertical: 'top', horizontal: 'right' }}
    >
        <Alert onClose={() => { handleClose() }} severity={props.type} sx={{ width: '100%' }}>
            {props.message}
        </Alert></Snackbar>
}
export default Toast;