import { ServiceConfigStatus, ConfigurableService } from '../status/serviceConfigStatus';

export interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

/**
 * Abstract base class for all email providers.
 * Provides a common interface for email operations across different email services.
 */
export abstract class EmailService implements ConfigurableService {
  abstract sendReactEmail(
    to: string,
    subject: string,
    contentComponent: React.ReactNode,
    attachments?: EmailAttachment[]
  ): Promise<void>;

  abstract checkConnection(): Promise<boolean>;

  abstract checkConfiguration(): Promise<ServiceConfigStatus>;

  abstract isEmailEnabled(): boolean;

  isRequired(): boolean {
    return true;
  }
}
