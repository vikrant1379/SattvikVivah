
import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Header } from '@/components/header';
import { ProfileManagement } from '@/components/profile-management';
import type { UserProfile } from '@shared/schema';

// Mock user profile data - in real app this would come from API
const mockUserProfile: UserProfile = {
  id: 'SVC40A72',
  userId: 'demo-user-id',
  name: 'Demo User',
  age: 28,
  gender: 'Female',
  height: '5\'4"',
  city: 'Mumbai',
  state: 'Maharashtra',
  country: 'IN',
  religion: 'Hindu',
  caste: 'Brahmin',
  motherTongue: 'Hindi',
  profession: 'Software Engineer',
  education: 'B.Tech',
  annualIncome: 'Rs. 8 - 12 Lakh p.a',
  maritalStatus: 'Never Married',
  eatingHabits: 'Vegetarian',
  smokingHabits: 'No',
  drinkingHabits: 'No',
  bio: 'Looking for a spiritually aligned life partner for the journey of Grihastha ashram.',
  spiritualPractices: ['Meditation & Dhyana', 'Daily Sadhana'],
  sacredTexts: ['Bhagavad Gita', 'Upanishads'],
  guruLineage: 'Traditional',
  familyValues: ['Traditional', 'Spiritual'],
  spiritualGoals: ['Self-realization', 'Dharmic Living'],
  verified: true,
  active: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const ProfileEditPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);

  const handleProfileUpdate = (updatedData: Partial<UserProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...updatedData,
      updatedAt: new Date()
    }));
    
    // In real app, this would make an API call to update the profile
    console.log('Profile updated:', updatedData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <button 
            onClick={() => setLocation('/')}
            className="text-orange-600 hover:text-orange-700 flex items-center space-x-2"
          >
            <span>← Back to Home</span>
          </button>
        </div>
        
        <ProfileManagement 
          profile={profile}
          onProfileUpdate={handleProfileUpdate}
        />
      </div>
    </div>
  );
};

export default ProfileEditPage;
