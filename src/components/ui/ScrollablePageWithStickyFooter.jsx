import React from 'react';
import {Box, Container} from '@mui/material';
import StickyFooter from "./StickyFooter";

const ScrollablePageWithStickyFooter = ({children, footer}) => (
    <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <Box sx={{flex: 1, overflow: 'auto'}}>
        <Container sx={{mt: 2}} maxWidth="xs">
          {children}
        </Container>
      </Box>
      {footer && <StickyFooter>{footer}</StickyFooter>}
    </Box>
);

export default ScrollablePageWithStickyFooter;
