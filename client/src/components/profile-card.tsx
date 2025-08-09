
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Star, MapPin, Briefcase, GraduationCap } from "lucide-react";
import type { UserProfile } from "@shared/schema";

interface ProfileCardProps {
  profile: UserProfile;
}

const ProfileCard = memo(({ profile }: ProfileCardProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 hover:border-saffron/30">
      <CardContent className="p-0">
        {/* Profile Image */}
        <div className="relative aspect-[4/5] bg-gradient-to-br from-saffron/10 to-temple-gold/10 rounded-t-lg overflow-hidden">
          {profile.profileImage ? (
            <img 
              src={profile.profileImage} 
              alt={profile.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-saffron/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-saffron">
                  {getInitials(profile.name)}
                </span>
              </div>
            </div>
          )}
          
          {/* Status Badges */}
          <div className="absolute top-3 left-3 flex space-x-1">
            {profile.verified && (
              <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                ✓ Pro
              </Badge>
            )}
            <Badge className="bg-red-500 text-white text-xs px-2 py-1">
              Pro Max
            </Badge>
          </div>

          {/* Online Status */}
          <div className="absolute top-3 right-3">
            <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-4">
          <div className="mb-3">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {profile.name}, {profile.age}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span className="font-medium">{profile.height}</span>
              <span className="mx-2">•</span>
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Professional Info */}
          <div className="space-y-1 mb-3">
            <div className="flex items-center text-sm text-gray-600">
              <Briefcase className="w-4 h-4 mr-2" />
              <span className="truncate">{profile.profession || 'Not specified'}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <GraduationCap className="w-4 h-4 mr-2" />
              <span className="truncate">{profile.education || 'Not specified'}</span>
            </div>
          </div>

          {/* Spiritual Info */}
          {(profile.religion || profile.motherTongue) && (
            <div className="flex flex-wrap gap-1 mb-3">
              {profile.religion && (
                <Badge variant="secondary" className="text-xs">
                  {profile.religion}
                </Badge>
              )}
              {profile.motherTongue && (
                <Badge variant="secondary" className="text-xs">
                  {profile.motherTongue}
                </Badge>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-pink-600 border-pink-200 hover:bg-pink-50"
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-green-600 border-green-200 hover:bg-green-50"
            >
              Interest
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
