import { memo, useState } from "react";
import { Link, useLocation } from "wouter";
import { User, Clover, ChevronDown, Settings, Heart, Star, Phone, HelpCircle, Shield, LogOut, Edit, Users, Gift, Smartphone, Menu, Bell } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LoginOptions from "./login-options";
import SignupOptions from "./signup-options";
import { useAuth } from "@/hooks/use-auth";
import { UserProfileMenu } from "./user-profile-menu";

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
    <>
      {/* Top Bar - Get the App */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-end space-x-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Get the App</span>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
                    <Smartphone className="w-3 h-3 text-white" />
                  </div>
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center">
                    <Smartphone className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+91-9876543210</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-saffron/10">
                <Star className="w-4 h-4 text-saffron" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-saffron/10">
                <Bell className="w-4 h-4 text-gray-500 hover:text-saffron" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-saffron/10">
                <Settings className="w-4 h-4 text-gray-500 hover:text-saffron" />
              </Button>
            </div>
          </div>
        </div>
      </div>

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
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/profiles" 
              className="flex items-center space-x-2 text-gray-700 hover:text-saffron transition-colors font-medium text-sm group"
            >
              <Users className="w-4 h-4 group-hover:text-saffron" />
              <span>Search Profiles</span>
            </Link>
            <Link 
              href="/astrology" 
              className="flex items-center space-x-2 text-gray-700 hover:text-saffron transition-colors font-medium text-sm group"
            >
              <Star className="w-4 h-4 group-hover:text-saffron" />
              <span>Astrology</span>
            </Link>
            <Link 
              href="/success-stories" 
              className="flex items-center space-x-2 text-gray-700 hover:text-saffron transition-colors font-medium text-sm group"
            >
              <Heart className="w-4 h-4 group-hover:text-saffron" />
              <span>Success Stories</span>
            </Link>
            <Link 
              href="/help" 
              className="flex items-center space-x-2 text-gray-700 hover:text-saffron transition-colors font-medium text-sm group"
            >
              <HelpCircle className="w-4 h-4 group-hover:text-saffron" />
              <span>Help</span>
            </Link>
          </nav>

          {/* User Profile Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated() && user ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2 h-auto p-2 hover:bg-orange-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      <Badge className="text-xs px-2 py-0 bg-purple-600 text-white">Basic</Badge>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <div className="h-full bg-white">
                    {/* User Header */}
                    <div className="p-6 border-b">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-orange-600" />
                          {/* Completion ring */}
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
                          <div className="font-semibold text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">ID - {user.id}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className="text-xs px-2 py-1 bg-purple-600 text-white flex items-center space-x-1">
                              <Star className="w-3 h-3" />
                              <span>Basic</span>
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-gray-500">Online</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Upgrade Membership Banner */}
                    <div className="p-4">
                      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-4 text-white text-center">
                        <Button 
                          variant="ghost" 
                          className="w-full text-white hover:bg-white/20 flex items-center justify-center space-x-2"
                          onClick={() => handleNavigation('/membership')}
                        >
                          <Gift className="w-4 h-4" />
                          <span>Upgrade Membership</span>
                        </Button>
                        <p className="text-xs mt-2 opacity-90">Flat 54% OFF till 13 Aug</p>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="px-4 space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-50"
                        onClick={() => handleNavigation('/profile/edit')}
                      >
                        <Edit className="w-4 h-4 mr-3" />
                        Edit Profile
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-50"
                        onClick={() => handleNavigation('/profile/preferences')}
                      >
                        <Heart className="w-4 h-4 mr-3" />
                        Partner Preferences
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-50"
                        onClick={() => handleNavigation('/astrology')}
                      >
                        <Star className="w-4 h-4 mr-3" />
                        Astrology Services
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-50"
                        onClick={() => handleNavigation('/phonebook')}
                      >
                        <Phone className="w-4 h-4 mr-3" />
                        Phonebook
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-50"
                        onClick={() => handleNavigation('/account/settings')}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Account & Settings
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-50"
                        onClick={() => handleNavigation('/safety')}
                      >
                        <Shield className="w-4 h-4 mr-3" />
                        Safety Centre
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-50"
                        onClick={() => handleNavigation('/help')}
                      >
                        <HelpCircle className="w-4 h-4 mr-3" />
                        Help & Support
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-3 text-gray-700 hover:bg-gray-50"
                        onClick={() => handleNavigation('/success-stories')}
                      >
                        <Users className="w-4 h-4 mr-3" />
                        Success Stories
                      </Button>

                      <div className="border-t pt-2 mt-4">
                        <Button
                          variant="ghost"
                          className="w-full justify-start px-4 py-3 text-red-600 hover:bg-red-50"
                          onClick={handleLogout}
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2 h-auto p-2 hover:bg-orange-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end">
                  <div className="p-3 border-b">
                    <div className="flex items-center space-x-2 text-saffron">
                      <Clover className="w-5 h-5" />
                      <span className="font-semibold">SattvikVivah</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Your spiritual journey awaits</p>
                  </div>
                  
                  <DropdownMenuItem 
                    onClick={handleProfileClick}
                    className="flex items-center space-x-3 py-3 cursor-pointer"
                  >
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">Sign In</span>
                      <p className="text-xs text-gray-500">Access your profile</p>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem 
                    onClick={handleSignupClick}
                    className="flex items-center space-x-3 py-3 cursor-pointer text-saffron hover:text-saffron/80"
                  >
                    <div className="w-6 h-6 bg-saffron/10 rounded-full flex items-center justify-center">
                      <Heart className="w-3 h-3 text-saffron" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">Sign Up Free</span>
                      <p className="text-xs text-gray-500">Start your journey</p>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <div className="flex items-center justify-center space-x-4 text-gray-400">
                      <Star className="w-4 h-4" />
                      <Heart className="w-4 h-4" />
                      <Clover className="w-4 h-4" />
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
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
    </>
  );
});

Header.displayName = "Header";

export { Header };
export default Header;