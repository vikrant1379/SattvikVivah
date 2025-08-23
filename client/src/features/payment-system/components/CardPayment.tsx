
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard, Lock } from 'lucide-react';
import { PaymentPlan, CardDetails } from '../types/payment.types';
import { validateCard, validateExpiry, validateCVV, getCardType, formatCardNumber, formatExpiry } from '../utils/validation';

interface CardPaymentProps {
  plan: PaymentPlan;
  onSubmit: (formData: CardDetails) => void;
}

export const CardPayment: React.FC<CardPaymentProps> = ({ plan, onSubmit }) => {
  const [formData, setFormData] = useState<CardDetails>({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const [errors, setErrors] = useState<Partial<CardDetails>>({});
  const [saveCard, setSaveCard] = useState(false);

  const handleInputChange = (field: keyof CardDetails, value: string) => {
    let processedValue = value;

    if (field === 'number') {
      processedValue = formatCardNumber(value);
    } else if (field === 'expiry') {
      processedValue = formatExpiry(value);
    } else if (field === 'cvv') {
      processedValue = value.replace(/\D/g, '').substr(0, 4);
    } else if (field === 'name') {
      processedValue = value.toUpperCase();
    }

    setFormData(prev => ({ ...prev, [field]: processedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CardDetails> = {};

    if (!validateCard(formData.number)) {
      newErrors.number = 'Please enter a valid card number';
    }

    if (!validateExpiry(formData.expiry)) {
      newErrors.expiry = 'Please enter a valid expiry date';
    }

    if (!validateCVV(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter the cardholder name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, saveCard });
    }
  };

  const cardType = getCardType(formData.number);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-2" />
        <h3 className="text-xl font-semibold">Enter Card Details</h3>
        <p className="text-gray-600">Pay ₹{plan.price} for {plan.name}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <div className="relative">
            <Input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={formData.number}
              onChange={(e) => handleInputChange('number', e.target.value)}
              className={`pr-12 ${errors.number ? 'border-red-500' : ''}`}
              maxLength={19}
            />
            {cardType !== 'unknown' && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <img
                  src={`/card-icons/${cardType}.png`}
                  alt={cardType}
                  className="w-8 h-5"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
          {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              id="expiry"
              type="text"
              placeholder="MM/YY"
              value={formData.expiry}
              onChange={(e) => handleInputChange('expiry', e.target.value)}
              className={errors.expiry ? 'border-red-500' : ''}
              maxLength={5}
            />
            {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
          </div>

          <div>
            <Label htmlFor="cvv">CVV</Label>
            <div className="relative">
              <Input
                id="cvv"
                type="password"
                placeholder="123"
                value={formData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value)}
                className={errors.cvv ? 'border-red-500' : ''}
                maxLength={4}
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="cardName">Cardholder Name</Label>
          <Input
            id="cardName"
            type="text"
            placeholder="JOHN DOE"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="saveCard"
            checked={saveCard}
            onCheckedChange={setSaveCard}
          />
          <Label htmlFor="saveCard" className="text-sm">
            Save card for future payments (secure tokenization)
          </Label>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              <Lock className="w-4 h-4" />
              <span>Your card details are encrypted and never stored on our servers</span>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Proceed to Review
        </Button>
      </form>
    </div>
  );
};
