import React from 'react';
import { Typography, Box, Container, Stack } from '@mui/material';
import CTAButtons from 'components/Public/CTAButtons/CTAButtons';
import { DIMENSIONS } from 'constants/landing';

const CTASection = () => {
  return (
    <Box py={DIMENSIONS.spacing.section} bgcolor="grey.50">
      <Container maxWidth="md">
        <Stack spacing={DIMENSIONS.spacing.container} textAlign="center">
          <Typography variant="h4" component="h3" fontWeight="bold">
            Ready to launch your SaaS?
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Our template provides everything you need to get your SaaS up and running quickly. Don't waste time on boilerplate - focus on what makes your product unique.
          </Typography>
          <CTAButtons />
        </Stack>
      </Container>
    </Box>
  );
};

export default CTASection;