
import React from 'react';
import { useController, Control } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface DharmicGoalsFieldsProps {
  control: Control<any>;
}

const ASHRAMA_GOALS = [
  'Dharmic Family Life', 'Spiritual Parenting', 'Joint Sadhana Practice',
  'Seva Together', 'Moksha Preparation', 'Artha with Dharma',
  'Creating Sattvic Home', 'Teaching Children Dharma'
];

const DHARMIC_CAREER_PATHS = [
  'Spiritual Teaching', 'Ayurvedic Practice', 'Yoga Instruction',
  'Vedic Counseling', 'Sacred Arts', 'Sustainable Agriculture',
  'Social Service', 'Traditional Medicine', 'Spiritual Writing',
  'Temple Service', 'Other Dharmic Work'
];

const SEVA_PREFERENCES = [
  'Temple Service', 'Elder Care', 'Teaching Children',
  'Environmental Protection', 'Animal Welfare', 'Feeding Poor',
  'Spiritual Counseling', 'Community Service', 'Healthcare Service',
  'Rural Development', 'Vedic Education'
];

const SPIRITUAL_GOALS = [
  'Daily Meditation', 'Self-Realization', 'Karma Yoga Practice',
  'Bhakti Development', 'Jnana Pursuit', 'Dharmic Living',
  'Moksha Preparation', 'Guru Service', 'Scriptural Study',
  'Pilgrimage Journey', 'Spiritual Community Building'
];

const FAMILY_VALUES = [
  'Joint Family System', 'Respect for Elders', 'Vedic Traditions',
  'Sanskrit Learning', 'Festival Celebrations', 'Guru Reverence',
  'Ahimsa Practice', 'Truth in Relationships', 'Simple Living',
  'Spiritual Education', 'Cultural Preservation'
];

export const DharmicGoalsFields: React.FC<DharmicGoalsFieldsProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="ashramsGoals"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grihastha Ashrama Goals</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {ASHRAMA_GOALS.map((goal) => (
                <FormItem key={goal} className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(goal)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), goal]
                          : (field.value || []).filter((value: string) => value !== goal);
                        field.onChange(updatedValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">{goal}</FormLabel>
                </FormItem>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="dharmicCareerPath"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dharmic Career Path</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select career path" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {DHARMIC_CAREER_PATHS.map((path) => (
                  <SelectItem key={path} value={path}>{path}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="sevaPreferences"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Seva (Service) Preferences</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {SEVA_PREFERENCES.map((seva) => (
                <FormItem key={seva} className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(seva)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), seva]
                          : (field.value || []).filter((value: string) => value !== seva);
                        field.onChange(updatedValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">{seva}</FormLabel>
                </FormItem>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="spiritualGoals"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Personal Spiritual Goals</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {SPIRITUAL_GOALS.map((goal) => (
                <FormItem key={goal} className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(goal)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), goal]
                          : (field.value || []).filter((value: string) => value !== goal);
                        field.onChange(updatedValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">{goal}</FormLabel>
                </FormItem>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="familyValues"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Family Values & Traditions</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {FAMILY_VALUES.map((value) => (
                <FormItem key={value} className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(value)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), value]
                          : (field.value || []).filter((v: string) => v !== value);
                        field.onChange(updatedValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">{value}</FormLabel>
                </FormItem>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="childRearingPhilosophy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Child Rearing Philosophy</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Describe your approach to raising children with dharmic values..."
                className="min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
