import {Container, Paper} from "@mui/material";
import React from "react";

const StickyFooter = ({children}) => (
    <Paper
        elevation={3}
        sx={{
          position: 'sticky',
          bottom: 0,
          width: '100%',
          zIndex: 1000,
          py: 2,
          pb: 4
        }}
    >
      <Container maxWidth="xs">
        {children}
      </Container>
    </Paper>
);

export default StickyFooter;