import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Dialog } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const HocModal = ({ open, onClose,children }) => {
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                {children}
        </Dialog>
    );
};

const DeleteConfirmationModal = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Confirm Deletion
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete this item?
                </Typography>
                <Button onClick={onConfirm} sx={{ mt: 3 }}>
                    Confirm
                </Button>
                <Button onClick={onClose} sx={{ mt: 3 }}>
                    Cancel
                </Button>
            </Box>
        </Dialog>
    );
};

export {
    HocModal,
    DeleteConfirmationModal
};