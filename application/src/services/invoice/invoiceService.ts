import { ServiceConfigStatus } from '../status/serviceConfigStatus';
import { ConfigurableService } from '../status/serviceConfigStatus';
import { serverConfig } from '../../settings';
import axios from 'axios';

export interface InvoiceData {
  customerName: string;
  customerEmail: string;
  planName: string;
  planDescription: string;
  amount: number;
  interval: string | null;
  features: string[];
  subscriptionId: string;
  invoiceDate: Date;
  invoiceNumber: string;
}

export interface GeneratedInvoice {
  html: string;
  text: string;
  subject: string;
}

/**
 * Invoice service that uses DigitalOcean's GenAI agent to generate professional invoices
 * and send them via email when users subscribe to plans.
 */
export class InvoiceService implements ConfigurableService {
  private static readonly serviceName = 'Invoice Service (DigitalOcean GenAI)';
  private isConfigured: boolean = false;
  private lastConnectionError: string = '';
  private description: string = 'The following features are impacted: automatic invoice generation and emailing';

  // Required config items with their corresponding env var names and descriptions
  private static requiredConfig = {
    doAgentBaseUrl: { envVar: 'DO_AGENT_BASE_URL', description: 'DigitalOcean AI Agent base URL' },
    doApiToken: { envVar: 'DO_API_TOKEN', description: 'DigitalOcean API token' },
  };

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    const missingConfig = Object.entries(InvoiceService.requiredConfig)
      .filter(([key]) => !serverConfig.Invoice?.[key as keyof typeof serverConfig.Invoice])
      .map(([, value]) => value.envVar);

    if (missingConfig.length > 0) {
      this.isConfigured = false;
      return;
    }

