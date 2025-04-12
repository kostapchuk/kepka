import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {PurpleSwitcherNoLabel} from "./Switcher";

const ToggleSwitch = ({ checked, onChange, label }) => (
    <Box>
      <Typography sx={{ fontSize: "14px", color: "#6B6B6B", mt: 2.5, mb: 0.5 }}>
        {label}
      </Typography>
      <PurpleSwitcherNoLabel checked={checked} onChange={onChange} />
    </Box>
);

export default ToggleSwitch;
