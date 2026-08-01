import React from 'react';
import {Box, Container, Stack} from '@mui/material';
import StickyFooter from "./StickyFooter";

const ScrollablePageWithStickyFooter = ({children, footer}) => (
    // On iOS, 100vh is the viewport with the browser toolbars retracted, so a
    // 100vh page is taller than what you can actually see and scrolls by the
    // toolbar height even when it is empty. dvh tracks the visible viewport.
    <Stack sx={{
      minHeight: '100vh',
      '@supports (min-height: 100dvh)': {minHeight: '100dvh'}
    }}>
      <Box flex={1} overflow="auto">
        <Container sx={{mt: 2}} maxWidth="xs">
          {children}
        </Container>
      </Box>
      {footer && <StickyFooter>{footer}</StickyFooter>}
    </Stack>
);

export default ScrollablePageWithStickyFooter;
