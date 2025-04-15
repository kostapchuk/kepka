import React from 'react';
import {Box, Typography} from "@mui/material";
import Toggler from "./Toggler";

const LabeledToggler = ({checked, onToggle, label}) => (
    <Box>
      <Typography sx={{fontSize: "14px", color: "#6B6B6B", mt: 2.5, mb: 0.5}}>
        {label}
      </Typography>
      <Toggler checked={checked} onChange={onToggle} />
    </Box>
);

export default LabeledToggler;
