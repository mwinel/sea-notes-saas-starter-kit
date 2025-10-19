import { IconExclamationCircleFilled } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export interface ErrorStateProps {
  icon?: React.ReactNode;
  title: string;
  titleClassName?: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    loading?: boolean;
  };
}

export function ErrorState({
  icon = <IconExclamationCircleFilled className="size-10 text-muted-foreground" />,
  title,
  titleClassName,
  description,
  action,
}: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] w-full">
      <div className="text-center">
        {icon && <div className="flex justify-center">{icon}</div>}
        <h3 className={`mt-2 text-sm font-semibold ${titleClassName || ''}`}>{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        {action && (
          <div className="mt-6">
            <Button
              size="sm"
              variant={action.variant}
              onClick={action.onClick}
              disabled={action.loading}
            >
              {action.loading && <Spinner />}
              {action.label}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
