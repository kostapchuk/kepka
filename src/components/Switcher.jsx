import React from 'react';
import {styled} from '@mui/material/styles';
import Switch from '@mui/material/Switch';

// Custom styled switch component
const CustomSwitch = styled(Switch)(({theme}) => ({
    width: 48,
    height: 28,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(20px)', // Adjusted for new width (48-28+2)
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#7A51EC',
                opacity: 1,
                border: 0
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5
            }
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#7A51EC',
            border: '6px solid #fff'
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
        }
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 24,  // Adjusted to 24px
        height: 24, // Adjusted to 24px
        color: '#fff'
    },
    '& .MuiSwitch-track': {
        borderRadius: 28 / 2,
        backgroundColor: '#D1D1D1',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500
        })
    }
}));

const PurpleSwitcherNoLabel = ({checked, onChange, ...props}) => {
    return (
        <CustomSwitch
            checked={checked}
            onChange={onChange}
            {...props}
        />
    );
};

export {PurpleSwitcherNoLabel};
