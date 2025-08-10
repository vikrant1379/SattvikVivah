
import React from 'react';
import { useController, Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AstrologicalFieldsProps {
  control: Control<any>;
}

const RASHI_OPTIONS = [
  'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya',
  'Tula', 'Vrishchika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'
];

const NAKSHATRA_OPTIONS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

export const AstrologicalFields: React.FC<AstrologicalFieldsProps> = ({ control }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="birthTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Birth Time</FormLabel>
            <FormControl>
              <Input {...field} type="time" placeholder="HH:MM" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="birthPlace"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Birth Place</FormLabel>
            <FormControl>
              <Input {...field} placeholder="City, State" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="rashi"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rashi (Moon Sign)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select rashi" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {RASHI_OPTIONS.map((rashi) => (
                  <SelectItem key={rashi} value={rashi}>{rashi}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="nakshatra"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nakshatra (Birth Star)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select nakshatra" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {NAKSHATRA_OPTIONS.map((nakshatra) => (
                  <SelectItem key={nakshatra} value={nakshatra}>{nakshatra}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="manglikStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Manglik Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Anshik">Anshik (Partial)</SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
