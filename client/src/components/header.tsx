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

  const [, setLocation] = useLocation();

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

                      <DropdownMenuItem 
                        className="flex items-center space-x-3 px-3 py-2 cursor-pointer"
                        onClick={() => setLocation('/account')}
                      >
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
                        <Users className="w-4 h-4 text-gray-500" />
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

export { Header };
export default Header;