import { memo, useState } from "react";
import { Link, useLocation } from "wouter";
import { User, Clover, ChevronDown, ChevronRight, Edit, Heart, Star, Phone, HelpCircle, Shield, LogOut, Gift } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LoginOptions from "./login-options";
import SignupOptions from "./signup-options";
import { useAuth } from "@/hooks/use-auth";
import { authService } from "@/services/auth-service"; // Assuming authService is imported from here

const Header = memo(() => {
  const [location] = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Added for logout functionality

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
    setIsLoggedIn(false); // Update local state after logout
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
            {isAuthenticated() && user ? ( // Changed to function call
              <div className="flex items-center space-x-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 h-auto hover:bg-gray-50">
                      <div className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron/20 to-temple-gold/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-saffron" />
                        </div>
                        <div className="hidden md:flex flex-col items-start">
                          <span className="text-sm font-medium text-gray-900">{user.firstName}</span>
                          {membershipType && (
                            <Badge className={`text-xs px-2 py-0 h-4 text-white ${membershipBadgeColor}`}>
                              {membershipType}
                            </Badge>
                          )}
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-64 p-0" align="end">
                    {/* User Info Header */}
                    <div className="p-4 bg-gradient-to-r from-saffron/5 to-temple-gold/5 border-b">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron/20 to-temple-gold/20 flex items-center justify-center">
                          <User className="w-6 h-6 text-saffron" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-gray-500">ID - SV{user.id?.slice(-6)?.toUpperCase()}</p>
                        </div>
                        {membershipType && (
                          <Badge className={`text-xs px-2 py-1 text-white ${membershipBadgeColor}`}>
                            {membershipType}
                          </Badge>
                        )}
                      </div>

                      {/* Upgrade Membership Button */}
                      <Button 
                        className="w-full mt-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium"
                        size="sm"
                      >
                        <Gift className="w-4 h-4 mr-2" />
                        Upgrade Membership
                      </Button>
                      <p className="text-xs text-center text-gray-500 mt-1">Flat 54% OFF till 13 Aug</p>
                    </div>

                    {/* Menu Items */}
                    <div className="p-1">
                      <DropdownMenuItem className="flex items-center space-x-3 px-3 py-2 cursor-pointer">
                        <Edit className="w-4 h-4 text-gray-500" />
                        <span>Edit Profile</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="flex items-center space-x-3 px-3 py-2 cursor-pointer">
                        <Heart className="w-4 h-4 text-gray-500" />
                        <span>Partner Preferences</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="flex items-center space-x-3 px-3 py-2 cursor-pointer">
                        <Star className="w-4 h-4 text-gray-500" />
                        <span>Astrology Services</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="flex items-center space-x-3 px-3 py-2 cursor-pointer">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span>Phonebook</span>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem className="flex items-center space-x-3 px-3 py-2 cursor-pointer">
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span>Account & Settings</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="flex items-center space-x-3 px-3 py-2 cursor-pointer">
                        <Shield className="w-4 h-4 text-gray-500" />
                        <span>Safety Centre</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="flex items-center space-x-3 px-3 py-2 cursor-pointer">
                        <HelpCircle className="w-4 h-4 text-gray-500" />
                        <span>Help & Support</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="flex items-center space-x-3 px-3 py-2 cursor-pointer">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>Success Stories</span>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem 
                        className="flex items-center space-x-3 px-3 py-2 cursor-pointer text-red-600 focus:text-red-600"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex items-center space-x-3 px-4 py-2 rounded-full bg-saffron hover:bg-saffron/90 text-white font-medium"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>Vikrant Chaudhary</span>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 p-0 rounded-2xl shadow-xl border-0">
                    <div className="p-6 bg-white rounded-t-2xl">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-100">
                          <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                            alt="Vikrant Chaudhary" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">Vikrant Chaudhary</h3>
                          <p className="text-sm text-gray-500 font-medium">ID - TYZA6743</p>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl py-3 font-semibold text-base mb-3">
                        Upgrade Membership
                      </Button>
                      <p className="text-sm text-gray-500 text-center font-medium">Flat 54% OFF till 13 Aug</p>
                    </div>

                    <div className="py-1 bg-white">
                      <DropdownMenuItem className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
                        <Edit className="w-5 h-5 mr-4 text-gray-500" />
                        <span className="text-base font-medium text-gray-700">Edit Profile</span>
                        <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
                        <Heart className="w-5 h-5 mr-4 text-gray-500" />
                        <span className="text-base font-medium text-gray-700">Partner Preferences</span>
                        <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
                        <Star className="w-5 h-5 mr-4 text-gray-500" />
                        <span className="text-base font-medium text-gray-700">Astrology Services</span>
                        <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
                        <Phone className="w-5 h-5 mr-4 text-gray-500" />
                        <span className="text-base font-medium text-gray-700">Phonebook</span>
                        <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
                        <Settings className="w-5 h-5 mr-4 text-gray-500" />
                        <span className="text-base font-medium text-gray-700">Account & Settings</span>
                        <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
                        <Shield className="w-5 h-5 mr-4 text-gray-500" />
                        <span className="text-base font-medium text-gray-700">Safety Centre</span>
                        <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
                        <HelpCircle className="w-5 h-5 mr-4 text-gray-500" />
                        <span className="text-base font-medium text-gray-700">Help & Support</span>
                        <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="px-6 py-4 hover:bg-gray-50 cursor-pointer rounded-b-2xl">
                        <User className="w-5 h-5 mr-4 text-gray-500" />
                        <span className="text-base font-medium text-gray-700">Success Stories</span>
                        <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                      </DropdownMenuItem>
                    </div>

                    <div className="border-t border-gray-100 bg-white rounded-b-2xl">
                      <DropdownMenuItem 
                        className="px-6 py-4 hover:bg-red-50 text-red-600 cursor-pointer rounded-b-2xl"
                        onClick={() => {
                          authService.logout();
                          setIsLoggedIn(false);
                        }}
                      >
                        <LogOut className="w-5 h-5 mr-4" />
                        <span className="text-base font-medium">Sign Out</span>
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