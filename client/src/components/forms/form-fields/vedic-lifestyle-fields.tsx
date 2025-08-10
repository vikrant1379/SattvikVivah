
import React from 'react';
import { useController, Control } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface VedicLifestyleFieldsProps {
  control: Control<any>;
}

const FASTING_PRACTICES = [
  'Ekadashi Vrat', 'Pradosh Vrat', 'Shivaratri Vrat', 'Karva Chauth', 
  'Navratri Vrat', 'Janmashtami Vrat', 'Weekly Vrat', 'Occasional Fasting'
];

const SEASONAL_PRACTICES = [
  'Hemant Ritucharya', 'Shishir Ritucharya', 'Vasant Ritucharya',
  'Grishma Ritucharya', 'Varsha Ritucharya', 'Sharad Ritucharya'
];

export const VedicLifestyleFields: React.FC<VedicLifestyleFieldsProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="ayurvedicConstitution"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ayurvedic Constitution (Prakriti)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select constitution" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Vata">Vata</SelectItem>
                <SelectItem value="Pitta">Pitta</SelectItem>
                <SelectItem value="Kapha">Kapha</SelectItem>
                <SelectItem value="Vata-Pitta">Vata-Pitta</SelectItem>
                <SelectItem value="Pitta-Kapha">Pitta-Kapha</SelectItem>
                <SelectItem value="Vata-Kapha">Vata-Kapha</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="wakeUpTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wake Up Time</FormLabel>
              <FormControl>
                <Input {...field} type="time" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="sleepTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sleep Time</FormLabel>
              <FormControl>
                <Input {...field} type="time" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="fastingPractices"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fasting Practices</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {FASTING_PRACTICES.map((practice) => (
                <FormItem key={practice} className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(practice)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), practice]
                          : (field.value || []).filter((value: string) => value !== practice);
                        field.onChange(updatedValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">{practice}</FormLabel>
                </FormItem>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
