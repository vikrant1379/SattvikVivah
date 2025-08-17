
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Label } from '@/components/ui/label';
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Get all Indian cities from the data
  const allIndianCities = useMemo(() => {
    const cities: string[] = [];
    Object.values(citiesByState).forEach(stateCities => {
      cities.push(...stateCities);
    });
    return cities.sort();
  }, []);

  // Filter cities based on search term and exclude already selected ones
  const filteredCities = useMemo(() => {
    if (!searchTerm) return [];
    return allIndianCities
      .filter(city => 
        city.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedLocations.includes(city)
      )
      .slice(0, 10); // Limit to 10 suggestions for performance
  }, [allIndianCities, searchTerm, selectedLocations]);

  const addCity = (city: string) => {
    if (city && !selectedLocations.includes(city)) {
      onLocationChange([...selectedLocations, city]);
      setSearchTerm('');
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const removeCity = (city: string) => {
    onLocationChange(selectedLocations.filter(loc => loc !== city));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredCities.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredCities.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredCities.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredCities.length) {
          addCity(filteredCities[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (city: string) => {
    addCity(city);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && suggestionRefs.current[highlightedIndex]) {
      suggestionRefs.current[highlightedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [highlightedIndex]);

  return (
    <div className="space-y-4">
      <Label>Preferred Cities</Label>
      
      {/* Typeahead City Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Type to search and select cities..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm && setShowSuggestions(true)}
            className="pl-10"
            autoComplete="off"
          />
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredCities.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredCities.map((city, index) => (
              <div
                key={city}
                ref={el => suggestionRefs.current[index] = el}
                className={`px-4 py-2 cursor-pointer transition-colors ${
                  index === highlightedIndex 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleSuggestionClick(city)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {city}
              </div>
            ))}
          </div>
        )}

        {/* No results message */}
        {showSuggestions && searchTerm && filteredCities.length === 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 text-gray-500 text-sm">
            No cities found matching "{searchTerm}"
          </div>
        )}
      </div>

      {/* Selected Cities Pills */}
      {selectedLocations.length > 0 && (
        <div>
          <Label>Selected Cities ({selectedLocations.length})</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedLocations.map((city) => (
              <Badge key={city} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                {city}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors" 
                  onClick={() => removeCity(city)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Help text */}
      {selectedLocations.length === 0 && (
        <p className="text-sm text-gray-500">
          Start typing to search for cities. Click on a city from the suggestions to add it as a preference.
        </p>
      )}

      {/* Keyboard shortcuts hint */}
      {showSuggestions && filteredCities.length > 0 && (
        <p className="text-xs text-gray-400">
          Use ↑↓ arrow keys to navigate, Enter to select, Esc to close
        </p>
      )}
    </div>
  );
}
