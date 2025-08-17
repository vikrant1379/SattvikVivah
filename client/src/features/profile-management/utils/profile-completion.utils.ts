
import type { UserProfile } from '@shared/schema';
import type { ProfileCompletionResult, SectionCompletion } from '../types/profile-management.types';

export const calculateSectionCompletion = (profile: UserProfile, sectionId: string): number => {
  switch (sectionId) {
    case 'basic':
      const basicFields = [
        profile.name,
        profile.age,
        profile.height,
        profile.motherTongue,
        profile.religion,
        profile.caste,
        profile.rashi,
        profile.nakshatra,
        profile.horoscope
      ];
      return Math.round((basicFields.filter(field => field).length / basicFields.length) * 100);

    case 'about':
      const aboutFields = [
        profile.bio,
        profile.eatingHabits,
        profile.drinkingHabits,
        profile.smokingHabits
      ];
      return Math.round((aboutFields.filter(field => field).length / aboutFields.length) * 100);

    case 'education':
      const educationFields = [
        profile.education,
        profile.profession,
        profile.annualIncome
      ];
      return Math.round((educationFields.filter(field => field).length / educationFields.length) * 100);

    case 'family':
      const familyFields = [
        profile.familyValues?.length > 0 ? 'filled' : null
      ];
      return familyFields[0] ? 100 : 0;

    case 'preferences':
      const preferenceFields = [
        profile.spiritualGoals?.length > 0 ? 'filled' : null,
        profile.sacredTexts?.length > 0 ? 'filled' : null,
        profile.guruLineage
      ];
      return Math.round((preferenceFields.filter(field => field).length / preferenceFields.length) * 100);

    case 'photos':
      return profile.photoUrl ? 100 : 0;

    default:
      return 0;
  }
};

export const calculateProfileCompletion = (formData: Partial<UserProfile>): ProfileCompletionResult => {
  const sections = [
    {
      name: 'Basic Information',
      weight: 15,
      fields: ['name', 'age', 'gender', 'height', 'location', 'religion', 'caste']
    },
    {
      name: 'About Me',
      weight: 20,
      fields: ['selfDescription', 'spiritualJourney', 'dailyRoutine']
    },
    {
      name: 'Family Details',
      weight: 15,
      fields: ['familyBackground', 'familyOccupation', 'familyLifestyle', 'fatherOccupation', 'motherOccupation']
    },
    {
      name: 'Education & Career',
      weight: 15,
      fields: ['education', 'profession', 'annualIncome']
    },
    {
      name: 'Partner Preferences',
      weight: 20,
      fields: ['idealPartner', 'spiritualAlignment', 'relocationPreference', 'careerChoice']
    },
    {
      name: 'Spiritual Details',
      weight: 15,
      fields: ['spiritualPractices', 'sacredTexts', 'spiritualPath', 'coreValues']
    }
  ];

  const sectionCompletions: SectionCompletion[] = sections.map(section => {
    const completedFields = section.fields.filter(field => {
      const value = formData[field as keyof typeof formData];
      return value !== undefined && value !== null && value !== '' &&
             (!Array.isArray(value) || value.length > 0);
    });
    
    const completionPercentage = (completedFields.length / section.fields.length) * 100;
    
    return {
      ...section,
      completionPercentage: Math.round(completionPercentage),
      completedFields: completedFields.length,
      totalFields: section.fields.length
    };
  });

  const totalScore = sectionCompletions.reduce((total, section) => {
    return total + (section.completionPercentage * section.weight / 100);
  }, 0);

  return {
    overallPercentage: Math.round(totalScore),
    sectionCompletions
  };
};
