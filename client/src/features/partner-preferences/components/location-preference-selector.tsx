
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X, Search, MapPin } from 'lucide-react';
import { citiesByState, statesByCountry } from '@/data/locations';

interface LocationPreferenceSelectorProps {
  selectedLocations: string[];
  onLocationChange: (locations: string[]) => void;
}

interface LocationOption {
  name: string;
  type: 'state' | 'city';
  state?: string; // For cities, which state they belong to
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

  // Get all Indian states and cities
  const allLocationOptions = useMemo(() => {
    const options: LocationOption[] = [];
    
    // Add Indian states
    const indianStates = statesByCountry['IN'] || [];
    indianStates.forEach(state => {
      options.push({
        name: state,
        type: 'state'
      });
    });

    // Add all Indian cities with their state info
    Object.entries(citiesByState).forEach(([state, cities]) => {
      // Only include Indian states
      if (indianStates.includes(state)) {
        cities.forEach(city => {
          options.push({
            name: city,
            type: 'city',
            state: state
          });
        });
      }
    });

    return options.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Filter locations based on search term and exclude already selected ones
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return [];
    
    const searchLower = searchTerm.toLowerCase();
    return allLocationOptions
      .filter(option => 
        option.name.toLowerCase().includes(searchLower) &&
        !selectedLocations.includes(option.name)
      )
      .slice(0, 15); // Limit to 15 suggestions for performance
  }, [allLocationOptions, searchTerm, selectedLocations]);

  const addLocation = (location: string) => {
    if (location && !selectedLocations.includes(location)) {
      onLocationChange([...selectedLocations, location]);
      setSearchTerm('');
      setShowSuggestions(false);
      setHighlightedIndex(-1);
      // Keep focus on input for multiple selections
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const removeLocation = (location: string) => {
    onLocationChange(selectedLocations.filter(loc => loc !== location));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredOptions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          addLocation(filteredOptions[highlightedIndex].name);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (location: string) => {
    addLocation(location);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        // Don't close if clicking on suggestions
        const suggestionContainer = document.querySelector('[data-suggestions-container]');
        if (suggestionContainer && suggestionContainer.contains(event.target as Node)) {
          return;
        }
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

  const getLocationDisplayInfo = (option: LocationOption) => {
    if (option.type === 'state') {
      return {
        icon: <MapPin className="h-3 w-3 text-blue-600" />,
        label: `${option.name} (State)`,
        sublabel: 'Entire state'
      };
    } else {
      return {
        icon: <MapPin className="h-3 w-3 text-green-600" />,
        label: option.name,
        sublabel: option.state
      };
    }
  };

  return (
    <div className="space-y-4">
      <Label>Preferred Locations</Label>
      
      {/* Typeahead Location Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Type to search states and cities..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm && setShowSuggestions(true)}
            className="pl-10"
            autoComplete="off"
          />
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredOptions.length > 0 && (
          <div 
            data-suggestions-container
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto"
          >
            {filteredOptions.map((option, index) => {
              const displayInfo = getLocationDisplayInfo(option);
              return (
                <div
                  key={`${option.type}-${option.name}`}
                  ref={el => suggestionRefs.current[index] = el}
                  className={`px-4 py-3 cursor-pointer transition-colors border-b border-gray-50 last:border-b-0 ${
                    index === highlightedIndex 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleSuggestionClick(option.name)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div className="flex items-center gap-2">
                    {displayInfo.icon}
                    <div className="flex-1">
                      <div className="font-medium text-sm">{displayInfo.label}</div>
                      <div className="text-xs text-gray-500">{displayInfo.sublabel}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* No results message */}
        {showSuggestions && searchTerm && filteredOptions.length === 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 text-gray-500 text-sm">
            No locations found matching "{searchTerm}"
          </div>
        )}
      </div>

      {/* Selected Locations Pills */}
      {selectedLocations.length > 0 && (
        <div>
          <Label>Selected Locations ({selectedLocations.length})</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedLocations.map((location) => {
              // Determine if it's a state or city
              const isState = (statesByCountry['IN'] || []).includes(location);
              const locationOption = allLocationOptions.find(opt => opt.name === location);
              
              return (
                <Badge 
                  key={location} 
                  variant="secondary" 
                  className="flex items-center gap-2 px-3 py-1.5"
                >
                  <div className="flex items-center gap-1">
                    <MapPin className={`h-3 w-3 ${isState ? 'text-blue-600' : 'text-green-600'}`} />
                    <span className="text-sm">{location}</span>
                    {isState && <span className="text-xs text-gray-500">(State)</span>}
                    {!isState && locationOption?.state && (
                      <span className="text-xs text-gray-500">({locationOption.state})</span>
                    )}
                  </div>
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors" 
                    onClick={() => removeLocation(location)}
                  />
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {/* Help text */}
      {selectedLocations.length === 0 && (
        <div className="space-y-1">
          <p className="text-sm text-gray-500">
            Start typing to search for states or cities. You can select entire states or specific cities.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-blue-600" />
              <span>States</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-green-600" />
              <span>Cities</span>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard shortcuts hint */}
      {showSuggestions && filteredOptions.length > 0 && (
        <p className="text-xs text-gray-400">
          Use ↑↓ arrow keys to navigate, Enter to select, Esc to close. You can select multiple locations.
        </p>
      )}
    </div>
  );
}
