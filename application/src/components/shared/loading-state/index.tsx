import React from 'react';
import { Spinner } from '@/components/ui/spinner';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message = 'Loading...', className = '' }: LoadingStateProps) {
  return (
    <div
      className={`flex items-center justify-center min-h-[calc(100vh-10rem)] w-full ${className}`}
    >
      <div className="text-center mx-auto py-24 w-full max-w-3xl">
        <div className="flex justify-center">
          <Spinner aria-label="Loading" className="size-7" />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
