import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "@mui/system/styled";
import Button from "@mui/material/Button";
import React from 'react';

const StyledDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialog-paper': {
        padding: 0,
        paddingTop: 20,
        borderRadius: 20,
        minWidth: 320,
        maxWidth: 480
    }
}));

const StyledDialogTitle = styled(DialogTitle)(({theme}) => ({
    padding: 0,
    paddingLeft: 16,
    fontWeight: 600,
    fontSize: '1.25rem',
    paddingBottom: 16,
    textAlign: 'left'
}));

const StyledDialogContent = styled(DialogContent)(({theme}) => ({
    padding: 0,
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 16,
    textAlign: 'center',
    fontSize: '16px'
}));

const StyledDialogActions = styled(DialogActions)(({theme}) => ({
    padding: 0,
    paddingBottom: 20,
    paddingRight: 16,
    paddingLeft: 16,
    display: 'flex',
    justifyContent: 'space-around'
}));

const ActionButton = styled(Button)(({theme, onlyPrimary}) => ({
    borderRadius: 12,
    fontWeight: 600,
    height: 48,
    flex: 1,
    padding: 0,
    fontSize: '16px',
    textTransform: 'none',
    borderColor: '#D1D1D1',
    backgroundColor: onlyPrimary ? '#000000' : '#F0F0F0',
    color: onlyPrimary ? '#F0F0F0' : '#000000'
}));

const BaseModal = ({
                       open,
                       title,
                       content,
                       primaryButtonText,
                       secondaryButtonText,
                       onPrimaryAction,
                       onSecondaryAction,
                       onlyPrimary
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
                {content}
            </StyledDialogContent>
            <StyledDialogActions>
                {
                    !onlyPrimary && <ActionButton onClick={onSecondaryAction} variant="outlined">
                        {secondaryButtonText}
                    </ActionButton>
                }
                <ActionButton onlyPrimary={onlyPrimary} onClick={onPrimaryAction} variant={onlyPrimary ? "": "outlined"}>
                    {primaryButtonText}
                </ActionButton>
            </StyledDialogActions>
        </StyledDialog>
    );
};

export default BaseModal;
