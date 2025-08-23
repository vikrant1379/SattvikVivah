
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Edit, CreditCard, Smartphone, Building2, Star, Shield, Clock, Headphones } from 'lucide-react';
import { PaymentState } from '../types/payment.types';

interface PaymentSummaryProps {
  paymentState: PaymentState;
  onConfirm: () => void;
  onEdit: () => void;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({ paymentState, onConfirm, onEdit }) => {
  const { method, plan, formData } = paymentState;

  const getMethodIcon = () => {
    switch (method) {
      case 'card': return CreditCard;
      case 'upi': return Smartphone;
      case 'netbanking': return Building2;
      default: return CreditCard;
    }
  };

  const getMethodDetails = () => {
    switch (method) {
      case 'card':
        return `Card ending in ${formData.number?.slice(-4) || '****'}`;
      case 'upi':
        return formData.vpa || 'UPI QR Code Payment';
      case 'netbanking':
        return `Net Banking - ${formData.bank || 'Selected Bank'}`;
      default:
        return 'Payment Method';
    }
  };

  const MethodIcon = getMethodIcon();
  const tax = Math.round(plan.price * 0.18); // 18% GST
  const totalAmount = plan.price + tax;
  const savings = plan.originalPrice ? plan.originalPrice - plan.price : 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold">Review Your Order</h3>
        <p className="text-gray-600">Please review your payment details before confirming</p>
      </div>

      {/* Plan Details */}
      <Card className="border-blue-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-lg font-semibold flex items-center gap-2">
                {plan.name}
                {plan.popular && (
                  <Badge className="bg-orange-100 text-orange-800">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                )}
              </h4>
              <p className="text-gray-600">{plan.duration}</p>
            </div>
            {savings > 0 && (
              <div className="text-right">
                <div className="text-sm text-green-600 font-medium">
                  Save ₹{savings}
                </div>
                <div className="text-xs text-gray-500 line-through">
                  ₹{plan.originalPrice}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2 text-sm">
            {plan.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-700">
                <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-green-600" fill="currentColor" viewBox="0 0 8 8">
                    <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
                  </svg>
                </div>
                <span>{feature}</span>
              </div>
            ))}
            {plan.features.length > 4 && (
              <div className="text-xs text-gray-500">
                +{plan.features.length - 4} more features
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MethodIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Payment Method</h4>
                <p className="text-sm text-gray-600">{getMethodDetails()}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Price Breakdown */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-medium mb-4">Price Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Plan Amount</span>
              <span>₹{plan.price}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>GST (18%)</span>
              <span>₹{tax}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-₹{savings}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits Reminder */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <h4 className="font-medium text-green-900 mb-3">What you get with this plan:</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="font-medium text-green-900">Verified Profiles</div>
              <div className="text-green-700">100% authentic</div>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="font-medium text-green-900">Instant Access</div>
              <div className="text-green-700">Activate immediately</div>
            </div>
            <div className="text-center">
              <Headphones className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="font-medium text-green-900">24/7 Support</div>
              <div className="text-green-700">Always here to help</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms & Conditions */}
      <div className="text-xs text-gray-600 bg-gray-50 p-4 rounded-lg">
        <p>
          By confirming this payment, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
          Your subscription will be activated immediately upon successful payment.
          Refunds are available as per our{' '}
          <a href="#" className="text-blue-600 hover:underline">refund policy</a>.
        </p>
      </div>

      <Button onClick={onConfirm} className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
        Confirm Payment of ₹{totalAmount}
      </Button>
    </div>
  );
};
