
import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EXPERT_CATEGORIES } from '../constants/expert-consultation.constants';

interface ExpertCategorySelectorProps {
  selectedCategory?: string;
  onCategorySelect: (categoryId: string) => void;
  className?: string;
}

export const ExpertCategorySelector = memo<ExpertCategorySelectorProps>(({
  selectedCategory,
  onCategorySelect,
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-orange-800 mb-2 flex items-center justify-center space-x-2">
          <span>🧘‍♀️</span>
          <span>Choose Your Path to Guidance</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {EXPERT_CATEGORIES.map((category) => (
          <Card 
            key={category.id}
            className={`
              cursor-pointer transition-all duration-200 hover:shadow-md
              ${selectedCategory === category.id 
                ? 'ring-2 ring-orange-400 bg-gradient-to-r from-orange-50 to-rose-50' 
                : 'hover:bg-orange-50/30'
              }
            `}
            onClick={() => onCategorySelect(category.id)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">{category.icon}</div>
              <h4 className={`text-sm font-semibold mb-1 ${category.color}`}>
                {category.name}
              </h4>
              <p className="text-xs text-gray-600 leading-tight">
                {category.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
});

ExpertCategorySelector.displayName = 'ExpertCategorySelector';
