
import React, { useState } from 'react';
import { PaymentContainer } from '@/features/payment-system';
import { PAYMENT_PLANS } from '@/features/payment-system/constants/payment.constants';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find your spiritual life partner with our premium features. 
            All plans include verified profiles and 24/7 support.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {PAYMENT_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular ? 'border-blue-500 border-2 scale-105' : 'hover:scale-105'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-2 text-sm font-medium">
                  <Star className="inline w-4 h-4 mr-1" />
                  Most Popular Choice
                </div>
              )}
              
              <CardContent className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-500 line-through mr-2">
                        ₹{plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-blue-600">₹{plan.price}</span>
                    <span className="text-gray-600 ml-2">/ {plan.duration}</span>
                  </div>
                  {plan.originalPrice && (
                    <Badge className="bg-green-100 text-green-800">
                      Save ₹{plan.originalPrice - plan.price}
                    </Badge>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full h-12 text-lg ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Why Choose SattvikVivah?</h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-semibold mb-2">100% Verified</h3>
                <p className="text-gray-600 text-sm">All profiles are manually verified</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="font-semibold mb-2">Spiritual Matching</h3>
                <p className="text-gray-600 text-sm">Advanced compatibility algorithm</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="font-semibold mb-2">Success Stories</h3>
                <p className="text-gray-600 text-sm">10,000+ happy couples</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600 text-sm">Always here to help you</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Is payment secure?</h3>
                <p className="text-gray-600 text-sm">Yes, we use 256-bit SSL encryption and are PCI DSS compliant.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-600 text-sm">Yes, you can cancel your subscription at any time from your account.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600 text-sm">We accept all major cards, UPI, net banking, and digital wallets.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-gray-600 text-sm">Yes, we offer a 7-day money-back guarantee for all plans.</p>
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
