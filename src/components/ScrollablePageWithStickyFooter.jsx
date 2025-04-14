import React from 'react';
import {Box, Container, Paper} from '@mui/material';

const ScrollablePageWithStickyFooter = ({children, footer}) => {
  return (
      <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <Box sx={{flex: 1, overflow: 'auto'}}>
          <Container sx={{mt: 2}} maxWidth="xs">
            {children}
          </Container>
        </Box>

        {footer && <Paper
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
            {footer}
          </Container>
        </Paper>
        }
      </Box>
  );
};

export default ScrollablePageWithStickyFooter;
