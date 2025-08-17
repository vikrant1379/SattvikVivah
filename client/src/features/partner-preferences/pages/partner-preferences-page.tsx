import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Save, ArrowLeft } from 'lucide-react';
import { AgeRangeSelector } from '../components/age-range-selector';
import { HeightRangeSelector } from '../components/height-range-selector';
import { DEFAULT_PREFERENCES } from '../constants/partner-preferences.constants';
import type { PartnerPreferences } from '../types/partner-preferences.types';
import { PartnerPreferencesForm } from '../components/partner-preferences-form';

export const PartnerPreferencesPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [initialData] = useState<Partial<PartnerPreferences>>({
    ageRangeMin: 25,
    ageRangeMax: 35,
    heightRangeMin: "5'2\" (157 cm)",
    heightRangeMax: "5'8\" (173 cm)"
  });

  const handleSubmit = (data: PartnerPreferences) => {
    console.log('Saving preferences:', data);
    alert('Partner preferences saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <button
            onClick={() => setLocation('/')}
            className="text-orange-600 hover:text-orange-700 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        <Card className="shadow-lg border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-yellow-100">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Partner Preferences
            </CardTitle>
            <p className="text-gray-600">Set your preferences for your ideal life partner</p>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <PartnerPreferencesForm
              initialData={initialData}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};