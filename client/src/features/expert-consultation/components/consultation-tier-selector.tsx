
import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Sparkles, Clock, MessageCircle } from 'lucide-react';
import { CONSULTATION_TIERS } from '../constants/expert-consultation.constants';

interface ConsultationTierSelectorProps {
  selectedTier: string;
  onTierSelect: (tierId: string) => void;
  className?: string;
}

export const ConsultationTierSelector = memo<ConsultationTierSelectorProps>(({
  selectedTier,
  onTierSelect,
  className = ''
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-orange-800 mb-2 font-serif">
          🪷 Choose Your Path to Divine Guidance
        </h3>
        <p className="text-gray-600 italic">
          "Find your soulmate with wisdom and dharma"
        </p>
        <div className="mt-4 text-sm font-bold text-orange-800 font-serif">
          सत्यं शिवं सुन्दरम्
        </div>
        <p className="text-xs text-gray-500 italic">Truth, Auspiciousness, Beauty</p>
      </div>

      <div className="grid gap-6">
        {CONSULTATION_TIERS.map((tier, index) => (
          <Card 
            key={tier.id}
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer border-2 ${
              selectedTier === tier.id 
                ? `${tier.borderColor} ring-2 ring-orange-200 shadow-lg` 
                : `${tier.borderColor} hover:border-orange-300`
            }`}
            onClick={() => onTierSelect(tier.id)}
          >
            <div className={`bg-gradient-to-r ${tier.bgGradient} p-1`}>
              <CardContent className="bg-white/95 backdrop-blur-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-xl font-bold text-gray-800 font-serif">
                        {tier.name}
                      </h4>
                      {tier.popular && (
                        <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                          <Star className="w-3 h-3 mr-1" />
                          Most Sacred
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{tier.subtitle}</p>
                    
                    {/* Price */}
                    <div className="flex items-baseline space-x-2 mb-4">
                      <span className="text-2xl font-bold text-gray-900">
                        {tier.price}
                      </span>
                      {tier.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {tier.originalPrice}
                        </span>
                      )}
                      {tier.price !== 'Free' && (
                        <span className="text-sm text-gray-600">/month</span>
                      )}
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span>{tier.responseTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MessageCircle className="w-4 h-4 text-blue-600" />
                        <span>{tier.consultationsIncluded}</span>
                      </div>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedTier === tier.id
                      ? 'bg-orange-500 border-orange-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedTier === tier.id && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Sacred Blessing */}
                <div className="mt-4 pt-4 border-t border-orange-100">
                  <div className="text-center">
                    <div className="text-xs font-bold text-orange-700 font-serif mb-1">
                      {index === 0 && "शुभारम्भ - Divine Beginnings"}
                      {index === 1 && "सेवा भाव - Service with Devotion"}  
                      {index === 2 && "सत्संग - Sacred Fellowship"}
                    </div>
                    <p className="text-xs text-gray-500 italic">
                      {index === 0 && "Your spiritual journey begins with basic wisdom"}
                      {index === 1 && "Dedicated guidance for your dharmic path"}
                      {index === 2 && "Complete mentorship for sacred union"}
                    </p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-10">
                  {index === 0 && <Sparkles className="w-8 h-8 text-orange-500" />}
                  {index === 1 && <Star className="w-8 h-8 text-blue-500" />}
                  {index === 2 && <Crown className="w-8 h-8 text-purple-500" />}
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Selection CTA */}
      {selectedTier && (
        <div className="text-center">
          <div className="bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200 rounded-lg p-4">
            <div className="text-sm font-bold text-orange-800 mb-1 font-serif">
              ॐ शुभस्य शीघ्रम् ॐ
            </div>
            <p className="text-xs text-gray-600 italic">
              "May auspiciousness come swiftly"
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

ConsultationTierSelector.displayName = 'ConsultationTierSelector';
