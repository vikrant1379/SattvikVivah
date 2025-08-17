
import React, { useState, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X, Search } from 'lucide-react';
import { citiesByState } from '@/data/locations';

interface LocationPreferenceSelectorProps {
  selectedLocations: string[];
  onLocationChange: (locations: string[]) => void;
}

export function LocationPreferenceSelector({ 
  selectedLocations, 
  onLocationChange 
}: LocationPreferenceSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Get all Indian cities from the data
  const allIndianCities = useMemo(() => {
    const cities: string[] = [];
    Object.values(citiesByState).forEach(stateCities => {
      cities.push(...stateCities);
    });
    return cities.sort();
  }, []);

  // Filter cities based on search term
  const filteredCities = useMemo(() => {
    if (!searchTerm) return allIndianCities;
    return allIndianCities.filter(city => 
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allIndianCities, searchTerm]);

  const addCity = (city: string) => {
    if (city && !selectedLocations.includes(city)) {
      onLocationChange([...selectedLocations, city]);
      setSelectedCity('');
    }
  };

  const removeCity = (city: string) => {
    onLocationChange(selectedLocations.filter(loc => loc !== city));
  };

  const addSearchedCity = () => {
    if (selectedCity) {
      addCity(selectedCity);
    }
  };

  return (
    <div className="space-y-4">
      <Label>Preferred Cities</Label>
      
      {/* City Search and Selection */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <SelectItem 
                      key={city} 
                      value={city}
                      disabled={selectedLocations.includes(city)}
                    >
                      {city}
                      {selectedLocations.includes(city) && " (Already selected)"}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    No cities found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button 
              type="button"
              onClick={addSearchedCity}
              disabled={!selectedCity || selectedLocations.includes(selectedCity)}
              className="w-full"
            >
              Add City
            </Button>
          </div>
        </div>
      </div>

      {/* Selected Cities */}
      {selectedLocations.length > 0 && (
        <div>
          <Label>Selected Cities ({selectedLocations.length})</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedLocations.map((city) => (
              <Badge key={city} variant="secondary" className="flex items-center gap-1">
                {city}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-red-500" 
                  onClick={() => removeCity(city)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {selectedLocations.length === 0 && (
        <p className="text-sm text-gray-500">
          Select cities where you'd like to find matches. You can search and select multiple cities.
        </p>
      )}

      {filteredCities.length > 20 && searchTerm && (
        <p className="text-xs text-gray-400">
          Showing {filteredCities.length} cities. Type more to narrow results.
        </p>
      )}
    </div>
  );
}
