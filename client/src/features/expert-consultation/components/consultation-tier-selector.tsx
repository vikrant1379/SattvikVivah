
import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Crown } from 'lucide-react';
import { CONSULTATION_TIERS } from '../constants/expert-consultation.constants';
import type { IConsultationTier } from '../types/expert-consultation.types';

interface ConsultationTierSelectorProps {
  selectedTier?: string;
  onTierSelect: (tierId: string) => void;
  className?: string;
}

export const ConsultationTierSelector = memo<ConsultationTierSelectorProps>(({
  selectedTier,
  onTierSelect,
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-orange-800 mb-2 flex items-center justify-center space-x-2">
          <Crown className="w-5 h-5" />
          <span>Choose Your Path to Divine Guidance</span>
        </h3>
        <p className="text-gray-600 italic">
          "Find your soulmate with wisdom and dharma"
        </p>
      </div>

      <div className="grid gap-4">
        {CONSULTATION_TIERS.map((tier) => (
          <Card 
            key={tier.id} 
            className={`
              relative cursor-pointer transition-all duration-300 hover:shadow-lg
              ${selectedTier === tier.id 
                ? 'ring-2 ring-orange-400 bg-gradient-to-r from-orange-50 to-rose-50' 
                : 'hover:bg-orange-50/50'
              }
              ${tier.isPopular ? 'border-orange-300' : 'border-gray-200'}
            `}
            onClick={() => onTierSelect(tier.id)}
          >
            {tier.isPopular && (
              <Badge 
                className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white"
              >
                Most Popular
              </Badge>
            )}
            
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{tier.icon}</div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-gray-800">
                      {tier.name}
                    </h4>
                    <div className="text-right">
                      {tier.price === 0 ? (
                        <span className="text-lg font-bold text-green-600">Free</span>
                      ) : (
                        <div>
                          <span className="text-2xl font-bold text-orange-600">₹{tier.price}</span>
                          <span className="text-sm text-gray-500">/month</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  
                  <div className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 bg-white/80 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Response Time:</span>
                      <Badge variant="outline" className="text-orange-700 border-orange-300">
                        {tier.responseTime}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedTier === tier.id && (
                <div className="mt-4 pt-4 border-t border-orange-200">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white">
                    Continue with {tier.name}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
});

ConsultationTierSelector.displayName = 'ConsultationTierSelector';
