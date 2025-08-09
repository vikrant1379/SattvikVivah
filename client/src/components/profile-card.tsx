
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Star, MapPin, Briefcase, GraduationCap, User, Eye, CircleCheck, Images } from "lucide-react";
import { GiBigDiamondRing } from "react-icons/gi";
import type { UserProfile } from "@shared/schema";

interface ProfileCardProps {
  profile: UserProfile;
}

const ProfileCard = memo(({ profile }: ProfileCardProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatLastSeen = () => {
    // For demo purposes, randomly decide if user was seen today
    const wasSeenToday = Math.random() > 0.3;
    
    if (wasSeenToday) {
      // Generate a random time for today
      const hours = Math.floor(Math.random() * 24);
      const minutes = Math.floor(Math.random() * 60);
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      const displayMinutes = minutes.toString().padStart(2, '0');
      
      return `Last seen at ${displayHours}:${displayMinutes} ${period}`;
    } else {
      // Show other options for non-today activity
      const lastSeenOptions = [
        "Last seen on 09-Aug-25",
        "Last seen on 08-Aug-25", 
        "Last seen on 07-Aug-25",
        "Online now",
        "Last seen yesterday"
      ];
      return lastSeenOptions[Math.floor(Math.random() * lastSeenOptions.length)];
    }
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
      <CardContent className="p-0 relative">
        <div className="flex">
          {/* Profile Image Section */}
          <div className="relative w-56 flex-shrink-0">
            {profile.profileImage ? (
              <div className="relative w-full h-full">
                <img 
                  src={profile.profileImage} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                {/* Image gallery icon */}
                <div className="absolute top-3 right-3 bg-black/60 rounded-md px-2 py-1 flex items-center text-white text-sm">
                  <Images className="w-4 h-4 mr-1" />
                  <span>5</span>
                </div>
              </div>
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
          <div className="flex-1 pl-4 pr-0 py-4">
            {/* Header Section with Last Seen, Name, and Badges */}
            <div className="flex justify-between items-start mb-2 pr-4">
              <div className="flex-1">
                {/* Last Seen */}
                <div className="mb-1" style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: '16px',
                  letterSpacing: '0',
                  color: '#667085',
                  fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}>
                  {formatLastSeen()}
                </div>

                {/* Name, Age and Verification */}
                <div className="flex items-center mb-1.5" style={{ marginBottom: '6px' }}>
                  <h2 className="mr-2" style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    lineHeight: '34px',
                    letterSpacing: '0',
                    color: '#101828',
                    fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}>
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
            </div>

            {/* Badges positioned absolutely to the right edge */}
            <div className="absolute top-4 right-0 flex flex-col items-end space-y-2">
              {profile.verified && (
                <Badge className="bg-red-500 text-white rounded-l-full rounded-r-none" style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  lineHeight: '16px',
                  color: '#FFFFFF',
                  background: '#D12C4A',
                  padding: '4px 12px 4px 16px',
                  borderRadius: '999px 0 0 999px',
                  fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}>
                  Pro
                </Badge>
              )}
              {Math.random() > 0.5 && (
                <Badge className="border border-blue-200 rounded-l-full rounded-r-none flex items-center" style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  lineHeight: '16px',
                  color: '#175CD3',
                  background: '#EFF8FF',
                  padding: '4px 12px 4px 16px',
                  borderRadius: '999px 0 0 999px',
                  fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  gap: '8px'
                }}>
                  <span>👍</span>
                  Most Compatible
                </Badge>
              )}
            </div>

            {/* Basic Info Row */}
            <div className="flex items-center mb-2 pr-4" style={{
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '20px',
              letterSpacing: '0.1px',
              color: '#344054',
              fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              marginBottom: '8px'
            }}>
              <span>{formatHeight(profile.height)}</span>
              <span style={{ margin: '0 8px', color: '#667085' }}>•</span>
              <MapPin className="w-4 h-4 mr-1.5" style={{ width: '16px', height: '16px', marginRight: '6px', color: '#667085' }} />
              <span>{profile.city}</span>
              <span style={{ margin: '0 8px', color: '#667085' }}>•</span>
              <span>{profile.caste || 'Chandravanshi Kahar'}</span>
            </div>

            {/* Professional Info */}
            <div style={{ marginBottom: '12px' }} className="pr-4">
              <div className="flex items-center mb-1" style={{
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '20px',
                letterSpacing: '0',
                color: '#344054',
                fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                marginBottom: '4px'
              }}>
                <Briefcase style={{ width: '16px', height: '16px', marginRight: '6px', color: '#667085' }} />
                <span>{profile.profession || 'Accounting Professional'}</span>
                <span style={{ margin: '0 16px', color: '#667085' }}>•</span>
                <span>{profile.annualIncome || 'Rs. 5 - 7.5 Lakh p.a'}</span>
              </div>
              <div className="flex items-center" style={{
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '20px',
                letterSpacing: '0',
                color: '#344054',
                fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}>
                <GraduationCap style={{ width: '16px', height: '16px', marginRight: '6px', color: '#667085' }} />
                <span>{profile.education || 'MBA/PGDM, B.Com'}</span>
                <span style={{ margin: '0 16px', color: '#667085' }}>•</span>
                <GiBigDiamondRing style={{ width: '16px', height: '16px', marginRight: '6px', color: '#667085' }} />
                <span>{profile.maritalStatus || 'Never Married'}</span>
              </div>
            </div>

            {/* One-liner About Section */}
            {(profile.bio || profile.oneLiner) && (
              <div className="mb-3 text-sm text-gray-700 italic pr-4">
                "{profile.bio || profile.oneLiner || 'Looking for a life partner who shares similar values and dreams for a beautiful future together.'}"
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center pr-4" style={{ gap: '20px' }}>
              <Button 
                variant="outline" 
                size="sm"
                className="border-red-300 hover:bg-red-50 hover:border-red-400 flex items-center rounded-full px-4 py-1.5"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '18px',
                  letterSpacing: '0',
                  color: '#D12C4A',
                  fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  gap: '6px'
                }}
              >
                <Heart style={{ width: '18px', height: '18px' }} />
                <span>Interest</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-pink-300 hover:bg-pink-50 hover:border-pink-400 flex items-center rounded-full px-4 py-1.5"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '18px',
                  letterSpacing: '0',
                  color: '#475467',
                  fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  gap: '6px'
                }}
              >
                <Heart style={{ width: '18px', height: '18px' }} className="fill-current" />
                <span>Super Interest</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-orange-300 hover:bg-orange-50 hover:border-orange-400 flex items-center rounded-full px-4 py-1.5"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '18px',
                  letterSpacing: '0',
                  color: '#475467',
                  fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  gap: '6px'
                }}
              >
                <Star style={{ width: '18px', height: '18px' }} />
                <span>Shortlist</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-300 hover:bg-gray-50 hover:border-gray-400 flex items-center rounded-full px-4 py-1.5"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '18px',
                  letterSpacing: '0',
                  color: '#475467',
                  fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  gap: '6px'
                }}
              >
                <MessageCircle style={{ width: '18px', height: '18px' }} />
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
