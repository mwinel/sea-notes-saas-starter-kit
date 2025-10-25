import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * AuthWrapper Component
 * 
 * Wrapper component that provides consistent styling and layout for authentication forms.
 * Displays a card with title, description, and content area for form elements.
 */
interface AuthWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function AuthWrapper({ title, description, children, className }: AuthWrapperProps) {
  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
