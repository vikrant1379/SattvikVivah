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
              <div className="flex items-center space-x-3">
                <UserProfileMenu user={{
                  name: user.name,
                  id: user.id,
                  membershipType: 'Basic'
                }} />
              </div>
            ) : (
              <div className="flex items-center">
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

                  <DropdownMenuContent className="w-48" align="end">
                    <DropdownMenuItem 
                      onClick={handleProfileClick}
                      className="flex items-center space-x-3 py-3 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-gray-600" />
                      <span>Sign In</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem 
                      onClick={handleSignupClick}
                      className="flex items-center space-x-3 py-3 cursor-pointer text-saffron hover:text-saffron/80"
                    >
                      <User className="w-4 h-4" />
                      <span>Sign Up Free</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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