    this.isConfigured = true;
  }

  /**
   * Generates a professional invoice using DigitalOcean's GenAI agent
   */
  async generateInvoice(invoiceData: InvoiceData): Promise<GeneratedInvoice> {
    if (!this.isConfigured) {
      throw new Error('Invoice service not configured. Check configuration.');
    }

    const agentBaseUrl = serverConfig.Invoice!.doAgentBaseUrl!;
    const apiToken = serverConfig.Invoice!.doApiToken!;
    const agentEndpoint = `${agentBaseUrl}/api/v1/chat/completions`;

    const prompt = this.buildInvoicePrompt(invoiceData);

    try {
      const response = await axios.post(
        agentEndpoint,
        {
          model: 'claude-3.5-sonnet',
          messages: [
            {
              role: 'system',
              content: `You are a professional invoice generator. You create beautiful, professional invoices in HTML format that are suitable for email delivery. 
              Always include proper styling, company branding, and all necessary invoice details. 
              Return your response as a JSON object with three fields: html (the full HTML invoice), text (plain text version), and subject (email subject line).`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.1,
          max_tokens: 2048
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiToken}`
          }
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      
      // Parse the AI response to extract JSON
      try {
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return {
            html: parsed.html,
            text: parsed.text,
            subject: parsed.subject
          };
        } else {
          throw new Error('No JSON found in AI response');
        }
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        // Fallback to generating a basic invoice
        return this.generateFallbackInvoice(invoiceData);
      }
    } catch (error) {
      console.error('Error generating invoice with AI:', error);
      // Fallback to generating a basic invoice
      return this.generateFallbackInvoice(invoiceData);
    }
  }

  private buildInvoicePrompt(invoiceData: InvoiceData): string {
    return `Generate a professional invoice for the following subscription:

Customer Information:
- Name: ${invoiceData.customerName}
- Email: ${invoiceData.customerEmail}

Plan Details:
- Plan Name: ${invoiceData.planName}
- Description: ${invoiceData.planDescription}
- Amount: $${invoiceData.amount}
- Billing Interval: ${invoiceData.interval || 'one-time'}
- Features: ${invoiceData.features.join(', ')}

Invoice Details:
- Invoice Number: ${invoiceData.invoiceNumber}
- Invoice Date: ${invoiceData.invoiceDate.toLocaleDateString()}
- Subscription ID: ${invoiceData.subscriptionId}

Please create a professional invoice with:
1. Company header with "DO Starter Kit" branding
2. Customer and invoice details clearly displayed
3. Itemized breakdown of the subscription
4. Professional styling with blue color scheme (#0061EB)
5. Mobile-responsive design
6. Clear call-to-action for payment or support

IMPORTANT: For the Contact Support button, use exactly this HTML structure:
<a href="mailto:support@dostarterkit.com" class="contact-button">Contact Support</a>

Do NOT add any inline styles to the contact-button class. The styling will be handled by CSS injection.

Return the response as a JSON object with html, text, and subject fields.`;
  }

  private generateFallbackInvoice(invoiceData: InvoiceData): GeneratedInvoice {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice - ${invoiceData.invoiceNumber}</title>
        <style>
          * { box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; 
            margin: 0; 
            padding: 10px; 
            background-color: #f5f5f5; 
            line-height: 1.6;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 8px; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
            overflow: hidden;
          }
          .header { 
            background: #0061EB; 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0 0 10px 0; 
            font-size: 28px; 
            font-weight: 600;
          }
          .header h2 { 
            margin: 0; 
            font-size: 20px; 
            font-weight: 400;
            opacity: 0.9;
          }
          .content { 
            padding: 30px 20px; 
          }
          .invoice-details { 
            display: flex; 
            flex-direction: column;
            gap: 20px;
            margin-bottom: 30px; 
          }
          @media (min-width: 600px) {
            .invoice-details { 
              flex-direction: row; 
              justify-content: space-between; 
            }
          }
          .customer-info, .invoice-info { 
            flex: 1; 
          }
          .invoice-info { 
            text-align: left; 
          }
          @media (min-width: 600px) {
            .invoice-info { 
              text-align: right; 
            }
          }
          .customer-info h3, .invoice-info h3 { 
            margin: 0 0 10px 0; 
            font-size: 16px; 
            color: #333;
          }
          .customer-info p, .invoice-info p { 
            margin: 0; 
            font-size: 14px; 
            color: #666;
          }
          .item { 
            border-bottom: 1px solid #eee; 
            padding: 20px 0; 
          }
          .item h3 { 
            margin: 0 0 10px 0; 
            font-size: 18px; 
            color: #333;
          }
          .item p { 
            margin: 0 0 15px 0; 
            color: #666;
          }
          .total { 
            font-size: 18px; 
            font-weight: bold; 
            margin-top: 20px; 
            padding-top: 20px; 
            border-top: 2px solid #0061EB; 
            color: #333;
          }
          .features { 
            margin-top: 15px; 
          }
          .features strong { 
            display: block; 
            margin-bottom: 8px; 
            color: #333;
          }
          .features ul { 
            margin: 5px 0; 
            padding-left: 20px; 
            color: #666;
          }
          .features li { 
            margin-bottom: 4px; 
          }
          .support-section { 
            margin-top: 30px; 
            text-align: center; 
            padding: 20px; 
            background-color: #f8f9fa; 
            border-radius: 8px;
          }
          .support-section p { 
            margin: 0 0 15px 0; 
            color: #666; 
            font-size: 14px;
          }
          .contact-button { 
            display: inline-block; 
            background: #0061EB; 
            color: white !important; 
            text-decoration: none; 
            padding: 12px 24px; 
            border-radius: 6px; 
            font-weight: 500; 
            font-size: 14px; 
            transition: background-color 0.2s;
            min-width: 140px;
            text-align: center;
            border: none;
            cursor: pointer;
          }
          .contact-button:hover { 
            background: #0051c3; 
          }
          .contact-button:active { 
            background: #004094; 
          }
          .footer { 
            margin-top: 20px; 
            text-align: center; 
            color: #666; 
            font-size: 12px;
          }
          .footer p { 
            margin: 5px 0; 
          }
          @media (max-width: 480px) {
            body { padding: 5px; }
            .header { padding: 20px 15px; }
            .header h1 { font-size: 24px; }
            .header h2 { font-size: 18px; }
            .content { padding: 20px 15px; }
            .contact-button { 
              display: block !important; 
              width: 100% !important; 
              text-align: center !important; 
              margin-top: 10px !important;
              box-sizing: border-box !important;
            }
            .support-section {
              padding: 15px !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>DO Starter Kit</h1>
            <h2>Invoice</h2>
          </div>
          <div class="content">
            <div class="invoice-details">
              <div class="customer-info">
                <h3>Bill To:</h3>
                <p><strong>${invoiceData.customerName}</strong><br>
                ${invoiceData.customerEmail}</p>
              </div>
              <div class="invoice-info">
                <h3>Invoice Details:</h3>
                <p><strong>Invoice #:</strong> ${invoiceData.invoiceNumber}<br>
                <strong>Date:</strong> ${invoiceData.invoiceDate.toLocaleDateString()}<br>
                <strong>Subscription ID:</strong> ${invoiceData.subscriptionId}</p>
              </div>
            </div>
            
            <div class="item">
              <h3>${invoiceData.planName}</h3>
              <p>${invoiceData.planDescription}</p>
              <div class="features">
                <strong>Features included:</strong>
                <ul>
                  ${invoiceData.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
              </div>
              <div class="total">
                <strong>Total: $${invoiceData.amount}</strong>
                ${invoiceData.interval ? `<br><small>Billed ${invoiceData.interval}ly</small>` : ''}
              </div>
            </div>
            
            <div class="support-section">
              <p>Thank you for your subscription!</p>
              <p>If you have any questions about this invoice, please contact our support team.</p>
              <a href="mailto:support@dostarterkit.com" class="contact-button">
                Contact Support
              </a>
            </div>
            
            <div class="footer">
              <p>DO Starter Kit - Professional Development Tools</p>
              <p>This is an automatically generated invoice.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
INVOICE - ${invoiceData.invoiceNumber}

DO Starter Kit
Invoice Date: ${invoiceData.invoiceDate.toLocaleDateString()}

Bill To:
${invoiceData.customerName}
${invoiceData.customerEmail}

Subscription ID: ${invoiceData.subscriptionId}

ITEM:
${invoiceData.planName}
${invoiceData.planDescription}

Features included:
${invoiceData.features.map(feature => `- ${feature}`).join('\n')}

TOTAL: $${invoiceData.amount}
${invoiceData.interval ? `Billed ${invoiceData.interval}ly` : ''}

Thank you for your subscription!
If you have any questions, please contact our support team at support@dostarterkit.com
    `;

    return {
      html,
      text,
      subject: `Invoice #${invoiceData.invoiceNumber} - ${invoiceData.planName} Subscription`
    };
  }

  /**
   * Checks if the invoice service is properly configured and accessible.
   */
  async checkConnection(): Promise<boolean> {
    if (!this.isConfigured) {
      this.lastConnectionError = 'Service not configured';
      return false;
    }

    try {
      const agentBaseUrl = serverConfig.Invoice!.doAgentBaseUrl!;
      const apiToken = serverConfig.Invoice!.doApiToken!;
      const agentEndpoint = `${agentBaseUrl}/api/v1/chat/completions`;

      // Test connection with a simple request
      await axios.post(
        agentEndpoint,
        {
          model: 'claude-3.5-sonnet',
          messages: [
            {
              role: 'user',
              content: 'Hello, please respond with "OK" if you can receive this message.'
            }
          ],
          temperature: 0.0,
          max_tokens: 10
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiToken}`
          }
        }
      );

      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.lastConnectionError = `Connection error: ${errorMsg}`;
      return false;
    }
  }

  /**
   * Checks if the invoice service configuration is valid and tests connection when configuration is complete.
   */
  async checkConfiguration(): Promise<ServiceConfigStatus> {
    const missingConfig = Object.entries(InvoiceService.requiredConfig)
      .filter(([key]) => !serverConfig.Invoice?.[key as keyof typeof serverConfig.Invoice])
      .map(([, value]) => value.envVar);

    if (missingConfig.length > 0) {
      return {
        name: InvoiceService.serviceName,
        configured: false,
        connected: undefined,
        configToReview: missingConfig,
        error: 'Configuration missing',
        description: this.description,
      };
    }

    const isConnected = await this.checkConnection();
    if (!isConnected) {
      return {
        name: InvoiceService.serviceName,
        configured: true,
        connected: false,
        configToReview: Object.values(InvoiceService.requiredConfig).map(
          (config) => config.envVar
        ),
        error: this.lastConnectionError || 'Connection failed',
        description: this.description,
      };
    }

    return {
      name: InvoiceService.serviceName,
      configured: true,
      connected: true,
    };
  }

  isRequired(): boolean {
    return false; // Invoice service is optional
  }
}