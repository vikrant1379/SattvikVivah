
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { heightOptions } from '@/data/static-options';
import { VALIDATION_MESSAGES } from '../constants/partner-preferences.constants';

interface HeightRangeSelectorProps {
  minHeight: string;
  maxHeight: string;
  onHeightRangeChange: (minHeight: string, maxHeight: string) => void;
  className?: string;
}

export const HeightRangeSelector: React.FC<HeightRangeSelectorProps> = ({
  minHeight,
  maxHeight,
  onHeightRangeChange,
  className = ''
}) => {
  const handleMinHeightChange = (value: string) => {
    const minHeightIndex = heightOptions.indexOf(value);
    const currentMaxHeightIndex = heightOptions.indexOf(maxHeight);
    
    const newMaxHeight = minHeightIndex > currentMaxHeightIndex ? value : maxHeight;
    onHeightRangeChange(value, newMaxHeight);
  };

  const handleMaxHeightChange = (value: string) => {
    onHeightRangeChange(minHeight, value);
  };

  const getFilteredMaxHeightOptions = () => {
    const minHeightIndex = heightOptions.indexOf(minHeight);
    return heightOptions.filter((height, index) => index >= minHeightIndex);
  };

  const hasValidationError = minHeight && maxHeight && 
    heightOptions.indexOf(minHeight) > heightOptions.indexOf(maxHeight);

  return (
    <div className={className}>
      <Label className="text-base font-semibold mb-3 block">Height Range</Label>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm">Minimum Height</Label>
            <Select value={minHeight} onValueChange={handleMinHeightChange}>
              <SelectTrigger>
                <SelectValue placeholder="Min height" />
              </SelectTrigger>
              <SelectContent>
                {heightOptions.map((height) => (
                  <SelectItem key={height} value={height}>{height}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm">Maximum Height</Label>
            <Select value={maxHeight} onValueChange={handleMaxHeightChange}>
              <SelectTrigger>
                <SelectValue placeholder="Max height" />
              </SelectTrigger>
              <SelectContent>
                {getFilteredMaxHeightOptions().map((height) => (
                  <SelectItem key={height} value={height}>{height}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {hasValidationError && (
          <div className="text-red-500 text-sm">
            {VALIDATION_MESSAGES.HEIGHT_RANGE_INVALID}
          </div>
        )}
      </div>
    </div>
  );
};
