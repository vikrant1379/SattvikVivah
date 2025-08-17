
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

export const PartnerPreferencesPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [preferences, setPreferences] = useState<PartnerPreferences>(DEFAULT_PREFERENCES);

  const handleSave = () => {
    console.log('Preferences saved:', preferences);
    alert('Partner preferences saved successfully!');
  };

  const handleAgeRangeChange = (minAge: number, maxAge: number) => {
    setPreferences(prev => ({
      ...prev,
      ageRange: [minAge, maxAge]
    }));
  };

  const handleHeightRangeChange = (minHeight: string, maxHeight: string) => {
    setPreferences(prev => ({
      ...prev,
      heightRange: [minHeight, maxHeight]
    }));
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AgeRangeSelector
                minAge={preferences.ageRange[0]}
                maxAge={preferences.ageRange[1]}
                onAgeRangeChange={handleAgeRangeChange}
              />

              <HeightRangeSelector
                minHeight={preferences.heightRange[0]}
                maxHeight={preferences.heightRange[1]}
                onHeightRangeChange={handleHeightRangeChange}
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t">
              <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700 px-8">
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
