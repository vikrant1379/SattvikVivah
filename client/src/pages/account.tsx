
import React from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProfileManagement } from '@/components/profile-management';
import { useProfile } from '@/hooks/use-profile';

export const AccountPage: React.FC = () => {
  const { profile, updateProfile } = useProfile();

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-600">Loading profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <ProfileManagement
          profile={profile}
          onProfileUpdate={updateProfile}
        />
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
