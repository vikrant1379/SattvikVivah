
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Smartphone, Building2 } from 'lucide-react';
import { PaymentMethod, PaymentPlan } from '../types/payment.types';

interface PaymentMethodsProps {
  selectedPlan: PaymentPlan;
  onMethodSelect: (method: PaymentMethod) => void;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({ selectedPlan, onMethodSelect }) => {
  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      title: 'Credit/Debit Card',
      description: 'Visa, MasterCard, RuPay',
      icon: CreditCard,
    },
    {
      id: 'upi' as PaymentMethod,
      title: 'UPI',
      description: 'GPay, PhonePe, Paytm',
      icon: Smartphone,
    },
    {
      id: 'netbanking' as PaymentMethod,
      title: 'Net Banking',
      description: 'All major banks',
      icon: Building2,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-gray-900">{selectedPlan.name}</h3>
            <p className="text-sm text-gray-600">{selectedPlan.duration}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900">₹{selectedPlan.price}</div>
            {selectedPlan.originalPrice && (
              <div className="text-sm text-gray-500 line-through">₹{selectedPlan.originalPrice}</div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Select payment method</h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <Card
              key={method.id}
              className="cursor-pointer border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-colors"
              onClick={() => onMethodSelect(method.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <method.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{method.title}</h4>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  <div className="w-4 h-4 border border-gray-300 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
