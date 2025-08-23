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
import { ArrowLeft, X, Shield } from 'lucide-react';

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

  const getStepTitle = () => {
    switch (paymentState.step) {
      case 'method': return 'Payment Method';
      case 'details': return 'Payment Details';
      case 'review': return 'Review Order';
      case 'processing': return 'Processing Payment';
      case 'success': return 'Payment Successful';
      case 'error': return 'Payment Failed';
      default: return 'Payment';
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
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Processing your payment...</h3>
            <p className="text-gray-600">Please do not close this window</p>
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
        const success = Math.random() > 0.1;
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
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {paymentState.step !== 'method' && paymentState.step !== 'success' && paymentState.step !== 'error' && (
              <Button variant="ghost" size="sm" onClick={goBack} className="p-1">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <h2 className="text-lg font-medium text-gray-900">{getStepTitle()}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderStep()}
        </div>

        {/* Security Footer */}
        {paymentState.step !== 'success' && paymentState.step !== 'error' && (
          <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
              <Shield className="w-3 h-3" />
              <span>Secured by 256-bit SSL encryption</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};