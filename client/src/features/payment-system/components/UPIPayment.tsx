
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, QrCode, Shield, Clock, Zap } from 'lucide-react';
import { PaymentPlan, UPIDetails } from '../types/payment.types';
import { validateUPI } from '../utils/validation';

interface UPIPaymentProps {
  plan: PaymentPlan;
  onSubmit: (formData: UPIDetails) => void;
}

export const UPIPayment: React.FC<UPIPaymentProps> = ({ plan, onSubmit }) => {
  const [upiId, setUpiId] = useState('');
  const [selectedApp, setSelectedApp] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const upiApps = [
    { id: 'googlepay', name: 'Google Pay', color: 'bg-green-600', icon: '🔴' },
    { id: 'phonepe', name: 'PhonePe', color: 'bg-purple-600', icon: '🟣' },
    { id: 'paytm', name: 'Paytm', color: 'bg-blue-600', icon: '🔵' },
    { id: 'bhimupi', name: 'BHIM UPI', color: 'bg-orange-600', icon: '🟠' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const validation = validateUPI({ vpa: upiId });
    if (!validation.isValid) {
      setErrors({ upiId: validation.errors.vpa || 'Please enter a valid UPI ID' });
      setIsLoading(false);
      return;
    }

    setErrors({});
    
    setTimeout(() => {
      onSubmit({ vpa: upiId });
      setIsLoading(false);
    }, 1000);
  };

  const handleQRPayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      onSubmit({ qrCode: 'QR_PAYMENT' });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Payment Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Smartphone className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Pay with UPI</h3>
        <p className="text-2xl font-bold text-gray-900">₹{plan.price} <span className="text-sm font-normal text-gray-600">for {plan.name}</span></p>
      </div>

      {/* Payment Method Tabs */}
      <Tabs defaultValue="upi-id" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger 
            value="upi-id" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Smartphone className="w-4 h-4" />
            UPI ID
          </TabsTrigger>
          <TabsTrigger 
            value="qr-code"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <QrCode className="w-4 h-4" />
            QR Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upi-id" className="space-y-6 mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* UPI ID Input */}
            <div className="space-y-2">
              <Label htmlFor="upi-id" className="text-sm font-medium text-gray-700">
                Enter your UPI ID
              </Label>
              <Input
                id="upi-id"
                type="text"
                placeholder="yourname@paytm"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className={`h-12 text-lg ${errors.upiId ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-500/20`}
              />
              {errors.upiId && (
                <p className="text-sm text-red-600">{errors.upiId}</p>
              )}
            </div>

            {/* UPI Apps Grid */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Or choose your UPI app</Label>
              <div className="grid grid-cols-2 gap-3">
                {upiApps.map((app) => (
                  <Card
                    key={app.id}
                    className={`cursor-pointer border-2 transition-all duration-200 hover:shadow-md ${
                      selectedApp === app.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedApp(app.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${app.color} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
                          {app.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{app.name}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg rounded-lg transition-colors duration-200"
              disabled={isLoading || !upiId.trim()}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </div>
              ) : (
                'Proceed to Pay'
              )}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="qr-code" className="space-y-6 mt-6">
          <div className="text-center space-y-6">
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <QrCode className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm mb-4">Scan with any UPI app to pay</p>
              <p className="text-xs text-gray-500">QR code will be generated after clicking proceed</p>
            </div>
            
            <Button
              onClick={handleQRPayment}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating QR...
                </div>
              ) : (
                'Generate QR Code'
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Why Choose UPI Section */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 text-center mb-4">Why choose UPI?</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-green-900">Instant</div>
                <div className="text-green-700">24/7 payments</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-blue-900">Secure</div>
                <div className="text-blue-700">Bank-grade security</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-purple-900">Free</div>
                <div className="text-purple-700">No extra charges</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Footer */}
      <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-2">
        <Shield className="w-3 h-3" />
        <span>Your payment is secured with bank-level encryption</span>
      </div>
    </div>
  );
};
