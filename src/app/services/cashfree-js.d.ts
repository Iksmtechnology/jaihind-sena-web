declare module '@cashfreepayments/cashfree-js' {
  export interface Cashfree {
    checkout(options: {
      paymentSessionId: string;
      redirectTarget?: '_self' | '_blank' | '_modal';
    }): Promise<CheckoutResult>;
  }

  export interface CheckoutResult {
    error?: any;
    redirect?: boolean;
    paymentDetails?: {
      paymentMessage?: string;
      [key: string]: any;
    };
  }0

  interface CashfreeCheckoutOptions {
  paymentSessionId: string;
  redirectTarget: string;
  onSuccess: (result: any) => void;
  onFailure?: (result: any) => void;
  onDismiss?: () => void;
}

  export function load(options: { mode: 'sandbox' | 'production' }): Promise<Cashfree>;
}
