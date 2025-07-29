'use client';

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

const TerminalMockup = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('git clone https://github.com/digitalocean/sea-notes-saas-starter-kit.git\ncd sea-notes-saas-starter-kit\nnpm install\nnpm run dev');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API or when permissions are denied
      const textArea = document.createElement('textarea');
      textArea.value = 'git clone https://github.com/digitalocean/sea-notes-saas-starter-kit.git\ncd sea-notes-saas-starter-kit\nnpm install\nnpm run dev';
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <Box sx={{
      order: { xs: 1, lg: 2 },
      width: { xs: '100%', lg: 500 },
      maxWidth: '100%',
      flexShrink: 0
    }}>
      <Box sx={{
        bgcolor: 'white',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Terminal header */}
        <Box sx={{
          bgcolor: '#f5f5f5',
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
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            Terminal
          </Typography>
        </Box>
        {/* Terminal content */}
        <Box sx={{ p: 3 }}>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'text.primary', mb: 1.5, fontSize: '0.95rem' }}>
            $ git clone https://github.com/digitalocean/sea-notes-saas-starter-kit.git
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'text.primary', mb: 1.5, fontSize: '0.95rem' }}>
            $ cd sea-notes-saas-starter-kit
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'text.primary', mb: 1.5, fontSize: '0.95rem' }}>
            $ npm install
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'text.primary', mb: 2, fontSize: '0.95rem' }}>
            $ npm run dev
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
            onClick={handleCopy}
            sx={{
              borderColor: 'grey.400',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'primary.main',
                color: 'white'
              }
            }}
          >
            {copied ? 'Copied!' : 'Copy all'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TerminalMockup;