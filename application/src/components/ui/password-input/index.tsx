import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '../input';

export interface PasswordInputProps extends Omit<React.ComponentProps<'input'>, 'type'> {
  showPassword?: boolean;
  onToggleVisibility?: () => void;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showPassword = false, onToggleVisibility, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(showPassword);

    const handleToggleVisibility = () => {
      const newVisibility = !isVisible;
      setIsVisible(newVisibility);
      onToggleVisibility?.();
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={isVisible ? 'text' : 'password'}
          className={cn('pr-10', className)}
          autoComplete="current-password"
          {...props}
        />
        <button
          type="button"
          onClick={handleToggleVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground/50 text-xl hover:text-foreground/70 transition-colors"
          tabIndex={-1}
        >
          {isVisible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
