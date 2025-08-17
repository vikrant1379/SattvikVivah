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
    const newMinAge = parseInt(e.target.value);
    if (!isNaN(newMinAge) && newMinAge >= AGE_CONSTRAINTS.MIN && newMinAge <= AGE_CONSTRAINTS.MAX) {
      // If new min age is greater than current max age, update max age to match
      const newMaxAge = newMinAge > maxAge ? newMinAge : maxAge;
      onAgeRangeChange(newMinAge, newMaxAge);
    }
  };

  const handleMaxAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxAge = parseInt(e.target.value);
    if (!isNaN(newMaxAge) && newMaxAge <= AGE_CONSTRAINTS.MAX && newMaxAge >= AGE_CONSTRAINTS.MIN) {
      // If new max age is less than current min age, update min age to match
      const newMinAge = newMaxAge < minAge ? newMaxAge : minAge;
      onAgeRangeChange(newMinAge, newMaxAge);
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