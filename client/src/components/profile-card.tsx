
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
    return profile.bio?.split('.')[0] || "Looking for a life partner who shares similar values and beliefs.";
  };

  return (
    <Card className="w-full hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 hover:border-saffron/30 mb-4">
      <CardContent className="p-0">
        <div className="flex">
          {/* Profile Image Section */}
          <div className="relative w-48 h-64 flex-shrink-0">
            {profile.profileImage ? (
              <img 
                src={profile.profileImage} 
                alt={profile.name}
                className="w-full h-full object-cover rounded-l-lg"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-saffron/10 to-temple-gold/10 rounded-l-lg flex items-center justify-center relative">
                <div className="w-20 h-20 rounded-full bg-saffron/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-saffron">
                    {getInitials(profile.name)}
                  </span>
                </div>
                {/* Photo visible on acceptance message for profiles without images */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-center px-4">
                  <div className="text-sm font-medium">
                    <Eye className="w-6 h-6 mx-auto mb-2" />
                    Photo visible on acceptance of interest
                  </div>
                </div>
              </div>
            )}
            
            {/* Gallery Icon */}
            <div className="absolute top-3 right-3">
              <div className="bg-black/60 text-white rounded-full p-2">
                <Images className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Profile Information Section */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {/* Last Seen */}
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatLastSeen()}
                </div>

                {/* Name and Age */}
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl font-semibold text-gray-900 mr-2">
                    {profile.name}, {profile.age}
                  </h3>
                  {profile.verified && (
                    <CheckCircle className="w-6 h-6 text-blue-500 fill-current" />
                  )}
                </div>

                {/* Basic Info Row */}
                <div className="flex items-center text-gray-600 mb-3 space-x-6">
                  <span className="font-medium">{profile.height}</span>
                  <span>•</span>
                  <span>{profile.city}, {profile.state}</span>
                  <span>•</span>
                  <span>{profile.caste || 'Caste not specified'}</span>
                </div>

                {/* Professional Info */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-sm text-gray-700">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span className="font-medium">{profile.profession || 'Profession not specified'}</span>
                    <span className="mx-2">•</span>
                    <span>{profile.annualIncome || 'Income not specified'}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    <span>{profile.education || 'Education not specified'}</span>
                    <span className="mx-2">•</span>
                    <span>{profile.maritalStatus || 'Never Married'}</span>
                  </div>
                </div>

                {/* One-line Bio */}
                <div className="text-sm text-gray-600 mb-3 italic">
                  "{getOneLineBio()}"
                </div>

                {/* Additional Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.religion && (
                    <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                      {profile.religion}
                    </Badge>
                  )}
                  {profile.motherTongue && (
                    <Badge variant="secondary" className="text-xs bg-green-50 text-green-700">
                      {profile.motherTongue}
                    </Badge>
                  )}
                  {profile.eatingHabits && (
                    <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-700">
                      {profile.eatingHabits}
                    </Badge>
                  )}
                  {profile.smokingHabits === 'No' && profile.drinkingHabits === 'No' && (
                    <Badge variant="secondary" className="text-xs bg-green-50 text-green-700">
                      No Smoking/Drinking
                    </Badge>
                  )}
                </div>
              </div>

              {/* Pro and Most Compatible Badges */}
              <div className="ml-4 flex flex-col items-end space-y-2">
                {profile.verified && (
                  <Badge className="bg-red-500 text-white text-xs px-3 py-1 font-medium">
                    Pro
                  </Badge>
                )}
                {Math.random() > 0.7 && (
                  <Badge className="bg-pink-100 text-pink-600 text-xs px-3 py-1 border border-pink-200">
                    🔥 Most Compatible
                  </Badge>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-500 border-red-200 hover:bg-red-50 flex items-center space-x-1 rounded-full px-4 py-2"
              >
                <Heart className="w-4 h-4" />
                <span>Interest</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-pink-500 border-pink-200 hover:bg-pink-50 flex items-center space-x-1 rounded-full px-4 py-2"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Super Interest</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-orange-500 border-orange-200 hover:bg-orange-50 flex items-center space-x-1 rounded-full px-4 py-2"
              >
                <Star className="w-4 h-4" />
                <span>Shortlist</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-gray-600 border-gray-200 hover:bg-gray-50 flex items-center space-x-1 rounded-full px-4 py-2"
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
