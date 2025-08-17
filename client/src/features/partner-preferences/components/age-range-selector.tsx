import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AGE_CONSTRAINTS, VALIDATION_MESSAGES } from '../constants/partner-preferences.constants';

interface AgeRangeSelectorProps {
  minAge: number;
  maxAge: number;
  onAgeRangeChange: (minAge: number, maxAge: number) => void;
  className?: string;
}

export const AgeRangeSelector: React.FC<AgeRangeSelectorProps> = ({
  minAge,
  maxAge,
  onAgeRangeChange,
  className = ''
}) => {
  const handleMinAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      onAgeRangeChange(AGE_CONSTRAINTS.MIN, maxAge);
      return;
    }
    
    const newMinAge = parseInt(value);
    if (!isNaN(newMinAge)) {
      // Clamp the value to constraints
      const clampedMinAge = Math.max(AGE_CONSTRAINTS.MIN, Math.min(AGE_CONSTRAINTS.MAX, newMinAge));
      // If new min age is greater than current max age, update max age to match
      const newMaxAge = clampedMinAge > maxAge ? clampedMinAge : maxAge;
      onAgeRangeChange(clampedMinAge, newMaxAge);
    }
  };

  const handleMaxAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      onAgeRangeChange(minAge, AGE_CONSTRAINTS.MAX);
      return;
    }
    
    const newMaxAge = parseInt(value);
    if (!isNaN(newMaxAge)) {
      // Clamp the value to constraints
      const clampedMaxAge = Math.max(AGE_CONSTRAINTS.MIN, Math.min(AGE_CONSTRAINTS.MAX, newMaxAge));
      // If new max age is less than current min age, update min age to match
      const newMinAge = clampedMaxAge < minAge ? clampedMaxAge : minAge;
      onAgeRangeChange(newMinAge, clampedMaxAge);
    }
  };

  const hasValidationError = minAge > maxAge;

  return (
    <div className={className}>
      <Label className="text-base font-semibold mb-3 block">Age Range</Label>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm">Minimum Age</Label>
            <Input
              type="number"
              min={AGE_CONSTRAINTS.MIN}
              max={AGE_CONSTRAINTS.MAX}
              value={minAge}
              onChange={handleMinAgeChange}
              placeholder="Min age"
            />
          </div>
          <div>
            <Label className="text-sm">Maximum Age</Label>
            <Input
              type="number"
              min={minAge}
              max={AGE_CONSTRAINTS.MAX}
              value={maxAge}
              onChange={handleMaxAgeChange}
              placeholder="Max age"
            />
          </div>
        </div>
        {hasValidationError && (
          <div className="text-red-500 text-sm">
            {VALIDATION_MESSAGES.AGE_RANGE_INVALID}
          </div>
        )}
      </div>
    </div>
  );
};