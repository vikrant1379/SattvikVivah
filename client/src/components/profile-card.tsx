
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Star, MapPin, Briefcase, GraduationCap, User, Eye } from "lucide-react";
import type { UserProfile } from "@shared/schema";

interface ProfileCardProps {
  profile: UserProfile;
}

const ProfileCard = memo(({ profile }: ProfileCardProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatLastSeen = () => {
    const lastSeenOptions = [
      "Last seen on 09-Aug-25",
      "Last seen on 08-Aug-25", 
      "Last seen on 07-Aug-25",
      "Online now",
      "Last seen yesterday"
    ];
    return lastSeenOptions[Math.floor(Math.random() * lastSeenOptions.length)];
  };

  const formatHeight = (height: string) => {
    if (height.includes('cm')) {
      const cm = parseInt(height.replace('cm', ''));
      const totalInches = cm / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      return `${feet}ft ${inches}in`;
    }
    if (height.includes("'") && height.includes('"')) {
      return height.replace("'", "ft ").replace('"', "in");
    }
    return height;
  };

  return (
    <Card className="w-full max-w-3xl bg-white border border-gray-200 mb-4 overflow-hidden cursor-pointer">
      <CardContent className="p-0">
        <div className="flex">
          {/* Profile Image Section */}
          <div className="relative w-56 flex-shrink-0">
            {profile.profileImage ? (
              <img 
                src={profile.profileImage} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xl font-semibold text-blue-600">
                    {getInitials(profile.name)}
                  </span>
                </div>
                {/* Photo visible on acceptance overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-center px-3">
                  <div className="text-sm font-medium leading-tight">
                    <Eye className="w-6 h-6 mx-auto mb-2 opacity-80" />
                    Photo visible on<br />acceptance of<br />interest
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Information Section */}
          <div className="flex-1 p-4">
            {/* Header Section with Last Seen, Name, and Badges */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                {/* Last Seen */}
                <div className="text-xs text-gray-500 mb-2 font-medium">
                  {formatLastSeen()}
                </div>

                {/* Name, Age and Verification */}
                <div className="flex items-center mb-1">
                  <h2 className="text-2xl font-bold text-gray-900 mr-2" style={{ fontFamily: 'Devanagari MT, Sanskrit Text, Noto Sans Devanagari, serif' }}>
                    {profile.name}, {profile.age}
                  </h2>
                  {profile.verified && (
                    <svg 
                      className="w-6 h-6 text-blue-500" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  )}
                </div>
              </div>

              {/* Right side badges */}
              <div className="flex flex-col items-end space-y-2">
                {profile.verified && (
                  <Badge className="bg-red-500 text-white text-xs px-3 py-1 font-semibold rounded-md">
                    Pro
                  </Badge>
                )}
                {Math.random() > 0.5 && (
                  <Badge className="bg-pink-50 text-pink-600 text-xs px-3 py-1 border border-pink-200 font-medium rounded-full flex items-center">
                    <span className="mr-1">👍</span>
                    Most Compatible
                  </Badge>
                )}
              </div>
            </div>

            {/* Basic Info Row */}
            <div className="flex items-center text-gray-700 mb-2 text-sm font-medium">
              <span>{formatHeight(profile.height)}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span>{profile.city}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span>{profile.caste || 'Rajput-Lodhi Rajput'}</span>
            </div>

            {/* Professional Info */}
            <div className="space-y-1 mb-3">
              <div className="flex items-center text-gray-700 text-sm">
                <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">{profile.profession || 'Software Professional'}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span>{profile.annualIncome || 'Rs. 20 - 25 Lakh p.a'}</span>
              </div>
              <div className="flex items-center text-gray-700 text-sm">
                <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">{profile.education || 'M.E/M.Tech, B.E/B.Tech'}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span>{profile.maritalStatus || 'Never Married'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                className="text-red-500 border-red-300 hover:bg-red-50 hover:border-red-400 flex items-center space-x-1 rounded-full px-4 py-1.5 font-medium text-sm"
              >
                <Heart className="w-4 h-4" />
                <span>Interest</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-pink-500 border-pink-300 hover:bg-pink-50 hover:border-pink-400 flex items-center space-x-1 rounded-full px-4 py-1.5 font-medium text-sm"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Super Interest</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-orange-500 border-orange-300 hover:bg-orange-50 hover:border-orange-400 flex items-center space-x-1 rounded-full px-4 py-1.5 font-medium text-sm"
              >
                <Star className="w-4 h-4" />
                <span>Shortlist</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 flex items-center space-x-1 rounded-full px-4 py-1.5 font-medium text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
