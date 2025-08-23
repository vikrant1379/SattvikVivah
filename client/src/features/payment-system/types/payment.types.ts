
export type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet';

export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  features: string[];
  duration: string;
  popular?: boolean;
}

export interface PaymentState {
  step: 'method' | 'details' | 'review' | 'processing' | 'success' | 'error';
  method: PaymentMethod | null;
  plan: PaymentPlan | null;
  formData: any;
  transactionId?: string;
  error?: string;
}

export interface CardDetails {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}

export interface UPIDetails {
  vpa?: string;
  qrCode?: string;
}

export interface NetBankingDetails {
  bank: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
  redirectUrl?: string;
}
