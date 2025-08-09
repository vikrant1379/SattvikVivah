
import React from 'react';
import { Control } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useStaticData } from '@/hooks';

interface LocationFieldsProps {
  control: Control<any>;
  countryName?: string;
  stateName?: string;
  cityName?: string;
}

export const LocationFields: React.FC<LocationFieldsProps> = ({
  control,
  countryName = 'country',
  stateName = 'state',
  cityName = 'city'
}) => {
  const { countries, states, cities, loadCountries, loadStates, loadCities } = useStaticData();

  React.useEffect(() => {
    if (countries.length === 0) {
      loadCountries();
    }
  }, [countries.length, loadCountries]);

  return (
    <>
      <FormField
        control={control}
        name={countryName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                loadStates(value);
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={stateName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                loadCities(value);
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={cityName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
