
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Smartphone, Building2, Wallet, Star } from 'lucide-react';
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
      description: 'Visa, Mastercard, Rupay, Amex',
      icon: CreditCard,
      popular: true,
    },
    {
      id: 'upi' as PaymentMethod,
      title: 'UPI',
      description: 'GPay, PhonePe, Paytm, BHIM',
      icon: Smartphone,
      popular: true,
    },
    {
      id: 'netbanking' as PaymentMethod,
      title: 'Net Banking',
      description: 'All major Indian banks',
      icon: Building2,
      popular: false,
    },
    {
      id: 'wallet' as PaymentMethod,
      title: 'Digital Wallets',
      description: 'Paytm, Amazon Pay, etc.',
      icon: Wallet,
      popular: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Plan Summary */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">{selectedPlan.name}</h3>
              <p className="text-sm text-blue-700">{selectedPlan.duration}</p>
              <div className="mt-2">
                {selectedPlan.originalPrice && (
                  <span className="text-sm text-gray-500 line-through mr-2">
                    ₹{selectedPlan.originalPrice}
                  </span>
                )}
                <span className="text-2xl font-bold text-blue-900">₹{selectedPlan.price}</span>
              </div>
            </div>
            {selectedPlan.popular && (
              <Badge className="bg-orange-100 text-orange-800">
                <Star className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
        <div className="grid gap-4">
          {paymentMethods.map((method) => (
            <Card
              key={method.id}
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
              onClick={() => onMethodSelect(method.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <method.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{method.title}</h4>
                        {method.popular && (
                          <Badge variant="secondary" className="text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Select
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Security Note */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-green-900 mb-1">100% Secure Payment</h4>
            <p className="text-sm text-green-700">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
