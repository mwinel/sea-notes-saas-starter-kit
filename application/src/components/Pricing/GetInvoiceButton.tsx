'use client';

import React, { useState } from 'react';
import { Button, Alert, Snackbar } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface GetInvoiceButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}

/**
 * GetInvoiceButton component that allows authenticated users to generate and receive
 * an invoice for their current subscription plan via email.
 */
export default function GetInvoiceButton({ 
  variant = 'contained',
  fullWidth = false,
  size = 'medium'
}: GetInvoiceButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleGetInvoice = async () => {
    if (status === 'loading') return;

    if (!session) {
      // Redirect to login if not authenticated
      router.push('/login');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/billing/generate-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: data.message || 'Invoice sent successfully!'
        });
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to generate invoice'
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Network error. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setMessage(null);
  };

  return (
    <>
      <Button
        variant={variant}
        fullWidth={fullWidth}
        size={size}
        onClick={handleGetInvoice}
        disabled={loading || status === 'loading'}
        sx={{
          mt: 2,
          bgcolor: variant === 'contained' ? 'primary.main' : 'transparent',
          color: variant === 'contained' ? 'white' : 'primary.main',
          '&:hover': { 
            bgcolor: variant === 'contained' ? 'primary.dark' : 'primary.light',
            color: variant === 'contained' ? 'white' : 'primary.dark'
          },
        }}
      >
        {loading ? 'Generating Invoice...' : 'Email Latest Invoice'}
      </Button>

      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={message?.type} 
          sx={{ width: '100%' }}
        >
          {message?.text}
        </Alert>
      </Snackbar>
    </>
  );
} 