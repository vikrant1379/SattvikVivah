
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Star, MapPin, Briefcase, GraduationCap, User, Eye, CircleCheck } from "lucide-react";
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
                  <h2 className="text-2xl font-bold text-gray-900 mr-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                    {profile.name}, {profile.age}
                  </h2>
                  {profile.verified && (
                    <svg 
                      className="w-5 h-5 ml-1" 
                      viewBox="0 0 24 24" 
                      aria-label="Verified account"
                    >
                      <g>
                        <path 
                          d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" 
                          fill="#1d9bf0"
                        />
                      </g>
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
              <MapPin className="w-3 h-3 mr-1 text-gray-500" />
              <span>{profile.city}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span>{profile.caste || 'Chandravanshi Kahar'}</span>
            </div>

            {/* Professional Info */}
            <div className="space-y-1 mb-3">
              <div className="flex items-center text-gray-700 text-sm">
                <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">{profile.profession || 'Accounting Professional'}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span>{profile.annualIncome || 'Rs. 5 - 7.5 Lakh p.a'}</span>
              </div>
              <div className="flex items-center text-gray-700 text-sm">
                <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
                <span className="font-medium">{profile.education || 'MBA/PGDM, B.Com'}</span>
                <span className="mx-2 text-gray-400">•</span>
                <CircleCheck className="w-4 h-4 mr-1 text-gray-500" />
                <span>{profile.maritalStatus || 'Never Married'}</span>
              </div>
            </div>

            {/* One-liner About Section */}
            {(profile.bio || profile.oneLiner) && (
              <div className="mb-3 text-sm text-gray-700 italic">
                "{profile.bio || profile.oneLiner || 'Looking for a life partner who shares similar values and dreams for a beautiful future together.'}"
              </div>
            )}

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
