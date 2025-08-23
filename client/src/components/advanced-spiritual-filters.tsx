
import React, { memo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Filter, Star, Heart, Brain, Target } from 'lucide-react';

interface SpiritualFilter {
  spiritualPractices: string[];
  meditationStyles: string[];
  philosophicalSchools: string[];
  sacredTexts: string[];
  guruLineages: string[];
  consciousnessLevel: number;
  serviceOrientation: string[];
  spiritualGoals: string[];
  compatibilityMinimum: number;
}

const AdvancedSpiritualFilters = memo(() => {
  const [filters, setFilters] = useState<SpiritualFilter>({
    spiritualPractices: [],
    meditationStyles: [],
    philosophicalSchools: [],
    sacredTexts: [],
    guruLineages: [],
    consciousnessLevel: 50,
    serviceOrientation: [],
    spiritualGoals: [],
    compatibilityMinimum: 70
  });

  const spiritualPractices = [
    'Daily Meditation', 'Yoga Practice', 'Pranayama', 'Chanting/Kirtan',
    'Temple Visits', 'Scriptural Study', 'Seva/Service', 'Pilgrimage',
    'Fasting/Vrat', 'Nature Connection', 'Silent Retreats', 'Spiritual Reading'
  ];

  const meditationStyles = [
    'Vipassana', 'Transcendental', 'Zen', 'Mindfulness',
    'Concentrative', 'Walking Meditation', 'Loving-Kindness', 'Mantra Meditation',
    'Chakra Meditation', 'Kundalini', 'Trataka', 'Yoga Nidra'
  ];

  const philosophicalSchools = [
    'Advaita Vedanta', 'Dvaita', 'Vishishtadvaita', 'Samkhya',
    'Kashmir Shaivism', 'Tantra', 'Buddhism', 'Jainism',
    'Integral Yoga', 'Kriya Yoga', 'Bhakti Tradition', 'Karma Yoga'
  ];

  const sacredTexts = [
    'Bhagavad Gita', 'Upanishads', 'Vedas', 'Ramayana',
    'Mahabharata', 'Puranas', 'Yoga Sutras', 'Dharma Shastras',
    'Buddhist Sutras', 'Jain Agamas', 'Guru Granth Sahib', 'Tantras'
  ];

  const guruLineages = [
    'Gaudiya Vaishnava', 'Advaita Vedanta', 'Kashmir Shaivism', 'Nath Sampradaya',
    'Ramanuja Sampradaya', 'Madhva Sampradaya', 'Kriya Yoga', 'Integral Yoga',
    'Art of Living', 'Isha Foundation', 'Brahma Kumaris', 'Self-Realization Fellowship'
  ];

  const serviceOrientation = [
    'Education/Teaching', 'Healthcare/Healing', 'Environmental Protection', 'Animal Welfare',
    'Elder Care', 'Spiritual Guidance', 'Community Building', 'Cultural Preservation',
    'Disaster Relief', 'Women Empowerment', 'Child Welfare', 'Interfaith Harmony'
  ];

  const spiritualGoals = [
    'Self-Realization', 'God-Realization', 'Inner Peace', 'Wisdom Cultivation',
    'Compassion Development', 'Service to Humanity', 'Cultural Preservation',
    'Spiritual Teaching', 'Family Dharma', 'Community Leadership',
    'Scriptural Mastery', 'Meditation Mastery'
  ];

  const handleArrayFilter = (category: keyof SpiritualFilter, value: string) => {
    if (Array.isArray(filters[category])) {
      const currentArray = filters[category] as string[];
      const updated = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      setFilters(prev => ({
        ...prev,
        [category]: updated
      }));
    }
  };

  const clearAllFilters = () => {
    setFilters({
      spiritualPractices: [],
      meditationStyles: [],
      philosophicalSchools: [],
      sacredTexts: [],
      guruLineages: [],
      consciousnessLevel: 50,
      serviceOrientation: [],
      spiritualGoals: [],
      compatibilityMinimum: 70
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((count, filterValue) => {
      if (Array.isArray(filterValue)) {
        return count + filterValue.length;
      } else if (typeof filterValue === 'number' && filterValue !== 50 && filterValue !== 70) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  const FilterSection = ({ 
    title, 
    options, 
    category,
    icon: Icon 
  }: { 
    title: string; 
    options: string[]; 
    category: keyof SpiritualFilter;
    icon: React.ComponentType<any>;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Icon className="w-4 h-4 text-saffron" />
        <h4 className="font-semibold text-indigo-night">{title}</h4>
        {Array.isArray(filters[category]) && (filters[category] as string[]).length > 0 && (
          <Badge className="bg-saffron/20 text-saffron text-xs">
            {(filters[category] as string[]).length}
          </Badge>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${category}-${option}`}
              checked={Array.isArray(filters[category]) && (filters[category] as string[]).includes(option)}
              onCheckedChange={() => handleArrayFilter(category, option)}
              className="data-[state=checked]:bg-saffron data-[state=checked]:border-saffron"
            />
            <label 
              htmlFor={`${category}-${option}`}
              className="text-sm text-indigo-night/80 cursor-pointer leading-tight"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="bg-white border-temple-gold/30 sticky top-4">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-crimson text-indigo-night flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-saffron" />
            <span>Spiritual Compatibility Filters</span>
          </div>
          {getActiveFiltersCount() > 0 && (
            <Badge className="bg-saffron text-white">
              {getActiveFiltersCount()} active
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Spiritual Compatibility Minimum */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-indigo-night flex items-center space-x-2">
              <Heart className="w-4 h-4 text-saffron" />
              <span>Minimum Compatibility</span>
            </label>
            <span className="text-saffron font-bold">{filters.compatibilityMinimum}%</span>
          </div>
          <Slider
            value={[filters.compatibilityMinimum]}
            onValueChange={(value) => setFilters(prev => ({ ...prev, compatibilityMinimum: value[0] }))}
            max={100}
            min={50}
            step={5}
            className="w-full"
          />
        </div>

        <Separator className="border-temple-gold/20" />

        {/* Consciousness Level */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-indigo-night flex items-center space-x-2">
              <Brain className="w-4 h-4 text-saffron" />
              <span>Consciousness Level</span>
            </label>
            <span className="text-saffron font-bold">{filters.consciousnessLevel}%</span>
          </div>
          <Slider
            value={[filters.consciousnessLevel]}
            onValueChange={(value) => setFilters(prev => ({ ...prev, consciousnessLevel: value[0] }))}
            max={100}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Seeker</span>
            <span>Practitioner</span>
            <span>Advanced</span>
          </div>
        </div>

        <Separator className="border-temple-gold/20" />

        {/* Spiritual Practices */}
        <FilterSection
          title="Spiritual Practices"
          options={spiritualPractices}
          category="spiritualPractices"
          icon={Star}
        />

        <Separator className="border-temple-gold/20" />

        {/* Meditation Styles */}
        <FilterSection
          title="Meditation Styles"
          options={meditationStyles}
          category="meditationStyles"
          icon={Brain}
        />

        <Separator className="border-temple-gold/20" />

        {/* Philosophical Schools */}
        <FilterSection
          title="Philosophical Schools"
          options={philosophicalSchools}
          category="philosophicalSchools"
          icon={Target}
        />

        <Separator className="border-temple-gold/20" />

        {/* Sacred Texts */}
        <FilterSection
          title="Sacred Texts"
          options={sacredTexts}
          category="sacredTexts"
          icon={Star}
        />

        <Separator className="border-temple-gold/20" />

        {/* Guru Lineages */}
        <FilterSection
          title="Guru Lineages"
          options={guruLineages}
          category="guruLineages"
          icon={Heart}
        />

        <Separator className="border-temple-gold/20" />

        {/* Service Orientation */}
        <FilterSection
          title="Service Orientation"
          options={serviceOrientation}
          category="serviceOrientation"
          icon={Target}
        />

        <Separator className="border-temple-gold/20" />

        {/* Spiritual Goals */}
        <FilterSection
          title="Spiritual Goals"
          options={spiritualGoals}
          category="spiritualGoals"
          icon={Star}
        />

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4">
          <Button 
            className="flex-1 bg-saffron hover:bg-saffron/90 text-white"
            onClick={() => console.log('Apply filters:', filters)}
          >
            Apply Filters
          </Button>
          <Button 
            variant="outline" 
            onClick={clearAllFilters}
            className="px-4 border-temple-gold/30 hover:bg-sandalwood/30"
          >
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

AdvancedSpiritualFilters.displayName = 'AdvancedSpiritualFilters';

export { AdvancedSpiritualFilters };
