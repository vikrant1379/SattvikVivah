
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, QrCode } from 'lucide-react';
import { PaymentPlan, UPIDetails } from '../types/payment.types';
import { validateUPI } from '../utils/validation';
import { UPI_APPS } from '../constants/payment.constants';

interface UPIPaymentProps {
  plan: PaymentPlan;
  onSubmit: (formData: UPIDetails) => void;
}

export const UPIPayment: React.FC<UPIPaymentProps> = ({ plan, onSubmit }) => {
  const [activeTab, setActiveTab] = useState('vpa');
  const [vpa, setVpa] = useState('');
  const [error, setError] = useState('');

  const handleVPASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUPI(vpa)) {
      setError('Please enter a valid UPI ID');
      return;
    }

    onSubmit({ vpa });
  };

  const handleQRSubmit = () => {
    onSubmit({ qrCode: `upi://pay?pa=merchant@paytm&pn=SattvikVivah&am=${plan.price}&tn=Payment for ${plan.name}` });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-2" />
        <h3 className="text-xl font-semibold">Pay with UPI</h3>
        <p className="text-gray-600">Pay ₹{plan.price} for {plan.name}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vpa">UPI ID</TabsTrigger>
          <TabsTrigger value="qr">QR Code</TabsTrigger>
        </TabsList>

        <TabsContent value="vpa" className="space-y-4">
          <form onSubmit={handleVPASubmit} className="space-y-4">
            <div>
              <Label htmlFor="upiId">Enter your UPI ID</Label>
              <Input
                id="upiId"
                type="text"
                placeholder="yourname@paytm"
                value={vpa}
                onChange={(e) => {
                  setVpa(e.target.value);
                  if (error) setError('');
                }}
                className={error ? 'border-red-500' : ''}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {UPI_APPS.map((app) => (
                <Button
                  key={app.id}
                  type="button"
                  variant="outline"
                  className="p-3 h-auto"
                  onClick={() => setVpa(vpa || `${app.id}@user`)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{app.icon}</span>
                    <span className="text-sm">{app.name}</span>
                  </div>
                </Button>
              ))}
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Proceed to Review
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="qr" className="space-y-4">
          <div className="text-center">
            <Card className="p-8 mx-auto max-w-sm">
              <CardContent className="p-0">
                <QrCode className="w-32 h-32 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600">
                  Scan this QR code with any UPI app
                </p>
              </CardContent>
            </Card>
            
            <div className="mt-6 space-y-3">
              <p className="text-sm text-gray-600">
                Open any UPI app and scan the QR code to pay ₹{plan.price}
              </p>
              <div className="flex justify-center gap-2">
                {UPI_APPS.map((app) => (
                  <div key={app.id} className="text-center">
                    <div className="text-2xl">{app.icon}</div>
                    <div className="text-xs text-gray-600">{app.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleQRSubmit} 
              className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
            >
              Generate QR Code & Proceed
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="text-center">
            <h4 className="font-medium text-green-900 mb-2">Why choose UPI?</h4>
            <div className="grid grid-cols-3 gap-4 text-sm text-green-700">
              <div>
                <div className="font-medium">Instant</div>
                <div>24/7 payments</div>
              </div>
              <div>
                <div className="font-medium">Secure</div>
                <div>Bank-grade security</div>
              </div>
              <div>
                <div className="font-medium">Free</div>
                <div>No extra charges</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
