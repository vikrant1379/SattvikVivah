
import React, { useState, useEffect } from 'react';
import { PaymentMethods } from './PaymentMethods';
import { CardPayment } from './CardPayment';
import { UPIPayment } from './UPIPayment';
import { NetBanking } from './NetBanking';
import { PaymentSummary } from './PaymentSummary';
import { PaymentSuccess } from './PaymentSuccess';
import { PaymentState, PaymentPlan } from '../types/payment.types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Lock } from 'lucide-react';

interface PaymentContainerProps {
  selectedPlan: PaymentPlan;
  onClose: () => void;
}

export const PaymentContainer: React.FC<PaymentContainerProps> = ({ selectedPlan, onClose }) => {
  const [paymentState, setPaymentState] = useState<PaymentState>({
    step: 'method',
    method: null,
    plan: selectedPlan,
    formData: {},
  });

  const updatePaymentState = (updates: Partial<PaymentState>) => {
    setPaymentState(prev => ({ ...prev, ...updates }));
  };

  const goBack = () => {
    switch (paymentState.step) {
      case 'details':
        updatePaymentState({ step: 'method', method: null });
        break;
      case 'review':
        updatePaymentState({ step: 'details' });
        break;
      default:
        onClose();
    }
  };

  const renderStep = () => {
    switch (paymentState.step) {
      case 'method':
        return (
          <PaymentMethods
            selectedPlan={selectedPlan}
            onMethodSelect={(method) => updatePaymentState({ method, step: 'details' })}
          />
        );
      case 'details':
        switch (paymentState.method) {
          case 'card':
            return (
              <CardPayment
                plan={selectedPlan}
                onSubmit={(formData) => updatePaymentState({ formData, step: 'review' })}
              />
            );
          case 'upi':
            return (
              <UPIPayment
                plan={selectedPlan}
                onSubmit={(formData) => updatePaymentState({ formData, step: 'review' })}
              />
            );
          case 'netbanking':
            return (
              <NetBanking
                plan={selectedPlan}
                onSubmit={(formData) => updatePaymentState({ formData, step: 'review' })}
              />
            );
          default:
            return null;
        }
      case 'review':
        return (
          <PaymentSummary
            paymentState={paymentState}
            onConfirm={() => updatePaymentState({ step: 'processing' })}
            onEdit={() => updatePaymentState({ step: 'details' })}
          />
        );
      case 'processing':
        return (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold">Processing Payment...</h3>
            <p className="text-gray-600">Please wait while we process your payment</p>
          </div>
        );
      case 'success':
      case 'error':
        return (
          <PaymentSuccess
            paymentState={paymentState}
            onClose={onClose}
          />
        );
      default:
        return null;
    }
  };

  // Simulate processing completion
  useEffect(() => {
    if (paymentState.step === 'processing') {
      const timer = setTimeout(() => {
        // Simulate success/failure
        const success = Math.random() > 0.1; // 90% success rate for demo
        updatePaymentState({
          step: success ? 'success' : 'error',
          transactionId: success ? `TXN${Date.now()}` : undefined,
          error: success ? undefined : 'Payment failed. Please try again.',
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [paymentState.step]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {paymentState.step !== 'method' && paymentState.step !== 'success' && paymentState.step !== 'error' && (
                <Button variant="ghost" size="sm" onClick={goBack}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <h2 className="text-xl font-semibold">Secure Payment</h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>SSL Secured</span>
            </div>
          </div>
          
          {/* Progress Indicator */}
          {paymentState.step !== 'success' && paymentState.step !== 'error' && (
            <div className="mt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  paymentState.step === 'method' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
                }`}>
                  1
                </div>
                <span className="text-gray-400">→</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  paymentState.step === 'details' ? 'bg-blue-600 text-white' : 
                  ['review', 'processing'].includes(paymentState.step) ? 'bg-green-600 text-white' : 'bg-gray-300'
                }`}>
                  2
                </div>
                <span className="text-gray-400">→</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  paymentState.step === 'review' ? 'bg-blue-600 text-white' : 
                  paymentState.step === 'processing' ? 'bg-green-600 text-white' : 'bg-gray-300'
                }`}>
                  3
                </div>
              </div>
              <div className="flex gap-4 mt-1 text-xs text-gray-600">
                <span>Method</span>
                <span className="ml-2">Details</span>
                <span className="ml-1">Review</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {renderStep()}
        </div>

        {/* Security Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>256-bit SSL encryption</span>
            </div>
            <span>|</span>
            <span>PCI DSS compliant</span>
            <span>|</span>
            <span>Your data is safe with us</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
