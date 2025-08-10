
import React from 'react';
import { useController, Control } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface CommunityLineageFieldsProps {
  control: Control<any>;
}

const SATSANG_COMMUNITIES = [
  'ISKCON', 'Arya Samaj', 'Brahma Kumaris', 'Art of Living',
  'Isha Foundation', 'Ramakrishna Mission', 'Chinmaya Mission',
  'Local Spiritual Groups', 'Vedanta Society', 'Yoga Communities',
  'Meditation Centers', 'Temple Communities'
];

const PILGRIMAGE_EXPERIENCES = [
  'Char Dham Yatra', 'Kailash Mansarovar', 'Varanasi', 'Rishikesh',
  'Haridwar', 'Vrindavan', 'Dwarka', 'Jagannath Puri',
  'Tirupati', 'Kanchipuram', 'Rameshwaram', 'Kedarnath',
  'Badrinath', 'Amarnath', 'Shirdi', 'Ajmer Sharif'
];

const FESTIVAL_CELEBRATIONS = [
  'Diwali', 'Holi', 'Dussehra', 'Navratri', 'Janmashtami',
  'Ram Navami', 'Shivratri', 'Karva Chauth', 'Raksha Bandhan',
  'Guru Purnima', 'Ekadashi', 'Ganga Aarti', 'Regional Festivals'
];

const PREFERRED_DEITIES = [
  'Krishna', 'Rama', 'Shiva', 'Vishnu', 'Devi/Shakti',
  'Ganesha', 'Hanuman', 'Saraswati', 'Lakshmi', 'Durga',
  'Guru/Spiritual Master', 'All Divine Forms'
];

export const CommunityLineageFields: React.FC<CommunityLineageFieldsProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="discipleLineage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Guru-Disciple Lineage (if any)</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="e.g., Gaudiya Vaishnava, Advaita Vedanta, etc."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="spiritualMentor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Spiritual Mentor/Guru Name (optional)</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Name of your spiritual guide"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="satsangCommunity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Satsang/Spiritual Communities</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {SATSANG_COMMUNITIES.map((community) => (
                <FormItem key={community} className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(community)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), community]
                          : (field.value || []).filter((value: string) => value !== community);
                        field.onChange(updatedValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">{community}</FormLabel>
                </FormItem>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="pilgrimageExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pilgrimage Experiences</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {PILGRIMAGE_EXPERIENCES.map((place) => (
                <FormItem key={place} className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(place)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), place]
                          : (field.value || []).filter((value: string) => value !== place);
                        field.onChange(updatedValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">{place}</FormLabel>
                </FormItem>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="festivalCelebrations"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Festival Celebrations</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {FESTIVAL_CELEBRATIONS.map((festival) => (
                <FormItem key={festival} className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(festival)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), festival]
                          : (field.value || []).filter((value: string) => value !== festival);
                        field.onChange(updatedValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">{festival}</FormLabel>
                </FormItem>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="preferredDeities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Deities/Divine Forms</FormLabel>
            <div className="grid grid-cols-2 gap-4">
              {PREFERRED_DEITIES.map((deity) => (
                <FormItem key={deity} className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(deity)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), deity]
                          : (field.value || []).filter((value: string) => value !== deity);
                        field.onChange(updatedValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">{deity}</FormLabel>
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
