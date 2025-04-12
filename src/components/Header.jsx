import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Header = ({ title, onBackClick }) => (
    <Box sx={{ display: "flex", mb: 1 }}>
      <img src="/back.svg" alt="Back" onClick={onBackClick} style={{ marginRight: "12px" }} />
      <Typography variant="h3" sx={{ fontSize: "24px", fontWeight: "600" }}>
        {title}
      </Typography>
    </Box>
);

export default Header;