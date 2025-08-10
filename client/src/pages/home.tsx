
import { memo, useRef, useEffect, useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ThreeSacredSteps from "@/components/three-sacred-steps";
import SattvikConnectPreview from "@/components/sattvik-connect-preview";
import SuccessStoriesCarousel from "@/components/success-stories-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Search, Users, Star } from "lucide-react";

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
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-50/30 via-white to-rose-50/30 py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                    Find Your{" "}
                    <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                      Dharmic Partner
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-2">
                    For souls seeking Grihastha Ashram through spiritual
                  </p>
                  <p className="text-xl text-gray-600 mb-8">
                    alignment. Our mission is sacred pursuit.
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    "Marriage is not just union of two bodies, but union of two souls on their dharmic journey."
                  </p>
                </div>

                {/* Quick Search Form */}
                <Card className="bg-white/80 backdrop-blur-sm border-orange-100/50 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                      Begin Your Sacred Journey
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Looking for
                          </label>
                          <select className="w-full p-3 border border-orange-200 rounded-lg focus:ring-orange-400 focus:border-orange-400">
                            <option>Bride</option>
                            <option>Groom</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Community
                        </label>
                        <select className="w-full p-3 border border-orange-200 rounded-lg focus:ring-orange-400 focus:border-orange-400">
                          <option>Any Community</option>
                          <option>Brahmin</option>
                          <option>Kshatriya</option>
                          <option>Vaishya</option>
                          <option>Shudra</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input 
                          type="text"
                          placeholder="Enter your preferred location"
                          className="w-full p-3 border border-orange-200 rounded-lg focus:ring-orange-400 focus:border-orange-400"
                        />
                      </div>

                      <Button 
                        onClick={handleFindMatches}
                        className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Search className="w-5 h-5 mr-2" />
                        Start Sacred Journey
                      </Button>

                      <p className="text-xs text-center text-gray-500">
                        By continuing, you agree to our <a href="#" className="text-orange-600 hover:underline">Terms</a> and <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right - Spiritual Wedding Images */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Ram-Sita Wedding */}
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-[3/4] bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-4xl mb-2">🌺</div>
                        <h4 className="font-semibold text-orange-800 mb-1">राम-सीता विवाह</h4>
                        <p className="text-xs text-gray-600">Divine Union of Virtue</p>
                      </div>
                    </div>
                  </Card>

                  {/* Shiva-Parvati Wedding */}
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-4xl mb-2">🕉️</div>
                        <h4 className="font-semibold text-blue-800 mb-1">शिव-पार्वती विवाह</h4>
                        <p className="text-xs text-gray-600">Eternal Sacred Bond</p>
                      </div>
                    </div>
                  </Card>

                  {/* Krishna-Rukmini Wedding */}
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-[3/4] bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-4xl mb-2">🪶</div>
                        <h4 className="font-semibold text-yellow-800 mb-1">कृष्ण-रुक्मिणी विवाह</h4>
                        <p className="text-xs text-gray-600">Divine Love & Devotion</p>
                      </div>
                    </div>
                  </Card>

                  {/* Modern Spiritual Couple */}
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-[3/4] bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-4xl mb-2">🙏</div>
                        <h4 className="font-semibold text-green-800 mb-1">आपका विवाह</h4>
                        <p className="text-xs text-gray-600">Your Sacred Journey</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 italic">
                    "जब परमात्मा की कृपा हो, तो मिलन अवश्य होता है"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">10L+</div>
                <div className="text-gray-600">Registered Profiles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-600 mb-2">50K+</div>
                <div className="text-gray-600">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
                <div className="text-gray-600">Years of Trust</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-gray-600">Verified Profiles</div>
              </div>
            </div>
          </div>
        </section>

        {/* Three Sacred Steps */}
        <ThreeSacredSteps />

        {/* Sattvik Connect Preview */}
        <SattvikConnectPreview />

        {/* Success Stories */}
        <SuccessStoriesCarousel />
      </main>
      
      <Footer />
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
