
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Search } from 'lucide-react';
import { PaymentPlan, NetBankingDetails } from '../types/payment.types';
import { BANKS } from '../constants/payment.constants';

interface NetBankingProps {
  plan: PaymentPlan;
  onSubmit: (formData: NetBankingDetails) => void;
}

export const NetBanking: React.FC<NetBankingProps> = ({ plan, onSubmit }) => {
  const [selectedBank, setSelectedBank] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const filteredBanks = BANKS.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularBanks = BANKS.slice(0, 6);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBank) {
      setError('Please select a bank');
      return;
    }

    onSubmit({ bank: selectedBank });
  };

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
    if (error) setError('');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-2" />
        <h3 className="text-xl font-semibold">Net Banking</h3>
        <p className="text-gray-600">Pay ₹{plan.price} for {plan.name}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Popular Banks */}
        <div>
          <Label className="text-lg font-medium mb-4 block">Popular Banks</Label>
          <div className="grid grid-cols-2 gap-3">
            {popularBanks.map((bank) => (
              <Card
                key={bank.id}
                className={`cursor-pointer hover:shadow-md transition-all ${
                  selectedBank === bank.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => handleBankSelect(bank.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">{bank.name}</span>
                    {selectedBank === bank.id && (
                      <div className="ml-auto">
                        <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                            <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Banks Dropdown */}
        <div>
          <Label htmlFor="bankSelect">Or select from all banks</Label>
          <Select value={selectedBank} onValueChange={handleBankSelect}>
            <SelectTrigger className={error ? 'border-red-500' : ''}>
              <SelectValue placeholder="Choose your bank" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search banks..."
                    className="w-full pl-9 pr-3 py-2 border rounded-md text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              {filteredBanks.map((bank) => (
                <SelectItem key={bank.id} value={bank.id}>
                  {bank.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-yellow-900 mb-2">Important Notes:</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Ensure your net banking is activated</li>
              <li>• Keep your internet banking credentials ready</li>
              <li>• You will be redirected to your bank's website</li>
              <li>• Transaction may take 2-3 minutes to process</li>
            </ul>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Proceed to Bank Website
        </Button>
      </form>
    </div>
  );
};
