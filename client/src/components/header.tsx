import { memo, useState } from "react";
import { Link, useLocation } from "wouter";
import { User, Clover } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginOptions from "./login-options";
import { useAuth } from "@/hooks/use-auth";

const Header = memo(() => {
  const [location] = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { isAuthenticated, user } = useAuth();

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      setIsLoginOpen(true);
    }
  };

  return (
    <header className="bg-card border-b border-temple-gold/20 sticky top-0 z-50 shadow-sm">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-temple-gold to-transparent opacity-60"></div>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center">
              <Clover className="text-saffron text-xl animate-lotus-bloom" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-foreground">SattvikVivah</h1>
              <p className="text-xs text-temple-gold font-devanagari">सत्त्विक विवाह</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/profiles" className="text-foreground hover:text-saffron transition-colors font-medium">
              Search Profiles
            </Link>
            <Link href="/success-stories" className="text-foreground hover:text-saffron transition-colors font-medium">
              Success Stories
            </Link>
            <Link href="/blog" className="text-foreground hover:text-saffron transition-colors font-medium">
              Blog
            </Link>
            <Link href="/help" className="text-foreground hover:text-saffron transition-colors font-medium">
              Help
            </Link>
          </nav>

          {/* User Profile Section */}
          <div className="flex items-center space-x-3">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center cursor-pointer hover:bg-saffron/30 transition-colors">
                  <User className="w-4 h-4 text-saffron" />
                </div>
              </div>
            ) : (
              <div 
                onClick={handleProfileClick}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
                title="Login to access your profile"
              >
                <User className="w-4 h-4 text-gray-600" />
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
    </header>
  );
});

Header.displayName = "Header";

export default Header;