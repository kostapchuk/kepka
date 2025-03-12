import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {styled} from "@mui/system";
import Button from "@mui/material/Button";

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        padding: 0,
        paddingTop: 20,
        borderRadius: 20,
        minWidth: 320,
        maxWidth: 480
    }
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    padding: 0,
    paddingLeft: 16,
    fontWeight: 600,
    fontSize: '1.25rem',
    paddingBottom: 16,
    textAlign: 'left'
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: 0,
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 16,
    textAlign: 'center',
    fontSize: '16px'
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: 0,
    paddingBottom: 20,
    paddingRight: 16,
    paddingLeft: 16,
    display: 'flex',
    justifyContent: 'space-around',
}));

const ActionButton = styled(Button)(({ theme }) => ({
    borderRadius: 12,
    fontWeight: 600,
    height: 48,
    flex: 1,
    padding: 0,
    fontSize: '16px',
    textTransform: 'none',
    backgroundColor: '#000000',
    color: '#FFFFFF',
}));

const ConfirmationTourChangeModal = ({
                               open,
                               title,
                               content,
                               secondaryButtonText = "Cancel",
                               onSecondaryAction
                           }) => {
    const handleClose = () => {
    };

    return (
        <StyledDialog
            open={open}
            onClose={handleClose}
            disableEscapeKeyDown
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
        >
            <StyledDialogTitle id="confirmation-dialog-title">
                {title}
            </StyledDialogTitle>

            <StyledDialogContent>
                {typeof content === 'string' ? (
                    <Typography id="confirmation-dialog-description">
                        {content}
                    </Typography>
                ) : (
                    content
                )}
            </StyledDialogContent>

            <StyledDialogActions>
                <ActionButton onClick={onSecondaryAction}>
                    {secondaryButtonText}
                </ActionButton>
            </StyledDialogActions>
        </StyledDialog>
    );
};

export default ConfirmationTourChangeModal;
