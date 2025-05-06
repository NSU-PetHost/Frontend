import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const SuccessMessage = ({ message, onClose }) => {
    return (
        <Collapse in={Boolean(message)}>
            <Alert
                severity="success"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={onClose}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                {message}
            </Alert>
        </Collapse>
    );
};