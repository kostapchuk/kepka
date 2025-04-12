import React from 'react';
import {Typography, Box} from "@mui/material";

const TourSetupHeader = ({onBackClick, title}) => (
    <Box sx={{display: "flex", mb: 1, alignItems: 'center'}}>
      <img src="/back.svg" alt="Back" onClick={onBackClick} style={{marginRight: '12px', cursor: 'pointer'}} />
      <Typography variant="h3" sx={{fontSize: "24px", fontWeight: "600"}}>
        {title}
      </Typography>
    </Box>
);

export default TourSetupHeader;
