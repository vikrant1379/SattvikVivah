
import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EXPERT_CATEGORIES } from '../constants/expert-consultation.constants';

interface ExpertCategorySelectorProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  className?: string;
}

export const ExpertCategorySelector = memo<ExpertCategorySelectorProps>(({
  selectedCategory,
  onCategorySelect,
  className = ''
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-orange-800 mb-2 font-serif">
          🧘‍♀️ Choose Your Path to Guidance
        </h3>
        <p className="text-gray-600 italic mb-4">
          "Select the divine wisdom that calls to your soul"
        </p>
        <div className="text-sm font-bold text-orange-800 font-serif">
          गुरुर्ब्रह्मा गुरुर्विष्णुः
        </div>
        <p className="text-xs text-gray-500 italic">
          "The guru is the divine teacher who guides us"
        </p>
      </div>

      <div className="grid gap-4">
        {EXPERT_CATEGORIES.map((category) => (
          <Card 
            key={category.id}
            className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer border-2 ${
              selectedCategory === category.id 
                ? `${category.borderColor} ring-2 ring-orange-200 shadow-lg bg-gradient-to-r from-orange-50 to-rose-50` 
                : `${category.borderColor} hover:border-orange-300 ${category.bgColor}`
            }`}
            onClick={() => onCategorySelect(category.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                {/* Icon */}
                <div className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center border-2 ${category.borderColor}`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-800 mb-1 font-serif">
                    {category.name}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Selection Indicator */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 border-orange-500'
                    : 'border-gray-300'
                }`}>
                  {selectedCategory === category.id && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
              </div>

              {/* Sacred Specialty Tags */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {category.id === 'dharmic-matchmaking' && (
                    <>
                      <Badge variant="outline" className="text-xs bg-white/80">Soul Compatibility</Badge>
                      <Badge variant="outline" className="text-xs bg-white/80">Life Purpose</Badge>
                    </>
                  )}
                  {category.id === 'sanskara-counselors' && (
                    <>
                      <Badge variant="outline" className="text-xs bg-white/80">Family Harmony</Badge>
                      <Badge variant="outline" className="text-xs bg-white/80">Cultural Wisdom</Badge>
                    </>
                  )}
                  {category.id === 'vedic-life-coaches' && (
                    <>
                      <Badge variant="outline" className="text-xs bg-white/80">Astrological Match</Badge>
                      <Badge variant="outline" className="text-xs bg-white/80">Sacred Timing</Badge>
                    </>
                  )}
                  {category.id === 'sacred-communication' && (
                    <>
                      <Badge variant="outline" className="text-xs bg-white/80">Respectful Courtship</Badge>
                      <Badge variant="outline" className="text-xs bg-white/80">Meaningful Connection</Badge>
                    </>
                  )}
                  {category.id === 'atman-connection' && (
                    <>
                      <Badge variant="outline" className="text-xs bg-white/80">Spiritual Alignment</Badge>
                      <Badge variant="outline" className="text-xs bg-white/80">Divine Connection</Badge>
                    </>
                  )}
                  {category.id === 'moksha-partnership' && (
                    <>
                      <Badge variant="outline" className="text-xs bg-white/80">Spiritual Evolution</Badge>
                      <Badge variant="outline" className="text-xs bg-white/80">Shared Purpose</Badge>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Inspirational Message */}
      {selectedCategory && (
        <div className="text-center">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
            <div className="text-sm font-bold text-orange-800 mb-1 font-serif">
              मार्गदर्शन प्राप्ति
            </div>
            <p className="text-xs text-gray-600 italic">
              "The path to divine guidance has been chosen"
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

ExpertCategorySelector.displayName = 'ExpertCategorySelector';
