import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ProfileEditPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Update your spiritual profile and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Profile editing functionality coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileEditPage;