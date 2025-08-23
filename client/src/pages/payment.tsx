import React, { useState } from 'react';
import { PaymentContainer } from '@/features/payment-system';
import { PAYMENT_PLANS } from '@/features/payment-system/constants/payment.constants';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowLeft } from 'lucide-react';
import { PaymentPlan } from '@/features/payment-system/types/payment.types';

export const PaymentPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const handlePlanSelect = (plan: PaymentPlan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Profile</span>
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Choose Your Plan</h1>
          <p className="text-gray-600">Select a membership plan to continue your spiritual journey</p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {PAYMENT_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative bg-white border transition-all duration-200 hover:shadow-md cursor-pointer ${
                plan.popular ? 'border-blue-500 ring-2 ring-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-3 py-1">Most Popular</Badge>
                </div>
              )}

              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-3">
                    <span className="text-3xl font-bold text-gray-900">₹{plan.price}</span>
                    <span className="text-gray-500 ml-1">/{plan.duration}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-sm text-gray-500">
                      <span className="line-through">₹{plan.originalPrice}</span>
                      <span className="text-green-600 ml-2 font-medium">
                        Save ₹{plan.originalPrice - plan.price}
                      </span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-6 text-sm">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-gray-500 text-xs">+{plan.features.length - 4} more features</li>
                  )}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6 text-center text-sm">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
                <span className="font-medium text-gray-900">SSL Secured</span>
                <span className="text-gray-500">256-bit encryption</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-blue-600 text-lg">₹</span>
                </div>
                <span className="font-medium text-gray-900">Money Back</span>
                <span className="text-gray-500">7-day guarantee</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-purple-600 text-lg">📞</span>
                </div>
                <span className="font-medium text-gray-900">24/7 Support</span>
                <span className="text-gray-500">Always available</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-orange-600 text-lg">⭐</span>
                </div>
                <span className="font-medium text-gray-900">Verified Users</span>
                <span className="text-gray-500">100% authentic</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Modal */}
      {showPayment && selectedPlan && (
        <PaymentContainer
          selectedPlan={selectedPlan}
          onClose={handleClosePayment}
        />
      )}
    </div>
  );
};