
import { PaymentResponse, CardDetails, UPIDetails, NetBankingDetails, PaymentPlan } from '../types/payment.types';

class PaymentService {
  private baseUrl = '/api/payments';

  async initiateCardPayment(cardDetails: CardDetails, plan: PaymentPlan): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/card`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardDetails: {
            // Never send actual card details - use tokenization
            token: await this.tokenizeCard(cardDetails),
          },
          plan,
          amount: plan.price,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: 'Payment processing failed. Please try again.',
      };
    }
  }

  async initiateUPIPayment(upiDetails: UPIDetails, plan: PaymentPlan): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/upi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          upiDetails,
          plan,
          amount: plan.price,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: 'UPI payment failed. Please try again.',
      };
    }
  }

  async initiateNetBanking(bankDetails: NetBankingDetails, plan: PaymentPlan): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/netbanking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bankDetails,
          plan,
          amount: plan.price,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: 'Net banking payment failed. Please try again.',
      };
    }
  }

  async generateUPIQR(amount: number, transactionId: string): Promise<string> {
    // In a real implementation, this would generate a UPI QR code
    return `upi://pay?pa=merchant@paytm&pn=SattvikVivah&am=${amount}&tr=${transactionId}&tn=SattvikVivah Payment`;
  }

  private async tokenizeCard(cardDetails: CardDetails): Promise<string> {
    // In a real implementation, this would call a tokenization service
    // Never store actual card details
    return `token_${Date.now()}`;
  }

  async verifyPayment(transactionId: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/verify/${transactionId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: 'Payment verification failed.',
      };
    }
  }
}

export const paymentService = new PaymentService();
