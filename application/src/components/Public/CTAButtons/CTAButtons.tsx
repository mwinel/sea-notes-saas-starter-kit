import React from 'react';
import { Button, Stack } from '@mui/material';
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const CTAButtons = () => {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
      <Button
        component={Link}
        href="https://github.com/digitalocean/sea-notes-saas-starter-kit"
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        size="large"
        startIcon={<GitHubIcon />}
        sx={{
          backgroundColor: '#000000',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#333333',
          },
        }}
      >
        View the code
      </Button>
      <Button
        component={Link}
        href="https://cloud.digitalocean.com/apps/new?repo=https://github.com/digitalocean/sea-notes-saas-starter-kit/tree/main"
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        size="large"
        startIcon={<LaunchIcon />}
        sx={{
          backgroundColor: '#0069ff',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#0056cc',
          },
        }}
      >
        Deploy to DigitalOcean
      </Button>
    </Stack>
  );
};

export default CTAButtons;