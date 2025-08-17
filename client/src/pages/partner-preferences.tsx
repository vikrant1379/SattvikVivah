
import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Heart, Save, ArrowLeft } from 'lucide-react';
import { heightOptions } from '@/data/static-options';

export const PartnerPreferencesPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [preferences, setPreferences] = useState({
    ageRange: [25, 35],
    heightRange: ['5\'0"', '6\'0"'],
    education: [] as string[],
    profession: [] as string[],
    religion: 'Hindu',
    caste: [] as string[],
    motherTongue: [] as string[],
    location: [] as string[],
    annualIncome: 'Rs. 5 - 8 Lakh p.a',
    maritalStatus: ['Never Married'],
    eatingHabits: ['Vegetarian'],
    spiritualPractices: [] as string[],
    gunaMatchMin: 18
  });

  const handleSave = () => {
    console.log('Preferences saved:', preferences);
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
            {/* Basic Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">Age Range</Label>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Minimum Age</Label>
                      <Input
                        type="number"
                        min="18"
                        max="75"
                        value={preferences.ageRange[0]}
                        onChange={(e) => {
                          const minAge = parseInt(e.target.value);
                          if (minAge >= 18 && minAge <= preferences.ageRange[1]) {
                            setPreferences(prev => ({
                              ...prev,
                              ageRange: [minAge, prev.ageRange[1]]
                            }));
                          }
                        }}
                        placeholder="Min age"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Maximum Age</Label>
                      <Input
                        type="number"
                        min="18"
                        max="75"
                        value={preferences.ageRange[1]}
                        onChange={(e) => {
                          const maxAge = parseInt(e.target.value);
                          if (maxAge <= 75 && maxAge >= preferences.ageRange[0]) {
                            setPreferences(prev => ({
                              ...prev,
                              ageRange: [prev.ageRange[0], maxAge]
                            }));
                          }
                        }}
                        placeholder="Max age"
                      />
                    </div>
                  </div>
                  {preferences.ageRange[0] > preferences.ageRange[1] && (
                    <div className="text-red-500 text-sm">
                      Minimum age cannot be greater than maximum age
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Height Range</Label>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Minimum Height</Label>
                      <Select
                        value={preferences.heightRange[0]}
                        onValueChange={(value) => {
                          setPreferences(prev => ({
                            ...prev,
                            heightRange: [value, prev.heightRange[1]]
                          }));
                        }}
                      >
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
                      <Select
                        value={preferences.heightRange[1]}
                        onValueChange={(value) => {
                          setPreferences(prev => ({
                            ...prev,
                            heightRange: [prev.heightRange[0], value]
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Max height" />
                        </SelectTrigger>
                        <SelectContent>
                          {heightOptions.map((height) => (
                            <SelectItem key={height} value={height}>{height}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Minimum Annual Income</Label>
                <Select
                  value={preferences.annualIncome}
                  onValueChange={(value) => setPreferences(prev => ({ ...prev, annualIncome: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rs. 2 - 5 Lakh p.a">Rs. 2 - 5 Lakh p.a</SelectItem>
                    <SelectItem value="Rs. 5 - 8 Lakh p.a">Rs. 5 - 8 Lakh p.a</SelectItem>
                    <SelectItem value="Rs. 8 - 12 Lakh p.a">Rs. 8 - 12 Lakh p.a</SelectItem>
                    <SelectItem value="Rs. 12 - 20 Lakh p.a">Rs. 12 - 20 Lakh p.a</SelectItem>
                    <SelectItem value="Rs. 20+ Lakh p.a">Rs. 20+ Lakh p.a</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Spiritual Preferences */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Spiritual Practices (Preferred)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Meditation & Dhyana', 'Daily Sadhana', 'Yoga Practice', 'Bhajan & Kirtan', 'Temple Visits', 'Scriptural Study', 'Seva & Charity', 'Pilgrimage'].map(practice => (
                  <label key={practice} className="flex items-center space-x-2">
                    <Checkbox
                      checked={preferences.spiritualPractices.includes(practice)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPreferences(prev => ({
                            ...prev,
                            spiritualPractices: [...prev.spiritualPractices, practice]
                          }));
                        } else {
                          setPreferences(prev => ({
                            ...prev,
                            spiritualPractices: prev.spiritualPractices.filter(p => p !== practice)
                          }));
                        }
                      }}
                    />
                    <span className="text-sm">{practice}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Guna Matching */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Minimum Guna Match Score: {preferences.gunaMatchMin}/36
              </Label>
              <div className="px-2">
                <Slider
                  value={[preferences.gunaMatchMin]}
                  onValueChange={(value) => setPreferences(prev => ({ ...prev, gunaMatchMin: value[0] }))}
                  max={36}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>0 (Minimum)</span>
                  <span>36 (Perfect Match)</span>
                </div>
              </div>
            </div>

            {/* Dietary Preferences */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Eating Habits</Label>
              <div className="flex flex-wrap gap-2">
                {['Vegetarian', 'Pure Vegetarian', 'Vegan', 'Jain Vegetarian', 'Sattvic Diet'].map(habit => (
                  <label key={habit} className="flex items-center space-x-2">
                    <Checkbox
                      checked={preferences.eatingHabits.includes(habit)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPreferences(prev => ({
                            ...prev,
                            eatingHabits: [...prev.eatingHabits, habit]
                          }));
                        } else {
                          setPreferences(prev => ({
                            ...prev,
                            eatingHabits: prev.eatingHabits.filter(h => h !== habit)
                          }));
                        }
                      }}
                    />
                    <span className="text-sm">{habit}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location Preferences */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Preferred Locations</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'].map(city => (
                  <label key={city} className="flex items-center space-x-2">
                    <Checkbox
                      checked={preferences.location.includes(city)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPreferences(prev => ({
                            ...prev,
                            location: [...prev.location, city]
                          }));
                        } else {
                          setPreferences(prev => ({
                            ...prev,
                            location: prev.location.filter(l => l !== city)
                          }));
                        }
                      }}
                    />
                    <span className="text-sm">{city}</span>
                  </label>
                ))}
              </div>
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

export default PartnerPreferencesPage;
