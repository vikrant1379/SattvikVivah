
import { memo, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

const Home = memo(() => {
  const homeRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      if (process.env.NODE_ENV === 'development') {
        console.log("Home component initialized and cached");
      }
    }
  }, []);

  const handleFindMatches = () => {
    setLocation('/profiles');
  };

  return (
    <div ref={homeRef} className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center space-y-8">
            {/* Hero Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Find Your{" "}
                <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                  Dharmic Partner
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                For souls seeking Grihastha Ashram through spiritual alignment. 
                Our mission is sacred pursuit of divine union.
              </p>
              
              <p className="text-sm text-gray-500 italic max-w-xl mx-auto">
                "Marriage is not just union of two bodies, but union of two souls on their dharmic journey."
              </p>
            </div>

            {/* Search Card */}
            <Card className="bg-white/90 backdrop-blur-sm border-orange-100/50 shadow-xl max-w-md mx-auto">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold mb-6 text-gray-800">
                  Begin Your Sacred Journey
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Looking for
                      </label>
                      <select className="w-full p-3 border border-orange-200 rounded-lg focus:ring-orange-400 focus:border-orange-400">
                        <option>Bride</option>
                        <option>Groom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age
                      </label>
                      <select className="w-full p-3 border border-orange-200 rounded-lg focus:ring-orange-400 focus:border-orange-400">
                        <option>21 to 30</option>
                        <option>25 to 35</option>
                        <option>30 to 40</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input 
                      type="text"
                      placeholder="Enter your city"
                      className="w-full p-3 border border-orange-200 rounded-lg focus:ring-orange-400 focus:border-orange-400"
                    />
                  </div>

                  <Button 
                    onClick={handleFindMatches}
                    className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Find Your Match
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Simple Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">10L+</div>
                <div className="text-sm text-gray-600">Profiles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600 mb-1">50K+</div>
                <div className="text-sm text-gray-600">Matches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">25+</div>
                <div className="text-sm text-gray-600">Years</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
