import React from 'react';
import { Typography, Box, Container, Stack } from '@mui/material';
import TerminalMockup from 'components/Public/TerminalMockup/TerminalMockup';
import CTAButtons from 'components/Public/CTAButtons/CTAButtons';

const HeroSection = () => {
  return (
    <Box bgcolor="background.default" py={8}>
      <Container maxWidth="lg">
        <Box sx={{ 
          position: 'relative',
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { xs: 'center', lg: 'flex-start' },
          gap: 4
        }}>
          {/* Terminal */}
          <TerminalMockup />
          
          {/* Main hero content */}
          <Stack spacing={4} textAlign="center" alignItems="center" sx={{ 
            order: { xs: 2, lg: 1 },
            flex: 1,
            minWidth: 0
          }}>
            <Typography 
              variant="h1" 
              component="h1" 
              fontWeight="bold"
              sx={{ 
                textAlign: 'center',
                width: '100%'
              }}
            >
              SeaNotes
            </Typography>
            <Typography 
              variant="h3" 
              component="h2" 
              fontWeight="bold" 
              color="primary.main"
              sx={{ 
                textAlign: 'center',
                width: '100%'
              }}
            >
              Build Your SaaS Faster Than Ever
            </Typography>
            <Typography 
              variant="h6" 
              component="p" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 600, 
                mx: 'auto',
                textAlign: 'center',
                width: '100%'
              }}
            >
              Launch your SaaS product in record time with our powerful, ready-to-use template. Packed with modern technologies and essential integrations.
            </Typography>
            <CTAButtons />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;