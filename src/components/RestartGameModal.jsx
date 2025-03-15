import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";
import Button from "@mui/material/Button";
import React from 'react';

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
    borderColor: '#D1D1D1',
    backgroundColor: '#F0F0F0',
    color: '#000000',
}));

const RestartGameModal = ({
                               open,
                               title,
                               content,
                               primaryButtonText = "Confirm",
                               secondaryButtonText = "Cancel",
                               onPrimaryAction,
                               onSecondaryAction
                           }) => {

    return (
        <StyledDialog
            onClose={onSecondaryAction}
            open={open}
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
                <ActionButton onClick={onSecondaryAction} variant="outlined">
                    {secondaryButtonText}
                </ActionButton>

                <ActionButton onClick={onPrimaryAction} variant="outlined">
                    {primaryButtonText}
                </ActionButton>
            </StyledDialogActions>
        </StyledDialog>
    );
};

export default RestartGameModal;
