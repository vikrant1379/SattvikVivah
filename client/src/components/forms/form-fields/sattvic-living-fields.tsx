
import React from 'react';
import { useController, Control } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface SattvicLivingFieldsProps {
  control: Control<any>;
}

const VASTU_PREFERENCES = [
  'North-East Facing Home', 'Separate Pooja Room', 'Natural Lighting',
  'Proper Ventilation', 'Plants in Home', 'Tulsi Plant',
  'Vastu Compliant Kitchen', 'No Mirrors in Bedroom'
];

const MUSIC_PREFERENCES = [
  'Classical Indian Ragas', 'Devotional Bhajans', 'Vedic Chanting',
  'Instrumental Music', 'Nature Sounds', 'Kirtan',
  'Minimal Modern Music', 'Silence/Meditation'
];

const READING_HABITS = [
  'Daily Scripture Reading', 'Weekly Spiritual Books',
  'Monthly Dharmic Literature', 'Occasional Spiritual Reading',
  'Guru\'s Teachings', 'Ancient Wisdom Texts',
  'Contemporary Spiritual Authors', 'Rarely Read Spiritual Content'
];

const TECHNOLOGY_PHILOSOPHY = [
  'Minimal Technology Use', 'Dharmic Content Only',
  'Balanced Digital Life', 'Technology for Service',
  'Avoid Social Media', 'Sacred Technology Use',
  'Digital Detox Regularly', 'Technology as Tool'
];

const WEALTH_PERSPECTIVES = [
  'Simple Living High Thinking', 'Enough for Needs Only',
  'Wealth for Dharmic Purposes', 'Prosperity with Values',
  'Minimalist Lifestyle', 'Abundant but Detached',
  'Wealth as Service Tool', 'Material Contentment'
];

export const SattvicLivingFields: React.FC<SattvicLivingFieldsProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="vastuPreferences"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Vastu & Home Environment Preferences</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {VASTU_PREFERENCES.map((preference) => (
                <FormItem key={preference} className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(preference)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), preference]
                          : (field.value || []).filter((value: string) => value !== preference);
                        field.onChange(updatedValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">{preference}</FormLabel>
                </FormItem>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="musicPreferences"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Music & Arts Appreciation</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {MUSIC_PREFERENCES.map((music) => (
                <FormItem key={music} className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(music)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), music]
                          : (field.value || []).filter((value: string) => value !== music);
                        field.onChange(updatedValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">{music}</FormLabel>
                </FormItem>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="readingHabits"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sacred Texts & Reading Habits</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select reading frequency" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {READING_HABITS.map((habit) => (
                  <SelectItem key={habit} value={habit}>{habit}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="technologyPhilosophy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Technology Usage Philosophy</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select approach" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {TECHNOLOGY_PHILOSOPHY.map((philosophy) => (
                  <SelectItem key={philosophy} value={philosophy}>{philosophy}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="wealthPerspective"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Wealth & Material Possession Perspective</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select perspective" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {WEALTH_PERSPECTIVES.map((perspective) => (
                  <SelectItem key={perspective} value={perspective}>{perspective}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="meditationDepth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Daily Meditation Duration (minutes)</FormLabel>
            <FormControl>
              <div className="px-3">
                <Slider
                  min={0}
                  max={180}
                  step={15}
                  value={[field.value || 0]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>0 min</span>
                  <span>{field.value || 0} min</span>
                  <span>3+ hours</span>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="serviceHours"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Weekly Seva/Service Hours</FormLabel>
            <FormControl>
              <div className="px-3">
                <Slider
                  min={0}
                  max={40}
                  step={2}
                  value={[field.value || 0]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>0 hrs</span>
                  <span>{field.value || 0} hrs/week</span>
                  <span>40+ hrs</span>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
