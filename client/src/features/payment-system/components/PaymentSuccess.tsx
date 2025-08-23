
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, Download, Mail, Home, RefreshCw } from 'lucide-react';
import { PaymentState } from '../types/payment.types';

interface PaymentSuccessProps {
  paymentState: PaymentState;
  onClose: () => void;
}

export const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ paymentState, onClose }) => {
  const isSuccess = paymentState.step === 'success';
  const { plan, transactionId, error } = paymentState;

  const handleDownloadReceipt = () => {
    // Generate and download receipt
    const receiptData = {
      transactionId,
      plan: plan?.name,
      amount: plan?.price,
      date: new Date().toLocaleString(),
      status: 'Success'
    };
    
    const dataStr = JSON.stringify(receiptData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${transactionId}.json`;
    link.click();
  };

  const handleEmailReceipt = () => {
    // Send receipt via email (would integrate with email service)
    alert('Receipt will be sent to your registered email address');
  };

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-600">
              Your {plan?.name} subscription has been activated successfully
            </p>
          </div>
        </div>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="font-medium">Transaction ID:</span>
                <span className="font-mono text-sm">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Plan:</span>
                <span>{plan?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Duration:</span>
                <span>{plan?.duration}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold text-green-900">
                <span>Amount Paid:</span>
                <span>₹{plan?.price}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">What's Next?</h4>
          <div className="grid gap-3 text-sm">
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-blue-600">1</span>
                </div>
                <div>
                  <div className="font-medium">Instant Access</div>
                  <div className="text-gray-600">Your premium features are now active</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-blue-600">2</span>
                </div>
                <div>
                  <div className="font-medium">Email Confirmation</div>
                  <div className="text-gray-600">Receipt sent to your email</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-blue-600">3</span>
                </div>
                <div>
                  <div className="font-medium">Start Exploring</div>
                  <div className="text-gray-600">Browse premium profiles and features</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={handleDownloadReceipt}>
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
          <Button variant="outline" onClick={handleEmailReceipt}>
            <Mail className="w-4 h-4 mr-2" />
            Email Receipt
          </Button>
        </div>

        <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700">
          <Home className="w-4 h-4 mr-2" />
          Continue to Dashboard
        </Button>
      </div>
    );
  }

  // Error state
  return (
    <div className="space-y-6 text-center">
      <div className="space-y-4">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-red-900 mb-2">Payment Failed</h3>
          <p className="text-gray-600">
            {error || 'We encountered an issue processing your payment'}
          </p>
        </div>
      </div>

      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <h4 className="font-medium text-red-900 mb-3">Common reasons for payment failure:</h4>
          <ul className="text-sm text-red-800 space-y-1 text-left">
            <li>• Insufficient balance in account</li>
            <li>• Card/UPI payment limit exceeded</li>
            <li>• Network connectivity issues</li>
            <li>• Bank server temporarily down</li>
            <li>• Incorrect payment details</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button 
          onClick={() => window.location.reload()} 
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <Button variant="outline" onClick={onClose} className="w-full">
          Back to Plans
        </Button>
      </div>

      <div className="text-sm text-gray-600">
        <p>
          Need help? Contact our support team at{' '}
          <a href="tel:+91-8000000000" className="text-blue-600 hover:underline">
            +91-8000000000
          </a>{' '}
          or{' '}
          <a href="mailto:support@sattvikvivah.com" className="text-blue-600 hover:underline">
            support@sattvikvivah.com
          </a>
        </p>
      </div>
    </div>
  );
};
