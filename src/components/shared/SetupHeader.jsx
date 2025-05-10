import React from "react";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";

const SetupHeader = ({ title, onBackClick }) => (
    <Stack direction="row">
      <img src="/back.svg" alt="Back" onClick={onBackClick} style={{ marginRight: "12px" }} />
      <Typography variant="h3" fontSize="24px" fontWeight="600">
        {title}
      </Typography>
    </Stack>
);

export default SetupHeader;