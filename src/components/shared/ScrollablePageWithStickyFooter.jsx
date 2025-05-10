import React from 'react';
import {Box, Container, Stack} from '@mui/material';
import StickyFooter from "./StickyFooter";

const ScrollablePageWithStickyFooter = ({children, footer}) => (
    <Stack minHeight="100vh">
      <Box flex={1} overflow="auto">
        <Container sx={{mt: 2}} maxWidth="xs">
          {children}
        </Container>
      </Box>
      {footer && <StickyFooter>{footer}</StickyFooter>}
    </Stack>
);

export default ScrollablePageWithStickyFooter;
