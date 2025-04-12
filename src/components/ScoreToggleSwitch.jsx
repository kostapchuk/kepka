import React from 'react';
import {Box, Typography} from "@mui/material";
import {PurpleSwitcherNoLabel} from "./Switcher";

const ScoreToggleSwitch = ({checked, onToggle, label}) => (
    <Box>
      <Typography sx={{fontSize: "14px", color: "#6B6B6B", mt: 2.5, mb: 0.5}}>
        {label}
      </Typography>
      <PurpleSwitcherNoLabel checked={checked} onChange={onToggle} />
    </Box>
);

export default ScoreToggleSwitch;
