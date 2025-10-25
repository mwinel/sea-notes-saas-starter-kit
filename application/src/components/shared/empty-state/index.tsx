import * as React from 'react';
import { IconNotesOff, IconPlus } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { CreateNote } from '@/components/notes/create-note';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  titleClassName?: string;
  description: string;
  action?: {
    label: string;
    onClick?: () => void;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    loading?: boolean;
  };
}

export function EmptyState({
  icon = <IconNotesOff className="size-10 text-muted-foreground" />,
  title,
  titleClassName,
  description,
  action,
}: EmptyStateProps) {
  const createNoteButtonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] w-full">
        <div className="text-center bg-muted/5 mx-auto py-24 w-full max-w-3xl rounded-lg border border-dashed">
          {icon && <div className="flex justify-center">{icon}</div>}
          <h3 className={`mt-2 text-sm font-semibold ${titleClassName || ''}`}>{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          {action && (
            <div className="mt-6">
              <Button
                size="sm"
                variant={action.variant}
                onClick={action.onClick || (() => createNoteButtonRef.current?.click())}
                disabled={action.loading}
              >
                {action.loading ? <Spinner /> : <IconPlus className="size-4" />}
                {action.label}
              </Button>
            </div>
          )}
        </div>
      </div>
      <CreateNote />
    </>
  );
}
