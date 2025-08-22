
export interface IConsultationTier {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
  responseTime: string;
  price: number;
  isPopular?: boolean;
}

export interface IExpertCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface IConsultationForm {
  consultationType: string;
  query: string;
  preferredContact: 'email' | 'phone' | 'in-app' | 'video';
  urgencyLevel: 'general' | 'priority';
  tier?: string;
  spiritualGoals?: string[];
}

export interface IConsultationRequest extends IConsultationForm {
  id: string;
  userId: string;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  assignedExpert?: string;
  responseTime?: Date;
}

export interface IExpertProfile {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  experience: number;
  languages: string[];
  rating: number;
  totalConsultations: number;
  avatar?: string;
  bio: string;
}

export interface ISacredMilestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  karmaPoints: number;
  unlockedFeatures: string[];
}
