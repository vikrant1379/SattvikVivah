
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Bell, Search, Settings, User, Heart, MessageCircle, Star } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = memo(() => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo & Navigation */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-sage to-saffron flex items-center justify-center">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-sage to-saffron bg-clip-text text-transparent">
                    SattvikVivah
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">Spiritual Matrimony</p>
                </div>
              </div>
            </div>

            {/* Navigation Links - Hidden on mobile */}
            <nav className="hidden lg:flex items-center gap-6">
              <Button variant="ghost" className="text-gray-600 hover:text-sage">
                Matches
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-sage">
                Search
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-sage">
                Activity
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-sage">
                Messages
                <Badge variant="secondary" className="ml-2 bg-saffron/10 text-saffron">
                  3
                </Badge>
              </Button>
            </nav>
          </div>

          {/* Right Section - User Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                2
              </Badge>
            </Button>

            {/* Premium Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-full">
              <Star className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">Premium</span>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/api/placeholder/40/40" alt="User" />
                    <AvatarFallback className="bg-sage/10 text-sage">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Hi Vikrant!</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      TY24743
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star className="mr-2 h-4 w-4" />
                  <span>Upgrade</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
