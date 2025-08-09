
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
    <Card className="w-full max-w-4xl hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 mb-6 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          {/* Profile Image Section */}
          <div className="relative w-72 h-64 flex-shrink-0">
            {profile.profileImage ? (
              <img 
                src={profile.profileImage} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-blue-600">
                    {getInitials(profile.name)}
                  </span>
                </div>
                {/* Photo visible on acceptance overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-center px-4">
                  <div className="text-base font-medium leading-relaxed">
                    <Eye className="w-8 h-8 mx-auto mb-3 opacity-80" />
                    Photo visible on<br />acceptance of<br />interest
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Information Section */}
          <div className="flex-1 p-6">
            {/* Header Section with Last Seen, Name, and Badges */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {/* Last Seen */}
                <div className="text-sm text-gray-500 mb-3 font-medium">
                  {formatLastSeen()}
                </div>

                {/* Name, Age and Verification */}
                <div className="flex items-center mb-4">
                  <h2 className="text-3xl font-bold text-gray-900 mr-3">
                    {profile.name}, {profile.age}
                  </h2>
                  {profile.verified && (
                    <svg 
                      className="w-6 h-6 text-blue-500" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  )}
                </div>
              </div>

              {/* Right side badges */}
              <div className="flex flex-col items-end space-y-3">
                {profile.verified && (
                  <Badge className="bg-red-500 text-white text-sm px-4 py-1.5 font-semibold rounded-md">
                    Pro
                  </Badge>
                )}
                {Math.random() > 0.5 && (
                  <Badge className="bg-pink-50 text-pink-600 text-sm px-4 py-1.5 border border-pink-200 font-medium rounded-full flex items-center">
                    <span className="mr-1">👍</span>
                    Most Compatible
                  </Badge>
                )}
              </div>
            </div>

            {/* Basic Info Row */}
            <div className="flex items-center text-gray-700 mb-4 text-base font-medium">
              <span>{formatHeight(profile.height)}</span>
              <span className="mx-3 text-gray-400">•</span>
              <span>{profile.city}</span>
              <span className="mx-3 text-gray-400">•</span>
              <span>{profile.caste || 'Rajput-Lodhi Rajput'}</span>
            </div>

            {/* Professional Info */}
            <div className="space-y-3 mb-5">
              <div className="flex items-center text-gray-700 text-base">
                <Briefcase className="w-5 h-5 mr-3 text-gray-500" />
                <span className="font-medium">{profile.profession || 'Software Professional'}</span>
                <span className="mx-3 text-gray-400">•</span>
                <span>{profile.annualIncome || 'Rs. 20 - 25 Lakh p.a'}</span>
              </div>
              <div className="flex items-center text-gray-700 text-base">
                <GraduationCap className="w-5 h-5 mr-3 text-gray-500" />
                <span className="font-medium">{profile.education || 'M.E/M.Tech, B.E/B.Tech'}</span>
                <span className="mx-3 text-gray-400">•</span>
                <span>{profile.maritalStatus || 'Never Married'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="lg"
                className="text-red-500 border-red-300 hover:bg-red-50 hover:border-red-400 flex items-center space-x-2 rounded-full px-6 py-2.5 font-medium text-base"
              >
                <Heart className="w-5 h-5" />
                <span>Interest</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-pink-500 border-pink-300 hover:bg-pink-50 hover:border-pink-400 flex items-center space-x-2 rounded-full px-6 py-2.5 font-medium text-base"
              >
                <Heart className="w-5 h-5 fill-current" />
                <span>Super Interest</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-orange-500 border-orange-300 hover:bg-orange-50 hover:border-orange-400 flex items-center space-x-2 rounded-full px-6 py-2.5 font-medium text-base"
              >
                <Star className="w-5 h-5" />
                <span>Shortlist</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 flex items-center space-x-2 rounded-full px-6 py-2.5 font-medium text-base"
              >
                <MessageCircle className="w-5 h-5" />
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
