
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
    // Mock last seen data - in real app this would come from profile data
    const lastSeenOptions = [
      "Last seen at 4:41 PM",
      "Last seen at 1:48 PM", 
      "Last seen at 11:51 AM",
      "Online now",
      "Last seen yesterday"
    ];
    return lastSeenOptions[Math.floor(Math.random() * lastSeenOptions.length)];
  };

  const getOneLineBio = () => {
    return profile.bio?.split('.')[0] || "Seeking a caring and understanding partner for a blessed journey together";
  };

  const formatHeight = (height: string) => {
    // Convert height to ft and inches format
    if (height.includes('cm')) {
      const cm = parseInt(height.replace('cm', ''));
      const totalInches = cm / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      return `${feet}ft ${inches}in`;
    }
    // Convert from 5'3" format to 5ft 3in format
    if (height.includes("'") && height.includes('"')) {
      return height.replace("'", "ft ").replace('"', "in");
    }
    return height;
  };

  return (
    <Card className="w-full hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-blue-200 mb-6 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          {/* Profile Image Section */}
          <div className="relative w-44 h-56 flex-shrink-0">
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
                {/* Photo visible on acceptance message for profiles without images */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center px-3">
                  <div className="text-sm font-medium">
                    <Eye className="w-5 h-5 mx-auto mb-2" />
                    Photo visible on acceptance of interest
                  </div>
                </div>
              </div>
            )}
            
            {/* Gallery Icon */}
            <div className="absolute top-3 right-3">
              <div className="bg-black/50 text-white rounded-md p-1.5">
                <Images className="w-4 h-4" />
                <span className="text-xs ml-1">2</span>
              </div>
            </div>
          </div>

          {/* Profile Information Section */}
          <div className="flex-1 p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {/* Last Seen */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  {formatLastSeen()}
                </div>

                {/* Name, Age and Verification */}
                <div className="flex items-center mb-3">
                  <h3 className="text-2xl font-bold text-gray-800 mr-3">
                    {profile.name}, {profile.age}
                  </h3>
                  {profile.verified && (
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/1200px-Twitter_Verified_Badge.svg.png" 
                      alt="Verified"
                      className="w-6 h-6"
                    />
                  )}
                </div>

                {/* Height, Location, Caste */}
                <div className="flex items-center text-gray-600 mb-3 text-sm">
                  <span className="font-medium">{formatHeight(profile.height)}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span>{profile.city}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span>{profile.caste || 'Caste not specified'}</span>
                </div>

                {/* Professional Info */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-sm text-gray-700">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium">{profile.profession || 'Doctor'}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span>{profile.annualIncome || 'Income not specified'}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{profile.education || 'MBBS'}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span>{profile.maritalStatus || 'Never Married'}</span>
                  </div>
                </div>

                {/* Bio Quote */}
                <div className="text-sm text-gray-600 mb-4 italic font-medium">
                  "{getOneLineBio()}"
                </div>

                {/* Religion and Language Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.religion && (
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 px-2 py-1">
                      {profile.religion}
                    </Badge>
                  )}
                  {profile.motherTongue && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 px-2 py-1">
                      {profile.motherTongue}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Pro and Most Compatible Badges */}
              <div className="ml-4 flex flex-col items-end space-y-2">
                {profile.verified && (
                  <Badge className="bg-red-500 text-white text-xs px-3 py-1 font-semibold rounded-md">
                    Pro
                  </Badge>
                )}
                {Math.random() > 0.6 && (
                  <Badge className="bg-pink-50 text-pink-600 text-xs px-3 py-1 border border-pink-200 font-medium rounded-full">
                    🔥 Most Compatible
                  </Badge>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-start space-x-4 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 flex items-center space-x-1.5 rounded-full px-4 py-2 font-medium"
              >
                <Heart className="w-4 h-4" />
                <span>Interest</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-pink-500 border-pink-200 hover:bg-pink-50 hover:border-pink-300 flex items-center space-x-1.5 rounded-full px-4 py-2 font-medium"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Super Interest</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-orange-500 border-orange-200 hover:bg-orange-50 hover:border-orange-300 flex items-center space-x-1.5 rounded-full px-4 py-2 font-medium"
              >
                <Star className="w-4 h-4" />
                <span>Shortlist</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 flex items-center space-x-1.5 rounded-full px-4 py-2 font-medium"
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
