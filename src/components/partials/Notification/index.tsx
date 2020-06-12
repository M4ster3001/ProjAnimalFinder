import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React, { useState } from 'react';

interface NewAlerts extends AlertProps {
    open: boolean;
    message: string;
}

const Notification = ( props:NewAlerts ) => {
    
    const [ open, setOpen ] = useState( props.message ? true : false );

    return(
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={10000}
                open={open}
                onClose={ ()=> { setOpen(false) } }
            >
               <MuiAlert elevation={6} variant="filled" {...props}>
                   { props.message }
               </MuiAlert>

            </Snackbar>
        </div>
    );
}

export default Notification;