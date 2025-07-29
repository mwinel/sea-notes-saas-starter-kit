import React from 'react';
import Link from 'next/link';
import { Box, Container, Typography, Stack, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import DatabaseIcon from '@mui/icons-material/Storage';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SupportIcon from '@mui/icons-material/Support';
import TwitterIcon from '@mui/icons-material/Twitter';
import ForumIcon from '@mui/icons-material/Forum';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const footerSections = [
  {
    title: 'Product & Code',
    links: [
      { label: 'GitHub Repository', href: 'https://github.com/digitalocean/sea-notes-saas-starter-kit', icon: <GitHubIcon sx={{ fontSize: 16 }} /> },
      { label: 'Documentation', href: 'https://docs.digitalocean.com', icon: <MenuBookIcon sx={{ fontSize: 16 }} /> },
      { label: 'Live Demo', href: '#', icon: <LaunchIcon sx={{ fontSize: 16 }} /> },
    ],
  },
  {
    title: 'DigitalOcean Services',
    links: [
      { label: 'App Platform', href: 'https://www.digitalocean.com/products/app-platform', icon: <CloudIcon sx={{ fontSize: 16 }} /> },
      { label: 'Spaces Storage', href: 'https://www.digitalocean.com/products/spaces', icon: <StorageIcon sx={{ fontSize: 16 }} /> },
      { label: 'Managed Databases', href: 'https://www.digitalocean.com/products/managed-databases', icon: <DatabaseIcon sx={{ fontSize: 16 }} /> },
      { label: 'Gradient', href: 'https://www.digitalocean.com/products/gradientai', icon: <PsychologyIcon sx={{ fontSize: 16 }} /> },
    ],
  },
  {
    title: 'Support & Community',
    links: [
      { label: 'DigitalOcean Support', href: 'https://www.digitalocean.com/support', icon: <SupportIcon sx={{ fontSize: 16 }} /> },
      { label: 'DigitalOcean Twitter', href: 'https://twitter.com/digitalocean', icon: <TwitterIcon sx={{ fontSize: 16 }} /> },
      { label: 'Community Forum', href: 'https://www.digitalocean.com/community', icon: <ForumIcon sx={{ fontSize: 16 }} /> },
      { label: 'Status Page', href: 'https://status.digitalocean.com', icon: <MonitorHeartIcon sx={{ fontSize: 16 }} /> },
    ],
  },
];

/**
 * Footer of the application.
 * Displays sections with links organized by categories and copyright.
 */
export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        py: 6,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
            mb: 4,
          }}
        >
          {footerSections.map((section) => (
            <Box key={section.title}>
              <Typography variant="h6" fontWeight={600} sx={{ color: 'text.primary', mb: 2 }}>
                {section.title}
              </Typography>
              <Stack spacing={1.5}>
                {section.links.map((link) => (
                  <Box key={link.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ color: 'text.secondary' }}>
                      {link.icon}
                    </Box>
                    <Typography
                      component={Link}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        '&:hover': {
                          color: 'primary.main',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {link.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
        
        <Box sx={{ pt: 4, borderTop: `1px solid ${theme.palette.divider}`, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © 2025 SeaNotes. Built with ❤️ using DigitalOcean services.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
