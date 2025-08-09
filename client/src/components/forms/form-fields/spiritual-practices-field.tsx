
import React from 'react';
import { useController, Control } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useStaticData } from '@/hooks';

interface SpiritualPracticesFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
}

export const SpiritualPracticesField: React.FC<SpiritualPracticesFieldProps> = ({
  name,
  control,
  label = 'Spiritual Practices'
}) => {
  const { spiritualPractices, loadSpiritualPractices } = useStaticData();

  React.useEffect(() => {
    if (spiritualPractices.length === 0) {
      loadSpiritualPractices();
    }
  }, [spiritualPractices.length, loadSpiritualPractices]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="grid grid-cols-2 gap-4">
            {spiritualPractices.map((practice) => (
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
  );
};
