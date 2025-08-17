
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AgeRangeSelector } from './age-range-selector';
import { HeightRangeSelector } from './height-range-selector';
import { PartnerPreferences } from '../types/partner-preferences.types';

interface PartnerPreferencesFormProps {
  initialData?: Partial<PartnerPreferences>;
  onSubmit: (data: PartnerPreferences) => void;
  onCancel?: () => void;
}

export function PartnerPreferencesForm({ 
  initialData = {}, 
  onSubmit, 
  onCancel 
}: PartnerPreferencesFormProps) {
  const [formData, setFormData] = useState<Partial<PartnerPreferences>>(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as PartnerPreferences);
  };

  const handleAgeRangeChange = (minAge: number, maxAge: number) => {
    setFormData({
      ...formData,
      ageRangeMin: minAge,
      ageRangeMax: maxAge
    });
  };

  const handleHeightRangeChange = (minHeight: string, maxHeight: string) => {
    setFormData({
      ...formData,
      heightRangeMin: minHeight,
      heightRangeMax: maxHeight
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AgeRangeSelector
            minAge={formData.ageRangeMin || 18}
            maxAge={formData.ageRangeMax || 75}
            onChange={handleAgeRangeChange}
          />
          
          <HeightRangeSelector
            minHeight={formData.heightRangeMin || "4'6\""}
            maxHeight={formData.heightRangeMax || "6'6\""}
            onChange={handleHeightRangeChange}
          />

          <div>
            <Label htmlFor="locationPreference">Location Preference</Label>
            <Input
              id="locationPreference"
              value={formData.locationPreference || ''}
              onChange={(e) => setFormData({...formData, locationPreference: e.target.value})}
              placeholder="Preferred location or willingness to relocate"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spiritual Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="spiritualAlignment">Spiritual Alignment</Label>
            <Select
              value={formData.spiritualAlignment || ''}
              onValueChange={(value) => setFormData({...formData, spiritualAlignment: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select spiritual alignment preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="essential">Essential - Must share similar path</SelectItem>
                <SelectItem value="important">Important - Should have spiritual inclination</SelectItem>
                <SelectItem value="open">Open - Willing to grow together</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="spiritualAlignmentDetails">Spiritual Alignment Details</Label>
            <Textarea
              id="spiritualAlignmentDetails"
              value={formData.spiritualAlignmentDetails || ''}
              onChange={(e) => setFormData({...formData, spiritualAlignmentDetails: e.target.value})}
              placeholder="Describe your expectations for spiritual compatibility..."
              className="min-h-20"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Life Vision</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="idealPartner">Ideal Partner Description</Label>
            <Textarea
              id="idealPartner"
              value={formData.idealPartner || ''}
              onChange={(e) => setFormData({...formData, idealPartner: e.target.value})}
              placeholder="Describe your ideal life partner..."
              className="min-h-24"
            />
          </div>

          <div>
            <Label htmlFor="parentingVision">Parenting Vision</Label>
            <Textarea
              id="parentingVision"
              value={formData.parentingVision || ''}
              onChange={(e) => setFormData({...formData, parentingVision: e.target.value})}
              placeholder="Share your vision for raising children with dharmic values..."
              className="min-h-20"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          Save Preferences
        </Button>
      </div>
    </form>
  );
}
