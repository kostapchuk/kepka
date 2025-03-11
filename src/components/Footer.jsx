import {Box, Typography} from "@mui/material";
import ResetFullGame from "./ResetFullGame";
import React from "react";

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#f8f8f8',
                padding: '20px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
            <Typography sx={{margin: '0 10px'}}>
                v{process.env.REACT_APP_VERSION}
            </Typography>
            <ResetFullGame/>
        </Box>
    )
};

export default Footer;
