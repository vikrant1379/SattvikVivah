
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
        <section className="relative bg-gradient-to-br from-sandalwood/40 via-card-cream to-temple-gold/20 py-20 sacred-pattern">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-center lg:justify-start mb-4">
                    <span className="text-saffron font-devanagari text-4xl animate-om-pulse">ॐ</span>
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-deep-maroon font-devanagari">
                    खोजें अपना{" "}
                    <span className="bg-gradient-to-r from-saffron to-temple-gold bg-clip-text text-transparent block">
                      धर्मिक जीवनसाथी
                    </span>
                  </h1>
                  <h2 className="text-3xl lg:text-4xl font-semibold mb-4 text-indigo-night">
                    Find Your Sacred Companion
                  </h2>
                  <p className="text-xl text-gray-700 mb-2 font-serif">
                    गृहस्थाश्रम की पवित्र यात्रा के लिए
                  </p>
                  <p className="text-xl text-gray-700 mb-8 font-serif">
                    आध्यात्मिक मिलन, न कि भौतिक खोज
                  </p>
                  <div className="bg-gradient-to-r from-saffron/10 to-temple-gold/10 p-4 rounded-lg border-l-4 border-saffron">
                    <p className="text-base text-deep-maroon italic font-serif font-devanagari">
                      "विवाह केवल दो शरीरों का मिलन नहीं, बल्कि दो आत्माओं का पवित्र संयोग है"
                    </p>
                    <p className="text-sm text-gray-600 mt-2 font-serif">
                      "Marriage is not just union of bodies, but sacred communion of souls"
                    </p>
                  </div>
                </div>

                {/* Quick Search Form */}
                <Card className="bg-card-cream/90 backdrop-blur-sm border-temple-gold/30 shadow-xl">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-deep-maroon font-devanagari mb-2">
                        🕉️ पवित्र यात्रा प्रारंभ करें 🕉️
                      </h3>
                      <p className="text-sm text-indigo-night font-serif">Begin Your Sacred Journey</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-deep-maroon mb-1 font-serif">
                            खोज रहे हैं / Looking for
                          </label>
                          <select className="w-full p-3 border border-temple-gold/50 rounded-lg focus:ring-saffron focus:border-saffron bg-white/80">
                            <option>कन्या / Bride</option>
                            <option>वर / Groom</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-deep-maroon mb-1 font-serif">
                            आयु / Age
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
                          वर्ण / Community
                        </label>
                        <select className="w-full p-3 border border-temple-gold/50 rounded-lg focus:ring-saffron focus:border-saffron bg-white/80">
                          <option>कोई भी / Any Community</option>
                          <option>ब्राह्मण / Brahmin</option>
                          <option>क्षत्रिय / Kshatriya</option>
                          <option>वैश्य / Vaishya</option>
                          <option>शूद्र / Shudra</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-deep-maroon mb-1 font-serif">
                          स्थान / Location
                        </label>
                        <input 
                          type="text"
                          placeholder="अपना पसंदीदा स्थान दर्ज करें / Enter preferred location"
                          className="w-full p-3 border border-temple-gold/50 rounded-lg focus:ring-saffron focus:border-saffron bg-white/80"
                        />
                      </div>

                      <Button 
                        onClick={handleFindMatches}
                        className="w-full bg-gradient-to-r from-saffron to-temple-gold hover:from-saffron/90 hover:to-temple-gold/90 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 font-serif"
                      >
                        <Search className="w-5 h-5 mr-2" />
                        पवित्र यात्रा शुरू करें / Start Sacred Journey
                      </Button>

                      <p className="text-xs text-center text-deep-maroon/70 font-serif">
                        आगे बढ़कर, आप हमारी <a href="#" className="text-saffron hover:underline font-semibold">शर्तों</a> और <a href="#" className="text-saffron hover:underline font-semibold">गोपनीयता नीति</a> से सहमत हैं
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right - Divine Marriage Artworks */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Ram-Sita Wedding */}
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-temple-gold/30 hover:border-saffron/50">
                    <div className="aspect-[3/4] bg-gradient-to-br from-orange-100 via-rose-50 to-yellow-50 relative group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute inset-4 border-2 border-temple-gold/30 rounded-lg bg-gradient-to-br from-orange-50/80 to-rose-50/80 backdrop-blur-sm">
                        <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                          <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center mb-2 shadow-lg">
                              <span className="text-2xl text-white">🏹</span>
                            </div>
                            <div className="flex justify-center space-x-1">
                              <span className="text-lg">👑</span>
                              <span className="text-lg">💍</span>
                              <span className="text-lg">👑</span>
                            </div>
                          </div>
                          <h4 className="font-bold text-orange-800 mb-1 font-devanagari text-sm">राम-सीता विवाह</h4>
                          <p className="text-xs text-orange-700 font-serif italic">Divine Union of Dharma</p>
                          <div className="mt-2 flex justify-center space-x-1">
                            <span className="text-xs">🌺</span>
                            <span className="text-xs">🕉️</span>
                            <span className="text-xs">🌺</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Shiva-Parvati Wedding */}
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-temple-gold/30 hover:border-saffron/50">
                    <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-50 relative group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute inset-4 border-2 border-blue-300/40 rounded-lg bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm">
                        <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                          <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-2 shadow-lg">
                              <span className="text-2xl text-white font-devanagari">🔱</span>
                            </div>
                            <div className="flex justify-center space-x-1">
                              <span className="text-lg">🌙</span>
                              <span className="text-lg">💫</span>
                              <span className="text-lg">🌟</span>
                            </div>
                          </div>
                          <h4 className="font-bold text-blue-800 mb-1 font-devanagari text-sm">शिव-पार्वती विवाह</h4>
                          <p className="text-xs text-blue-700 font-serif italic">Eternal Cosmic Union</p>
                          <div className="mt-2 flex justify-center space-x-1">
                            <span className="text-xs">🕉️</span>
                            <span className="text-xs">🔱</span>
                            <span className="text-xs">🕉️</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Krishna-Rukmini Wedding */}
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-temple-gold/30 hover:border-saffron/50">
                    <div className="aspect-[3/4] bg-gradient-to-br from-yellow-100 via-orange-50 to-amber-50 relative group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute inset-4 border-2 border-yellow-300/40 rounded-lg bg-gradient-to-br from-yellow-50/80 to-orange-50/80 backdrop-blur-sm">
                        <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                          <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-2 shadow-lg">
                              <span className="text-2xl text-white">🪶</span>
                            </div>
                            <div className="flex justify-center space-x-1">
                              <span className="text-lg">🦚</span>
                              <span className="text-lg">💝</span>
                              <span className="text-lg">🌸</span>
                            </div>
                          </div>
                          <h4 className="font-bold text-yellow-800 mb-1 font-devanagari text-sm">कृष्ण-रुक्मिणी विवाह</h4>
                          <p className="text-xs text-yellow-700 font-serif italic">Divine Love & Devotion</p>
                          <div className="mt-2 flex justify-center space-x-1">
                            <span className="text-xs">🪶</span>
                            <span className="text-xs">💕</span>
                            <span className="text-xs">🪶</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Your Sacred Journey */}
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-temple-gold/30 hover:border-saffron/50">
                    <div className="aspect-[3/4] bg-gradient-to-br from-green-100 via-teal-50 to-emerald-50 relative group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute inset-4 border-2 border-green-300/40 rounded-lg bg-gradient-to-br from-green-50/80 to-teal-50/80 backdrop-blur-sm">
                        <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                          <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-2 shadow-lg animate-pulse">
                              <span className="text-2xl text-white">🙏</span>
                            </div>
                            <div className="flex justify-center space-x-1">
                              <span className="text-lg">✨</span>
                              <span className="text-lg">💫</span>
                              <span className="text-lg">✨</span>
                            </div>
                          </div>
                          <h4 className="font-bold text-green-800 mb-1 font-devanagari text-sm">आपका पवित्र विवाह</h4>
                          <p className="text-xs text-green-700 font-serif italic">Your Sacred Journey</p>
                          <div className="mt-2 flex justify-center space-x-1">
                            <span className="text-xs">🌟</span>
                            <span className="text-xs">💖</span>
                            <span className="text-xs">🌟</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="text-center bg-gradient-to-r from-saffron/10 to-temple-gold/10 p-4 rounded-lg border border-temple-gold/20">
                  <p className="text-sm text-deep-maroon italic font-devanagari mb-1">
                    "जब परमात्मा की कृपा हो, तो मिलन अवश्य होता है"
                  </p>
                  <p className="text-xs text-indigo-night font-serif">
                    "When the Divine blesses, union becomes inevitable"
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
