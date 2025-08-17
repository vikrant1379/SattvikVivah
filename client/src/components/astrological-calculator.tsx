
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star, Loader2 } from 'lucide-react';
import { calculateAccurateAstrology } from '@/utils/vedic-astrology.utils';

interface BirthDetails {
  date: string;
  time: string;
  place: string;
  latitude?: number;
  longitude?: number;
}

interface AstrologicalData {
  rashi: string;
  nakshatra: string;
  horoscope: string;
  gunaScore: number;
  doshas: string[];
}

interface AstrologicalCalculatorProps {
  onCalculationComplete: (data: AstrologicalData) => void;
  initialData?: Partial<BirthDetails>;
}

export const AstrologicalCalculator: React.FC<AstrologicalCalculatorProps> = ({
  onCalculationComplete,
  initialData = {}
}) => {
  const [birthDetails, setBirthDetails] = useState<BirthDetails>({
    date: initialData.date || '',
    time: initialData.time || '12:00',
    place: initialData.place || '',
    latitude: initialData.latitude,
    longitude: initialData.longitude
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch location suggestions from geocoding API
  const fetchLocationSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      // Using OpenStreetMap Nominatim API (free)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(query)}&addressdetails=1`
      );
      const data = await response.json();
      
      setSuggestions(data.map((item: any) => ({
        name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon)
      })));
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      setSuggestions([]);
    }
  };

  const selectLocation = (location: any) => {
    setBirthDetails(prev => ({
      ...prev,
      place: location.name,
      latitude: location.lat,
      longitude: location.lon
    }));
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const calculateAstrology = async () => {
    if (!birthDetails.date || !birthDetails.time || !birthDetails.place) {
      alert('Please fill all birth details to calculate astrological information');
      return;
    }

    setIsCalculating(true);
    
    try {
      // Use accurate astrological calculation
      const astroData = await calculateAccurateAstrology({
        date: birthDetails.date,
        time: birthDetails.time,
        place: birthDetails.place,
        latitude: birthDetails.latitude || 0,
        longitude: birthDetails.longitude || 0
      });

      onCalculationComplete(astroData);
      alert('Astrological details calculated successfully!');
    } catch (error) {
      console.error('Error calculating astrological details:', error);
      alert('Error calculating astrological details. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Calculate Astrological Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="birth-date">Date of Birth *</Label>
            <Input
              id="birth-date"
              type="date"
              value={birthDetails.date}
              onChange={(e) => setBirthDetails(prev => ({ ...prev, date: e.target.value }))}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <Label htmlFor="birth-time">Time of Birth *</Label>
            <Input
              id="birth-time"
              type="time"
              value={birthDetails.time}
              onChange={(e) => setBirthDetails(prev => ({ ...prev, time: e.target.value }))}
            />
          </div>
          <div className="relative">
            <Label htmlFor="birth-place">Place of Birth *</Label>
            <Input
              id="birth-place"
              value={birthDetails.place}
              onChange={(e) => {
                setBirthDetails(prev => ({ ...prev, place: e.target.value }));
                fetchLocationSuggestions(e.target.value);
              }}
              placeholder="Start typing city name..."
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm border-b last:border-b-0"
                    onClick={() => selectLocation(suggestion)}
                  >
                    {suggestion.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <Button 
          onClick={calculateAstrology} 
          className="w-full"
          disabled={isCalculating || !birthDetails.date || !birthDetails.time || !birthDetails.place}
        >
          {isCalculating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Calculating...
            </>
          ) : (
            'Calculate Zodiac Sign, Nakshatra & Horoscope'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AstrologicalCalculator;
