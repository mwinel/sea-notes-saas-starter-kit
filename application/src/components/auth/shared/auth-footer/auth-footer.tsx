import { FieldDescription } from '@/components/ui/field';

/**
 * AuthFooter Component
 * 
 * Displays footer text with links to Terms of Service and Privacy Policy.
 * Used across all authentication forms to maintain consistent legal compliance messaging.
 */
export function AuthFooter() {
  return (
    <FieldDescription className="px-6 text-center">
      By clicking continue, you agree to our <a href="/terms">Terms of Service</a> and{' '}
      <a href="/privacy">Privacy Policy</a>.
    </FieldDescription>
  );
}
