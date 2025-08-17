import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar, MapPin, Clock, Star, Sun, Moon, ChevronDown, Check } from 'lucide-react';
import { SmartDateSelector } from './smart-date-selector';
import { generateBasicHoroscope, type BirthDetails } from '@/utils/vedic-astrology.utils';
import { placesService, type PlaceSearchResult } from '@/services/places.service';

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
  const [horoscope, setHoroscope] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Place search states
  const [placeQuery, setPlaceQuery] = useState('');
  const [placeResults, setPlaceResults] = useState<PlaceSearchResult[]>([]);
  const [isPlaceSearchOpen, setIsPlaceSearchOpen] = useState(false);
  const [isSearchingPlaces, setIsSearchingPlaces] = useState(false);

  // Search places when query changes
  useEffect(() => {
    const searchPlaces = async () => {
      if (placeQuery.length < 3) {
        setPlaceResults([]);
        return;
      }

      setIsSearchingPlaces(true);
      try {
        const results = await placesService.searchPlaces(placeQuery);
        setPlaceResults(results);
      } catch (error) {
        console.error('Error searching places:', error);
        setPlaceResults([]);
      } finally {
        setIsSearchingPlaces(false);
      }
    };

    const debounceTimer = setTimeout(searchPlaces, 300);
    return () => clearTimeout(debounceTimer);
  }, [placeQuery]);

  const handlePlaceSelect = (place: PlaceSearchResult) => {
    setBirthDetails(prev => ({
      ...prev,
      place: `${place.name}, ${place.state}`,
      latitude: place.latitude,
      longitude: place.longitude
    }));
    setPlaceQuery(`${place.name}, ${place.state}`);
    setIsPlaceSearchOpen(false);
  };

  const handleCalculate = async () => {
    if (!birthDetails.date || !birthDetails.time || !birthDetails.place) {
      alert('Please fill in all birth details');
      return;
    }

    setIsCalculating(true);
    try {
      const calculatedHoroscope = generateBasicHoroscope(birthDetails);
      setHoroscope(calculatedHoroscope);
    } catch (error) {
      console.error('Error calculating horoscope:', error);
      alert('Error calculating horoscope. Please check your details.');
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
            <Label htmlFor="birth-date" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date of Birth
            </Label>
            <Input
              id="birth-date"
              type="date"
              value={birthDetails.date}
              onChange={(e) => setBirthDetails(prev => ({ ...prev, date: e.target.value }))}
              max={new Date().toISOString().split('T')[0]}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="birth-time" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Time of Birth
            </Label>
            <Input
              id="birth-time"
              type="time"
              value={birthDetails.time}
              onChange={(e) => setBirthDetails(prev => ({ ...prev, time: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="place" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Place of Birth
            </Label>
            <Popover open={isPlaceSearchOpen} onOpenChange={setIsPlaceSearchOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isPlaceSearchOpen}
                  className="w-full justify-between mt-1"
                >
                  {birthDetails.place || "Select birth place..."}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search places..."
                    value={placeQuery}
                    onValueChange={setPlaceQuery}
                  />
                  <CommandList>
                    <CommandEmpty>
                      {isSearchingPlaces ? "Searching..." : "No places found."}
                    </CommandEmpty>
                    <CommandGroup>
                      {placeResults.map((place) => (
                        <CommandItem
                          key={place.id}
                          value={place.id}
                          onSelect={() => handlePlaceSelect(place)}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              birthDetails.place === `${place.name}, ${place.state}` ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          <div>
                            <div className="font-medium">{place.name}</div>
                            <div className="text-sm text-gray-500">{place.state}, {place.country}</div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button
          onClick={handleCalculate}
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

        {horoscope && (
          <div className="mt-6 p-4 border rounded-lg bg-white">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Sun className="w-5 h-5 text-orange-500" />
              Your Astrological Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Rashi:</Label>
                <p>{horoscope.rashi}</p>
              </div>
              <div>
                <Label>Nakshatra:</Label>
                <p>{horoscope.nakshatra}</p>
              </div>
              <div>
                <Label>Horoscope:</Label>
                <p>{horoscope.horoscope}</p>
              </div>
              <div>
                <Label>Guna Score:</Label>
                <Badge className="text-lg">{horoscope.gunaScore}</Badge>
              </div>
              <div>
                <Label>Doshas:</Label>
                <div className="flex flex-wrap gap-2">
                  {horoscope.doshas.map((dosha, index) => (
                    <Badge key={index} variant="secondary">{dosha}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AstrologicalCalculator;