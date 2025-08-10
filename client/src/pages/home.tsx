
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
        <section className="relative bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 py-20 sacred-pattern">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-center lg:justify-start mb-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-saffron text-5xl animate-om-pulse">🕉️</span>
                      <span className="text-rose-600 text-3xl">🌸</span>
                      <span className="text-temple-gold text-5xl animate-om-pulse">🕉️</span>
                    </div>
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-deep-maroon font-serif">
                    Sacred{" "}
                    <span className="bg-gradient-to-r from-saffron to-temple-gold bg-clip-text text-transparent block">
                      Vedic Matrimony
                    </span>
                  </h1>
                  <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-indigo-night font-serif">
                    🏛️ Where Divine Blessings Meet Sacred Unions 🏛️
                  </h2>
                  <p className="text-lg text-deep-maroon mb-3 font-serif italic">
                    Following the path of our revered divine couples
                  </p>
                  <p className="text-lg text-gray-700 mb-6 font-serif">
                    Begin your blessed journey of Grihastha Ashram through dharmic alliance
                  </p>
                  
                  {/* Sacred Matrimony Quotes */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-gradient-to-r from-orange-100/80 to-rose-100/80 p-4 rounded-lg border-l-4 border-orange-500">
                      <p className="text-base text-deep-maroon italic font-serif">
                        "धर्मे च अर्थे च कामे च मोक्षे च न विरोधः"
                      </p>
                      <p className="text-sm text-gray-700 mt-2 font-serif">
                        (In marriage, Dharma, Artha, Kama and Moksha are not in conflict)
                      </p>
                      <p className="text-xs text-orange-700 mt-1 font-serif">
                        - Vedic Scripture
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-100/80 to-purple-100/80 p-4 rounded-lg border-l-4 border-blue-500">
                      <p className="text-base text-deep-maroon italic font-serif">
                        "सह नाववतु सह नौ भुनक्तु"
                      </p>
                      <p className="text-sm text-gray-700 mt-2 font-serif">
                        (May we be protected together, may we be nourished together)
                      </p>
                      <p className="text-xs text-blue-700 mt-1 font-serif">
                        - Marriage Mantra from Upanishads
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Search Form */}
                <Card className="bg-card-cream/90 backdrop-blur-sm border-temple-gold/30 shadow-xl">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-deep-maroon mb-2">
                        🕉️ Begin Your Sacred Journey 🕉️
                      </h3>
                      <p className="text-sm text-indigo-night font-serif">Find your spiritual life partner</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-deep-maroon mb-1 font-serif">
                            Looking for
                          </label>
                          <select className="w-full p-3 border border-temple-gold/50 rounded-lg focus:ring-saffron focus:border-saffron bg-white/80">
                            <option>Bride</option>
                            <option>Groom</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-deep-maroon mb-1 font-serif">
                            Age
                          </label>
                          <select className="w-full p-3 border border-temple-gold/50 rounded-lg focus:ring-saffron focus:border-saffron bg-white/80">
                            <option>21 to 30</option>
                            <option>25 to 35</option>
                            <option>30 to 40</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-deep-maroon mb-1 font-serif">
                          Community
                        </label>
                        <select className="w-full p-3 border border-temple-gold/50 rounded-lg focus:ring-saffron focus:border-saffron bg-white/80">
                          <option>Any Community</option>
                          <option>Brahmin</option>
                          <option>Kshatriya</option>
                          <option>Vaishya</option>
                          <option>Shudra</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-deep-maroon mb-1 font-serif">
                          Location
                        </label>
                        <input 
                          type="text"
                          placeholder="Enter preferred location"
                          className="w-full p-3 border border-temple-gold/50 rounded-lg focus:ring-saffron focus:border-saffron bg-white/80"
                        />
                      </div>

                      <Button 
                        onClick={handleFindMatches}
                        className="w-full bg-gradient-to-r from-saffron to-temple-gold hover:from-saffron/90 hover:to-temple-gold/90 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 font-serif"
                      >
                        <Search className="w-5 h-5 mr-2" />
                        Start Sacred Journey
                      </Button>

                      <p className="text-xs text-center text-deep-maroon/70 font-serif">
                        By proceeding, you agree to our <a href="#" className="text-saffron hover:underline font-semibold">Terms</a> and <a href="#" className="text-saffron hover:underline font-semibold">Privacy Policy</a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right - Sacred Divine Marriages */}
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-deep-maroon mb-2 font-serif">
                    🏛️ Divine Marriages in Our Scriptures 🏛️
                  </h3>
                  <p className="text-sm text-gray-700 font-serif italic">
                    Following the sacred path of our revered divine couples
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ram-Sita Swayamvara */}
                  <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-orange-300/50 hover:border-orange-500/70 bg-gradient-to-br from-orange-50 to-rose-50">
                    <div className="aspect-[4/5] relative group">
                      <div className="absolute inset-0 bg-gradient-to-b from-orange-100/50 to-rose-200/50"></div>
                      <div className="absolute inset-6 border-3 border-orange-400/40 rounded-lg bg-gradient-to-br from-orange-50/90 to-rose-50/90 backdrop-blur-sm">
                        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                          {/* Traditional Wedding Scene */}
                          <div className="mb-4 transform group-hover:scale-105 transition-transform duration-500">
                            <div className="relative">
                              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-3 shadow-xl mx-auto">
                                <span className="text-3xl text-white">🏹</span>
                              </div>
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                <span className="text-xs">👑</span>
                              </div>
                            </div>
                            <div className="flex justify-center space-x-2 mb-2">
                              <span className="text-xl">🏛️</span>
                              <span className="text-xl">🔥</span>
                              <span className="text-xl">🏛️</span>
                            </div>
                            <div className="flex justify-center space-x-1">
                              <span className="text-lg">🌺</span>
                              <span className="text-lg">💍</span>
                              <span className="text-lg">👑</span>
                              <span className="text-lg">💍</span>
                              <span className="text-lg">🌺</span>
                            </div>
                          </div>
                          <h4 className="font-bold text-orange-900 mb-2 text-base font-serif">श्री राम-सीता विवाह</h4>
                          <h5 className="font-semibold text-orange-800 mb-2 text-sm">Ram-Sita Sacred Wedding</h5>
                          <p className="text-xs text-orange-700 font-serif italic mb-2">Swayamvara & Divine Union</p>
                          <p className="text-xs text-gray-700 font-serif">
                            "धनुर्भंग से सीता स्वयंवर" - The sacred bow-breaking ceremony
                          </p>
                          <div className="mt-3 flex justify-center space-x-2">
                            <span className="text-sm">🏹</span>
                            <span className="text-sm">🕉️</span>
                            <span className="text-sm">🌸</span>
                            <span className="text-sm">🕉️</span>
                            <span className="text-sm">🏹</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Shiva-Parvati Wedding */}
                  <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-blue-300/50 hover:border-blue-500/70 bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="aspect-[4/5] relative group">
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 to-purple-200/50"></div>
                      <div className="absolute inset-6 border-3 border-blue-400/40 rounded-lg bg-gradient-to-br from-blue-50/90 to-purple-50/90 backdrop-blur-sm">
                        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                          <div className="mb-4 transform group-hover:scale-105 transition-transform duration-500">
                            <div className="relative">
                              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-3 shadow-xl mx-auto">
                                <span className="text-3xl text-white">🔱</span>
                              </div>
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-blue-400">
                                <span className="text-xs">🌙</span>
                              </div>
                            </div>
                            <div className="flex justify-center space-x-2 mb-2">
                              <span className="text-xl">🏔️</span>
                              <span className="text-xl">🔥</span>
                              <span className="text-xl">🏔️</span>
                            </div>
                            <div className="flex justify-center space-x-1">
                              <span className="text-lg">🕉️</span>
                              <span className="text-lg">🌙</span>
                              <span className="text-lg">💍</span>
                              <span className="text-lg">🌟</span>
                              <span className="text-lg">🕉️</span>
                            </div>
                          </div>
                          <h4 className="font-bold text-blue-900 mb-2 text-base font-serif">शिव-पार्वती विवाह</h4>
                          <h5 className="font-semibold text-blue-800 mb-2 text-sm">Shiva-Parvati Sacred Union</h5>
                          <p className="text-xs text-blue-700 font-serif italic mb-2">Cosmic Marriage Ceremony</p>
                          <p className="text-xs text-gray-700 font-serif">
                            "अर्धनारीश्वर रूप" - The eternal cosmic balance
                          </p>
                          <div className="mt-3 flex justify-center space-x-2">
                            <span className="text-sm">🔱</span>
                            <span className="text-sm">🕉️</span>
                            <span className="text-sm">🌙</span>
                            <span className="text-sm">🕉️</span>
                            <span className="text-sm">🔱</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Krishna-Rukmini Wedding */}
                  <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-yellow-300/50 hover:border-yellow-500/70 bg-gradient-to-br from-yellow-50 to-amber-50">
                    <div className="aspect-[4/5] relative group">
                      <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/50 to-amber-200/50"></div>
                      <div className="absolute inset-6 border-3 border-yellow-400/40 rounded-lg bg-gradient-to-br from-yellow-50/90 to-amber-50/90 backdrop-blur-sm">
                        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                          <div className="mb-4 transform group-hover:scale-105 transition-transform duration-500">
                            <div className="relative">
                              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-3 shadow-xl mx-auto">
                                <span className="text-3xl text-white">🪶</span>
                              </div>
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-xs text-white">🦚</span>
                              </div>
                            </div>
                            <div className="flex justify-center space-x-2 mb-2">
                              <span className="text-xl">🏰</span>
                              <span className="text-xl">🔥</span>
                              <span className="text-xl">🏰</span>
                            </div>
                            <div className="flex justify-center space-x-1">
                              <span className="text-lg">🌸</span>
                              <span className="text-lg">💝</span>
                              <span className="text-lg">💍</span>
                              <span className="text-lg">🦚</span>
                              <span className="text-lg">🌸</span>
                            </div>
                          </div>
                          <h4 className="font-bold text-yellow-900 mb-2 text-base font-serif">कृष्ण-रुक्मिणी विवाह</h4>
                          <h5 className="font-semibold text-yellow-800 mb-2 text-sm">Krishna-Rukmini Wedding</h5>
                          <p className="text-xs text-yellow-700 font-serif italic mb-2">Divine Love & Sacred Devotion</p>
                          <p className="text-xs text-gray-700 font-serif">
                            "प्रेम विवाह का आदर्श" - The ideal of love marriage
                          </p>
                          <div className="mt-3 flex justify-center space-x-2">
                            <span className="text-sm">🪶</span>
                            <span className="text-sm">🕉️</span>
                            <span className="text-sm">💕</span>
                            <span className="text-sm">🕉️</span>
                            <span className="text-sm">🪶</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Your Sacred Journey */}
                  <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-green-300/50 hover:border-green-500/70 bg-gradient-to-br from-green-50 to-emerald-50">
                    <div className="aspect-[4/5] relative group">
                      <div className="absolute inset-0 bg-gradient-to-b from-green-100/50 to-emerald-200/50"></div>
                      <div className="absolute inset-6 border-3 border-green-400/40 rounded-lg bg-gradient-to-br from-green-50/90 to-emerald-50/90 backdrop-blur-sm">
                        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                          <div className="mb-4 transform group-hover:scale-105 transition-transform duration-500">
                            <div className="relative">
                              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-3 shadow-xl mx-auto animate-pulse">
                                <span className="text-3xl text-white">🙏</span>
                              </div>
                              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                                <span className="text-xs">✨</span>
                              </div>
                            </div>
                            <div className="flex justify-center space-x-2 mb-2">
                              <span className="text-xl">🏛️</span>
                              <span className="text-xl">🔥</span>
                              <span className="text-xl">🏛️</span>
                            </div>
                            <div className="flex justify-center space-x-1">
                              <span className="text-lg">🌟</span>
                              <span className="text-lg">💫</span>
                              <span className="text-lg">💍</span>
                              <span className="text-lg">💫</span>
                              <span className="text-lg">🌟</span>
                            </div>
                          </div>
                          <h4 className="font-bold text-green-900 mb-2 text-base font-serif">आपका पवित्र विवाह</h4>
                          <h5 className="font-semibold text-green-800 mb-2 text-sm">Your Sacred Wedding</h5>
                          <p className="text-xs text-green-700 font-serif italic mb-2">Divine Blessings Await</p>
                          <p className="text-xs text-gray-700 font-serif">
                            "भगवान की कृपा से मिलन" - Union blessed by the Divine
                          </p>
                          <div className="mt-3 flex justify-center space-x-2">
                            <span className="text-sm">🌟</span>
                            <span className="text-sm">🕉️</span>
                            <span className="text-sm">💖</span>
                            <span className="text-sm">🕉️</span>
                            <span className="text-sm">🌟</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="text-center bg-gradient-to-r from-orange-100/80 to-rose-100/80 p-6 rounded-lg border-2 border-temple-gold/30 shadow-lg">
                  <div className="flex justify-center mb-3">
                    <span className="text-3xl">🏛️</span>
                    <span className="text-2xl mx-2">🕉️</span>
                    <span className="text-3xl">🏛️</span>
                  </div>
                  <p className="text-base text-deep-maroon italic font-serif mb-2">
                    "जब ईश्वर आशीर्वाद देते हैं, तो मिलन अवश्यंभावी हो जाता है"
                  </p>
                  <p className="text-sm text-gray-700 font-serif mb-1">
                    "When the Divine blesses, union becomes inevitable"
                  </p>
                  <p className="text-xs text-indigo-night font-serif">
                    - Ancient Vedic Wisdom
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
