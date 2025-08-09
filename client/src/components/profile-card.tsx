
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Star, MapPin, Briefcase, GraduationCap, Clock, Eye, User, Phone, Images, CheckCircle } from "lucide-react";
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
      "Last seen at 4:41 PM",
      "Last seen at 1:48 PM", 
      "Last seen at 11:51 AM",
      "Last seen on 09-Aug-25",
      "Last seen yesterday"
    ];
    return lastSeenOptions[Math.floor(Math.random() * lastSeenOptions.length)];
  };

  const getOneLineBio = () => {
    return profile.bio?.split('.')[0] || "Family-oriented person looking for a life partner to share spiritual journey";
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
    <Card className="w-full bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 mb-4 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          {/* Profile Image Section */}
          <div className="relative w-36 h-48 flex-shrink-0">
            {profile.profileImage ? (
              <img 
                src={profile.profileImage} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-lg font-semibold text-gray-600">
                    {getInitials(profile.name)}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-center px-3">
                  <div className="text-xs font-medium leading-tight">
                    <Eye className="w-4 h-4 mx-auto mb-1" />
                    Photo visible on acceptance of interest
                  </div>
                </div>
              </div>
            )}
            
            {/* Photo Count */}
            <div className="absolute top-2 right-2">
              <div className="bg-black/70 text-white rounded px-1.5 py-0.5 text-xs flex items-center">
                <Images className="w-3 h-3 mr-1" />
                2
              </div>
            </div>
          </div>

          {/* Profile Information Section */}
          <div className="flex-1 p-4 relative">
            {/* Pro Badge */}
            <div className="absolute top-3 right-3">
              {profile.verified && (
                <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 font-medium">
                  Pro
                </Badge>
              )}
            </div>

            {/* Most Compatible Badge */}
            {Math.random() > 0.6 && (
              <div className="absolute top-3 right-16">
                <Badge className="bg-pink-50 text-pink-600 border-pink-200 text-xs px-2 py-0.5 font-medium">
                  🔥 Most Compatible
                </Badge>
              </div>
            )}

            {/* Last Seen */}
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <Clock className="w-3 h-3 mr-1" />
              {formatLastSeen()}
            </div>

            {/* Name, Age and Verification */}
            <div className="flex items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-900 mr-2">
                {profile.name}, {profile.age}
              </h3>
              {profile.verified && (
                <CheckCircle className="w-4 h-4 text-blue-500 fill-current" />
              )}
            </div>

            {/* Basic Info Line 1 */}
            <div className="text-sm text-gray-600 mb-1">
              <span className="font-medium">{formatHeight(profile.height)}</span>
              <span className="mx-1">•</span>
              <span>{profile.city}</span>
              <span className="mx-1">•</span>
              <span>{profile.caste || 'Caste not specified'}</span>
            </div>

            {/* Professional Info Line 1 */}
            <div className="flex items-center text-sm text-gray-700 mb-1">
              <Briefcase className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
              <span className="font-medium">{profile.profession || 'Software Professional'}</span>
              <span className="mx-1.5">•</span>
              <span>{profile.annualIncome || 'Rs. 15 - 20 Lakh p.a'}</span>
            </div>

            {/* Professional Info Line 2 */}
            <div className="flex items-center text-sm text-gray-700 mb-3">
              <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
              <span>{profile.education || 'B.E/B.Tech'}</span>
              <span className="mx-1.5">•</span>
              <span>{profile.maritalStatus || 'Never Married'}</span>
            </div>

            {/* Bio Quote */}
            <div className="text-sm text-gray-600 mb-3 italic">
              "{getOneLineBio()}"
            </div>

            {/* Religion and Language Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {profile.religion && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200 px-2 py-0.5 rounded-full">
                  {profile.religion}
                </Badge>
              )}
              {profile.motherTongue && (
                <Badge variant="outline" className="text-xs bg-green-50 text-green-600 border-green-200 px-2 py-0.5 rounded-full">
                  {profile.motherTongue}
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-500 border-red-200 hover:bg-red-50 flex items-center gap-1.5 px-3 py-1.5 h-8 text-xs font-medium"
              >
                <Heart className="w-3.5 h-3.5" />
                Interest
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-pink-500 border-pink-200 hover:bg-pink-50 flex items-center gap-1.5 px-3 py-1.5 h-8 text-xs font-medium"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                Super Interest
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-orange-500 border-orange-200 hover:bg-orange-50 flex items-center gap-1.5 px-3 py-1.5 h-8 text-xs font-medium"
              >
                <Star className="w-3.5 h-3.5" />
                Shortlist
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-gray-600 border-gray-200 hover:bg-gray-50 flex items-center gap-1.5 px-3 py-1.5 h-8 text-xs font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Chat
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
