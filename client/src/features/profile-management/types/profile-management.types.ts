
export interface ProfileSection {
  id: string;
  title: string;
  weight: number;
  completed: boolean;
  icon: React.ReactNode;
}

export interface BirthDetails {
  date: string;
  time: string;
  place: string;
}

export interface AstrologicalData {
  rashi?: string;
  nakshatra?: string;
  manglikStatus?: string;
}

export interface SectionCompletion {
  name: string;
  weight: number;
  completionPercentage: number;
  completedFields: number;
  totalFields: number;
  fields: string[];
}

export interface ProfileCompletionResult {
  overallPercentage: number;
  sectionCompletions: SectionCompletion[];
}
