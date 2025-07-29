import React from 'react';
import { Typography, Box, Container, Stack, Card, CardContent } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import PaymentIcon from '@mui/icons-material/Payment';
import SecurityIcon from '@mui/icons-material/Security';
import CloudIcon from '@mui/icons-material/Cloud';
import EmailIcon from '@mui/icons-material/Email';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const features = [
  {
    icon: <RocketLaunchIcon sx={{ fontSize: 40, color: '#795548' }} />,
    title: 'One-Click Deployment',
    description: 'Deploy directly to DigitalOcean App Platform with automated setup and configuration.'
  },
  {
    icon: <CloudIcon sx={{ fontSize: 40, color: '#00bcd4' }} />,
    title: 'DigitalOcean Spaces',
    description: 'File storage and CDN integration using DigitalOcean Spaces.'
  },
  {
    icon: <PsychologyIcon sx={{ fontSize: 40, color: '#e91e63' }} />,
    title: 'DigitalOcean Gradient',
    description: 'AI-powered invoice generation using DigitalOcean\'s Serverless Inference API.'
  },
  {
    icon: <StorageIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
    title: 'PostgreSQL and Prisma ORM',
    description: 'Database used for efficient data management and scalability.'
  },
  {
    icon: <PaymentIcon sx={{ fontSize: 40, color: '#ff9800' }} />,
    title: 'Stripe Integration',
    description: 'Used for subscription management.'
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40, color: '#f44336' }} />,
    title: 'NextAuth Authentication',
    description: 'Built-in authentication system for better user management.'
  },
  {
    icon: <EmailIcon sx={{ fontSize: 40, color: '#9c27b0' }} />,
    title: 'Resend Email Service',
    description: 'Email service used for sending authentication emails as well as invoices.'
  },
  {
    icon: <AdminPanelSettingsIcon sx={{ fontSize: 40, color: '#607d8b' }} />,
    title: 'Admin Dashboard',
    description: 'Complete admin interface for managing users, subscriptions, and system monitoring.'
  },
  {
    icon: <MonitorHeartIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
    title: 'System Health Monitoring',
    description: 'Real-time monitoring of all services including database, email, storage, and AI services.'
  }
];

const FeatureCards = () => {
  return (
    <Box py={8} bgcolor="background.default">
      <Container maxWidth="lg">
        <Stack spacing={6}>
          <Typography variant="h4" component="h3" fontWeight="bold" textAlign="center">
            What's included
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            {features.map((feature, idx) => (
              <Card key={idx} sx={{ height: '100%' }}>
                <CardContent>
                  <Stack spacing={3} alignItems="center" textAlign="center">
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      bgcolor: 'grey.50',
                      border: '1px solid',
                      borderColor: 'divider'
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h4" fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default FeatureCards;