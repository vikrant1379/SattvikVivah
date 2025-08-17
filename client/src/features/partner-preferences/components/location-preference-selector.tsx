
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { countryOptions, statesByCountry, citiesByState } from '@/data/locations';

interface LocationPreferenceSelectorProps {
  selectedLocations: string[];
  onLocationChange: (locations: string[]) => void;
}

export function LocationPreferenceSelector({ 
  selectedLocations, 
  onLocationChange 
}: LocationPreferenceSelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  useEffect(() => {
    if (selectedCountry) {
      const countryCode = countryOptions.find(c => c.label === selectedCountry)?.value;
      if (countryCode && statesByCountry[countryCode]) {
        setAvailableStates(statesByCountry[countryCode]);
      } else {
        setAvailableStates([]);
      }
      setSelectedState('');
      setAvailableCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState && citiesByState[selectedState]) {
      setAvailableCities(citiesByState[selectedState]);
    } else {
      setAvailableCities([]);
    }
  }, [selectedState]);

  const addLocation = (city: string) => {
    if (city && !selectedLocations.includes(city)) {
      onLocationChange([...selectedLocations, city]);
    }
  };

  const removeLocation = (city: string) => {
    onLocationChange(selectedLocations.filter(loc => loc !== city));
  };

  const addCurrentSelection = () => {
    if (selectedState && !selectedLocations.includes(selectedState)) {
      onLocationChange([...selectedLocations, selectedState]);
    }
  };

  return (
    <div className="space-y-4">
      <Label>Location Preferences</Label>
      
      {/* Location Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="country">Country</Label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countryOptions.map((country) => (
                <SelectItem key={country.value} value={country.label}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="state">State/Province</Label>
          <Select 
            value={selectedState} 
            onValueChange={setSelectedState}
            disabled={!selectedCountry}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {availableStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button 
            type="button"
            onClick={addCurrentSelection}
            disabled={!selectedState}
            className="w-full"
          >
            Add State/Region
          </Button>
        </div>
      </div>

      {/* City Selection */}
      {availableCities.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <Label htmlFor="city">Specific Cities (Optional)</Label>
            <Select onValueChange={addLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select specific cities" />
              </SelectTrigger>
              <SelectContent>
                {availableCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Selected Locations */}
      {selectedLocations.length > 0 && (
        <div>
          <Label>Selected Locations ({selectedLocations.length})</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedLocations.map((location) => (
              <Badge key={location} variant="secondary" className="flex items-center gap-1">
                {location}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-red-500" 
                  onClick={() => removeLocation(location)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {selectedLocations.length === 0 && (
        <p className="text-sm text-gray-500">
          Select countries, states/provinces, or specific cities where you'd like to find matches
        </p>
      )}
    </div>
  );
}
