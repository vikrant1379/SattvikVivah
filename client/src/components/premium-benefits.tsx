
import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Eye, Phone, Search, Zap } from "lucide-react";

const PremiumBenefits = memo(() => {
  return (
    <div className="p-6 space-y-6">
      {/* Premium Upgrade Card */}
      <Card className="bg-gradient-to-br from-saffron/10 to-temple-gold/10 border-saffron/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Crown className="w-5 h-5 mr-2 text-saffron" />
            You are missing out on the premium benefits!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Eye className="w-4 h-4 mt-1 text-saffron" />
              <div>
                <p className="text-sm font-medium text-gray-800">Get upto 3x more profile views</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Phone className="w-4 h-4 mt-1 text-saffron" />
              <div>
                <p className="text-sm font-medium text-gray-800">Unlimited voice & video calls</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Search className="w-4 h-4 mt-1 text-saffron" />
              <div>
                <p className="text-sm font-medium text-gray-800">Get access to contact details</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Zap className="w-4 h-4 mt-1 text-saffron" />
              <div>
                <p className="text-sm font-medium text-gray-800">Perform unlimited searches</p>
              </div>
            </div>
          </div>
          
          <div className="bg-saffron/10 p-3 rounded-lg">
            <p className="text-sm font-semibold text-saffron text-center">
              Flat 54% OFF till 13 Aug
            </p>
          </div>
          
          <Button className="w-full bg-saffron hover:bg-saffron/90 text-white">
            Upgrade now →
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-700">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Profile views today</span>
            <span className="font-medium">12</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Interests received</span>
            <span className="font-medium">4</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Profile completion</span>
            <span className="font-medium text-green-600">85%</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-700">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm">
            <p className="text-gray-800 font-medium">Priya S. viewed your profile</p>
            <p className="text-gray-500 text-xs">2 hours ago</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-800 font-medium">New match found!</p>
            <p className="text-gray-500 text-xs">5 hours ago</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-800 font-medium">Rahul K. sent interest</p>
            <p className="text-gray-500 text-xs">1 day ago</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

PremiumBenefits.displayName = "PremiumBenefits";

export default PremiumBenefits;
