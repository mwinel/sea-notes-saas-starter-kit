'use client';

import React, { useState } from 'react';
import { Button, Typography, Box, Container, Stack, Card, CardContent, IconButton, Tooltip } from '@mui/material';
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
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

const Home = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('git clone https://github.com/digitalocean/sea-notes-saas-starter-kit.git\ncd sea-notes-saas-starter-kit\nnpm install\nnpm run dev');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box>
    {/* Hero Section */}
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
          <Box sx={{
            order: { xs: 1, lg: 2 },
            width: { xs: '100%', lg: 500 },
            maxWidth: '100%',
            flexShrink: 0
          }}>
            <Box sx={{
              bgcolor: '#1e1e1e',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              {/* Terminal header */}
              <Box sx={{
                bgcolor: '#2d2d2d',
                px: 2,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27ca3f' }} />
                </Box>
                <Typography variant="caption" color="grey.400" sx={{ fontSize: '0.75rem' }}>
                  Terminal
                </Typography>
              </Box>
              {/* Terminal content */}
              <Box sx={{ p: 3 }}>
                <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#00ff00', mb: 1.5, fontSize: '0.95rem' }}>
                  $ git clone https://github.com/digitalocean/sea-notes-saas-starter-kit.git
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#00ff00', mb: 1.5, fontSize: '0.95rem' }}>
                  $ cd sea-notes-saas-starter-kit
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#00ff00', mb: 1.5, fontSize: '0.95rem' }}>
                  $ npm install
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#00ff00', mb: 2, fontSize: '0.95rem' }}>
                  $ npm run dev
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                  onClick={handleCopy}
                  sx={{
                    borderColor: 'grey.600',
                    color: 'grey.300',
                    '&:hover': {
                      borderColor: 'grey.400',
                      bgcolor: 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  {copied ? 'Copied!' : 'Copy all'}
                </Button>
              </Box>
            </Box>
          </Box>
          
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
              href="/signup"
              variant="outlined"
              size="large"
              startIcon={<LaunchIcon />}
            >
              Deploy your own
            </Button>
          </Stack>
        </Stack>
        </Box>
      </Container>
    </Box>

    {/* Application Screenshot Section */}
    <Box py={8} bgcolor="background.default">
      <Container maxWidth="lg">
        <Stack spacing={6} textAlign="center">
          <Box sx={{ 
            position: 'relative',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Box sx={{ 
              bgcolor: 'background.paper', 
              borderRadius: 3, 
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              maxWidth: '100%',
              width: '100%'
            }}>
              {/* Mock application screenshot */}
              <Box sx={{
                bgcolor: '#1a1a1a',
                p: 3,
                borderBottom: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27ca3f' }} />
                <Typography variant="body2" sx={{ color: 'grey.400', ml: 2, fontFamily: 'monospace' }}>
                  SeaNotes - localhost:3000
                </Typography>
              </Box>
              
              <Box sx={{
                display: 'flex',
                minHeight: 400,
                bgcolor: '#f8f9fa'
              }}>
                {/* Sidebar */}
                <Box sx={{
                  width: 240,
                  bgcolor: 'white',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                  p: 2
                }}>
                  <Stack spacing={2}>
                    <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                      🐳 SeaNotes
                    </Typography>
                    <Box sx={{ height: 1, bgcolor: 'divider', my: 1 }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      Dashboard
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      My Notes
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Subscription
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Account
                    </Typography>
                  </Stack>
                </Box>
                
                {/* Main content */}
                <Box sx={{ flex: 1, p: 3 }}>
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h5" fontWeight="bold">
                        My Notes
                      </Typography>
                      <Button variant="contained" size="small" sx={{ bgcolor: 'primary.main' }}>
                        Add Note
                      </Button>
                    </Box>
                    
                    <Box sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                      gap: 2
                    }}>
                      {/* Note cards */}
                      {[
                        { title: 'Project Ideas', content: 'Build a SaaS starter kit...', date: '2 hours ago' },
                        { title: 'Meeting Notes', content: 'Discuss new features...', date: '1 day ago' },
                        { title: 'Todo List', content: 'Implement authentication...', date: '3 days ago' }
                      ].map((note, index) => (
                        <Card key={index} sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'grey.50' } }}>
                          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                            {note.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {note.content}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {note.date}
                          </Typography>
                        </Card>
                      ))}
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>

    {/* Features Section */}
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

    {/* CTA Section */}
    <Box py={8} bgcolor="grey.50">
      <Container maxWidth="md">
        <Stack spacing={4} textAlign="center">
          <Typography variant="h4" component="h3" fontWeight="bold">
            Ready to launch your SaaS?
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Our template provides everything you need to get your SaaS up and running quickly. Don't waste time on boilerplate - focus on what makes your product unique.
          </Typography>
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
              href="/signup"
              variant="outlined"
              size="large"
            >
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  </Box>
  );
};

export const dynamic = 'force-dynamic';
export default Home;
