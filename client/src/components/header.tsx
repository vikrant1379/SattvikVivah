import { memo, useState } from "react";
import { Link, useLocation } from "wouter";
import { User, Clover, ChevronDown, Settings, Heart, Star, Phone, HelpCircle, Shield, LogOut, Edit, Users, Gift } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LoginOptions from "./login-options";
import SignupOptions from "./signup-options";
import { useAuth } from "@/hooks/use-auth";

const Header = memo(() => {
  const [location] = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  const handleProfileClick = () => {
    if (!isAuthenticated()) { // Changed to function call
      setIsLoginOpen(true);
    }
  };

  const handleSignupClick = () => {
    setIsSignupOpen(true);
  };

  const handleLogout = async () => {
    await logout();
  };

  // Mock membership data - in real app this would come from user profile
  const membershipType = "Sadhaka"; // Could be "Seeker", "Sadhaka", "Guru Guidance"
  const membershipBadgeColor = membershipType === "Guru Guidance" ? "bg-gradient-to-r from-yellow-500 to-yellow-600" : 
                              membershipType === "Sadhaka" ? "bg-gradient-to-r from-purple-500 to-purple-600" : 
                              "bg-gradient-to-r from-green-500 to-green-600";

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-temple-gold to-transparent opacity-60"></div>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-saffron/10 rounded-full flex items-center justify-center">
              <Clover className="text-saffron text-lg animate-lotus-bloom" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-gray-900">SattvikVivah</h1>
              <p className="text-xs text-temple-gold font-devanagari">सत्त्विक विवाह</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/profiles" 
              className="text-gray-700 hover:text-saffron transition-colors font-medium text-sm"
            >
              Search Profiles
            </Link>
            <Link 
              href="/success-stories" 
              className="text-gray-700 hover:text-saffron transition-colors font-medium text-sm"
            >
              Success Stories
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-saffron transition-colors font-medium text-sm"
            >
              Blog
            </Link>
            <Link 
              href="/help" 
              className="text-gray-700 hover:text-saffron transition-colors font-medium text-sm"
            >
              Help
            </Link>
          </nav>

          {/* User Profile Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated() && user ? (
              <>
                {/* Welcome text - more professional */}
                <span className="text-sm text-gray-600 hidden lg:block font-medium">
                  Welcome, {user.firstName}
                </span>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 h-auto hover:bg-gray-50/80 transition-all duration-200">
                      <div className="flex items-center space-x-3 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                        {/* Profile avatar */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron/20 to-temple-gold/20 flex items-center justify-center border-2 border-saffron/10">
                          <User className="w-5 h-5 text-saffron" />
                        </div>
                        
                        {/* Profile info - cleaner layout */}
                        <div className="hidden md:flex flex-col items-start min-w-0">
                          <span className="text-sm font-medium text-gray-700 truncate">My Profile</span>
                          {membershipType && (
                            <Badge className={`text-xs px-2 py-0.5 h-5 text-white ${membershipBadgeColor} font-medium`}>
                              {membershipType}
                            </Badge>
                          )}
                        </div>
                        
                        <ChevronDown className="w-4 h-4 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-72 p-0 shadow-xl border-0 rounded-xl" align="end" sideOffset={8}>
                    {/* Professional header design */}
                    <div className="p-5 bg-white border-b border-gray-100">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-saffron/20 to-temple-gold/20 flex items-center justify-center border-3 border-saffron/10 flex-shrink-0">
                          <User className="w-8 h-8 text-saffron" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-gray-900 truncate">{user.firstName} {user.lastName}</h3>
                          <p className="text-sm text-gray-500 mb-2">ID - {user.id?.slice(-6)?.toUpperCase()}</p>
                          {membershipType && (
                            <Badge className={`text-xs px-3 py-1 h-6 text-white ${membershipBadgeColor} font-medium rounded-full`}>
                              {membershipType} Member
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Upgrade CTA */}
                      <Button 
                        className="w-full mt-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                        size="sm"
                      >
                        <Gift className="w-4 h-4 mr-2" />
                        Upgrade Membership
                      </Button>
                      <p className="text-xs text-center text-gray-500 mt-2 font-medium">Flat 54% OFF till 13 Aug</p>
                    </div>

                    {/* Menu items with professional styling */}
                    <div className="py-2">
                      <DropdownMenuItem className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 mx-2 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Edit className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-800 font-medium">Edit Profile</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                      </DropdownMenuItem>

                      <DropdownMenuItem className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 mx-2 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Heart className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-800 font-medium">Partner Preferences</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                      </DropdownMenuItem>

                      <DropdownMenuItem className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 mx-2 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Star className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-800 font-medium">Astrology Services</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                      </DropdownMenuItem>

                      <DropdownMenuItem className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 mx-2 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-800 font-medium">Phonebook</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="my-2 mx-4" />

                      <DropdownMenuItem className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 mx-2 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Settings className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-800 font-medium">Account & Settings</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                      </DropdownMenuItem>

                      <DropdownMenuItem className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 mx-2 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-800 font-medium">Safety Centre</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                      </DropdownMenuItem>

                      <DropdownMenuItem className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 mx-2 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <HelpCircle className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-800 font-medium">Help & Support</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                      </DropdownMenuItem>

                      <DropdownMenuItem className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 mx-2 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-800 font-medium">Success Stories</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90" />
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="my-2 mx-4" />

                      <DropdownMenuItem 
                        className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-red-50 transition-colors duration-150 mx-2 rounded-lg text-red-600 hover:text-red-700"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Login</span>
                </Button>

                <Button
                  onClick={handleSignupClick}
                  className="bg-saffron hover:bg-saffron/90 text-white px-4 py-2 rounded-lg font-medium text-sm"
                >
                  Sign Up Free
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card border-temple-gold/20">
          <LoginOptions />
        </DialogContent>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-saffron">
              Create Your Sacred Profile
            </DialogTitle>
          </DialogHeader>
          <SignupOptions />
        </DialogContent>
      </Dialog>
    </header>
  );
});

Header.displayName = "Header";

export default Header;