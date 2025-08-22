
import React from 'react';
import { useLocation } from 'wouter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Settings,
  Heart,
  Star,
  Phone,
  Shield,
  HelpCircle,
  Users,
  LogOut,
  Gift,
  Edit,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

interface UserProfileMenuProps {
  user?: {
    name: string;
    id: string;
    membershipType?: 'Basic' | 'Premium' | 'Sadhaka';
  };
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ 
  user 
}) => {
  if (!user) return null;
  const [, setLocation] = useLocation();
  const { logout } = useAuth();

  const handleNavigation = (path: string) => {
    setLocation(path);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setLocation('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getMembershipBadgeColor = (type: string) => {
    switch (type) {
      case 'Sadhaka':
        return 'bg-purple-600 text-white';
      case 'Premium':
        return 'bg-gold-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center space-x-2 h-auto p-2 hover:bg-orange-50 rounded-lg"
        >
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-orange-600" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-900">{user.name}</span>
            {user.membershipType && (
              <Badge 
                className={`text-xs px-2 py-0 ${getMembershipBadgeColor(user.membershipType)}`}
              >
                {user.membershipType}
              </Badge>
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-4" align="end">
        {/* User Info Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-orange-600" />
            {/* Subtle completion ring */}
            <svg className="absolute inset-0 w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="85, 100"
              />
            </svg>
          </div>
          <div>
            <div className="font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">ID - {user.id}</div>
            {user.membershipType && (
              <Badge className={`text-xs px-2 py-1 mt-1 ${getMembershipBadgeColor(user.membershipType)}`}>
                {user.membershipType}
              </Badge>
            )}
          </div>
        </div>

        {/* Upgrade Membership */}
        <div className="mb-4 p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-white text-center">
          <Button 
            variant="ghost" 
            className="w-full text-white hover:bg-white/20 flex items-center justify-center space-x-2"
            onClick={() => handleNavigation('/membership')}
          >
            <Gift className="w-4 h-4" />
            <span>Upgrade Membership</span>
          </Button>
          <p className="text-xs mt-1 opacity-90">Flat 54% OFF till 13 Aug</p>
        </div>

        <DropdownMenuSeparator />

        {/* Profile Management Options */}
        <DropdownMenuItem 
          onClick={() => handleNavigation('/profile/edit')}
          className="flex items-center space-x-3 py-3 cursor-pointer"
        >
          <Edit className="w-4 h-4 text-gray-600" />
          <span>Edit Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleNavigation('/profile/preferences')}
          className="flex items-center space-x-3 py-3 cursor-pointer"
        >
          <Heart className="w-4 h-4 text-gray-600" />
          <span>Partner Preferences</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleNavigation('/astrology')}
          className="flex items-center space-x-3 py-3 cursor-pointer"
        >
          <Star className="w-4 h-4 text-gray-600" />
          <span>Astrology Services</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleNavigation('/phonebook')}
          className="flex items-center space-x-3 py-3 cursor-pointer"
        >
          <Phone className="w-4 h-4 text-gray-600" />
          <span>Phonebook</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          onClick={() => handleNavigation('/account/settings')}
          className="flex items-center space-x-3 py-3 cursor-pointer"
        >
          <Settings className="w-4 h-4 text-gray-600" />
          <span>Account & Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleNavigation('/safety')}
          className="flex items-center space-x-3 py-3 cursor-pointer"
        >
          <Shield className="w-4 h-4 text-gray-600" />
          <span>Safety Centre</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleNavigation('/help')}
          className="flex items-center space-x-3 py-3 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-gray-600" />
          <span>Help & Support</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleNavigation('/success-stories')}
          className="flex items-center space-x-3 py-3 cursor-pointer"
        >
          <Users className="w-4 h-4 text-gray-600" />
          <span>Success Stories</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          onClick={handleSignOut}
          className="flex items-center space-x-3 py-3 cursor-pointer text-red-600 hover:text-red-700"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileMenu;
