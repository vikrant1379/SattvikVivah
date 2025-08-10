
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
        {/* Hero Section with Sacred Background */}
        <section className="relative bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 py-20 overflow-hidden">
          {/* Sacred Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-6xl text-orange-400 animate-pulse">🕉️</div>
            <div className="absolute top-20 right-20 text-4xl text-rose-400">🪷</div>
            <div className="absolute bottom-20 left-20 text-5xl text-amber-400">☸️</div>
            <div className="absolute bottom-10 right-10 text-4xl text-orange-400">🔯</div>
            <div className="absolute top-1/2 left-1/4 text-3xl text-rose-300">💫</div>
            <div className="absolute top-1/3 right-1/3 text-4xl text-amber-300">✨</div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content - Main Message */}
              <div className="space-y-8">
                <div className="text-center lg:text-left">
                  {/* Sacred Symbol Header */}
                  <div className="flex items-center justify-center lg:justify-start mb-8">
                    <div className="flex items-center space-x-4">
                      <span className="text-saffron text-6xl animate-pulse">🕉️</span>
                      <span className="text-rose-600 text-4xl">🪷</span>
                      <span className="text-blue-600 text-5xl">☸️</span>
                      <span className="text-amber-600 text-4xl">🔯</span>
                    </div>
                  </div>

                  {/* Main Headlines */}
                  <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-deep-maroon font-serif leading-tight">
                    Find Your{" "}
                    <span className="bg-gradient-to-r from-saffron via-temple-gold to-orange-500 bg-clip-text text-transparent block">
                      Dharmic Life Partner
                    </span>
                  </h1>

                  <div className="mb-8">
                    <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-indigo-night font-serif">
                      🏛️ Where Ancient Wisdom Meets Sacred Love 🏛️
                    </h2>
                    <p className="text-lg text-deep-maroon mb-4 font-serif italic">
                      "Where souls unite in the sacred bond of Vedic matrimony"
                    </p>
                    <p className="text-lg text-gray-700 font-serif">
                      Find your perfect companion who shares your spiritual journey and traditional values across all Vedic traditions
                    </p>
                  </div>

                  {/* Sacred Message */}
                  <div className="bg-gradient-to-r from-orange-100/90 to-rose-100/90 p-6 rounded-xl border-2 border-orange-200/50 shadow-lg mb-8">
                    <div className="flex justify-center mb-3">
                      <span className="text-2xl">🙏</span>
                      <span className="text-xl mx-2">✨</span>
                      <span className="text-2xl">🙏</span>
                    </div>
                    <p className="text-base text-deep-maroon italic font-serif mb-2">
                      "In the sacred tradition of Sanatan Dharma, marriage is not just a union of two individuals, but a divine covenant blessed by the gods"
                    </p>
                    <p className="text-sm text-gray-700 font-serif">
                      Here, spiritual souls from all Vedic paths find their perfect match for a lifetime of dharmic living
                    </p>
                  </div>

                  {/* Spiritual Paths Showcase */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="text-center p-4 bg-gradient-to-b from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                      <div className="text-3xl mb-2">🕉️</div>
                      <p className="text-sm font-semibold text-orange-800">Hinduism</p>
                      <p className="text-xs text-gray-600">Sanatana Dharma</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                      <div className="text-3xl mb-2">☸️</div>
                      <p className="text-sm font-semibold text-blue-800">Buddhism</p>
                      <p className="text-xs text-gray-600">Dharma Path</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-b from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                      <div className="text-3xl mb-2">🔯</div>
                      <p className="text-sm font-semibold text-amber-800">Jainism</p>
                      <p className="text-xs text-gray-600">Ahimsa Path</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="text-3xl mb-2">🪯</div>
                      <p className="text-sm font-semibold text-purple-800">Sikhism</p>
                      <p className="text-xs text-gray-600">Guru's Path</p>
                    </div>
                  </div>

                  {/* Main CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button 
                      onClick={handleFindMatches}
                      className="bg-gradient-to-r from-saffron via-temple-gold to-orange-500 hover:from-saffron/90 hover:via-temple-gold/90 hover:to-orange-500/90 text-white px-8 py-4 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 font-serif rounded-xl"
                    >
                      <Heart className="w-6 h-6 mr-3" />
                      Begin Your Sacred Journey
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-2 border-orange-400 text-orange-700 hover:bg-orange-50 px-8 py-4 text-lg font-semibold transition-all duration-300 font-serif rounded-xl"
                    >
                      <Users className="w-5 h-5 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right - Divine Couples Showcase */}
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-deep-maroon mb-4 font-serif">
                    🏛️ Divine Unions in Sacred Traditions 🏛️
                  </h3>
                  <p className="text-lg text-gray-700 font-serif italic">
                    Following the blessed path of divine couples across all spiritual traditions
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ram-Sita Divine Wedding */}
                  <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-orange-300/50 hover:border-orange-500/70 bg-gradient-to-br from-orange-50 to-rose-50 group">
                    <div className="aspect-[4/5] relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-orange-100/30 to-rose-200/30"></div>
                      <div className="absolute inset-4 border-3 border-orange-400/50 rounded-xl bg-gradient-to-br from-orange-50/95 to-rose-50/95 backdrop-blur-sm">
                        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                          <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                            <div className="relative">
                              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4 shadow-2xl mx-auto">
                                <span className="text-4xl text-white">🏹</span>
                              </div>
                              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-sm">👑</span>
                              </div>
                            </div>
                            <div className="flex justify-center space-x-3 mb-3">
                              <span className="text-2xl">🏛️</span>
                              <span className="text-2xl">🔥</span>
                              <span className="text-2xl">🏛️</span>
                            </div>
                          </div>
                          <h4 className="font-bold text-orange-900 mb-3 text-lg font-serif">श्री राम-सीता विवाह</h4>
                          <h5 className="font-semibold text-orange-800 mb-3 text-sm">Ram-Sita Sacred Wedding</h5>
                          <p className="text-xs text-orange-700 font-serif italic mb-3">Divine Swayamvara Union</p>
                          <p className="text-xs text-gray-700 font-serif leading-relaxed">
                            The sacred bow-breaking ceremony that united dharma and devotion in eternal love
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Shiva-Parvati Cosmic Union */}
                  <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-blue-300/50 hover:border-blue-500/70 bg-gradient-to-br from-blue-50 to-purple-50 group">
                    <div className="aspect-[4/5] relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/30 to-purple-200/30"></div>
                      <div className="absolute inset-4 border-3 border-blue-400/50 rounded-xl bg-gradient-to-br from-blue-50/95 to-purple-50/95 backdrop-blur-sm">
                        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                          <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                            <div className="relative">
                              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center mb-4 shadow-2xl mx-auto">
                                <span className="text-4xl text-white">🔱</span>
                              </div>
                              <div className="absolute -top-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-blue-400 shadow-lg">
                                <span className="text-sm">🌙</span>
                              </div>
                            </div>
                            <div className="flex justify-center space-x-3 mb-3">
                              <span className="text-2xl">🏔️</span>
                              <span className="text-2xl">🔥</span>
                              <span className="text-2xl">🏔️</span>
                            </div>
                          </div>
                          <h4 className="font-bold text-blue-900 mb-3 text-lg font-serif">शिव-पार्वती विवाह</h4>
                          <h5 className="font-semibold text-blue-800 mb-3 text-sm">Shiva-Parvati Cosmic Union</h5>
                          <p className="text-xs text-blue-700 font-serif italic mb-3">Ardhanarishvara Balance</p>
                          <p className="text-xs text-gray-700 font-serif leading-relaxed">
                            The eternal cosmic marriage representing perfect divine balance and unity
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Krishna-Rukmini Love Marriage */}
                  <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-yellow-300/50 hover:border-yellow-500/70 bg-gradient-to-br from-yellow-50 to-amber-50 group">
                    <div className="aspect-[4/5] relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/30 to-amber-200/30"></div>
                      <div className="absolute inset-4 border-3 border-yellow-400/50 rounded-xl bg-gradient-to-br from-yellow-50/95 to-amber-50/95 backdrop-blur-sm">
                        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                          <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                            <div className="relative">
                              <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mb-4 shadow-2xl mx-auto">
                                <span className="text-4xl text-white">🪶</span>
                              </div>
                              <div className="absolute -top-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-sm text-white">🦚</span>
                              </div>
                            </div>
                            <div className="flex justify-center space-x-3 mb-3">
                              <span className="text-2xl">🏰</span>
                              <span className="text-2xl">💕</span>
                              <span className="text-2xl">🏰</span>
                            </div>
                          </div>
                          <h4 className="font-bold text-yellow-900 mb-3 text-lg font-serif">कृष्ण-रुक्मिणी विवाह</h4>
                          <h5 className="font-semibold text-yellow-800 mb-3 text-sm">Krishna-Rukmini Wedding</h5>
                          <p className="text-xs text-yellow-700 font-serif italic mb-3">Divine Love Marriage</p>
                          <p className="text-xs text-gray-700 font-serif leading-relaxed">
                            The ideal of pure love and devotion culminating in sacred matrimony
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Your Sacred Journey */}
                  <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-green-300/50 hover:border-green-500/70 bg-gradient-to-br from-green-50 to-emerald-50 group">
                    <div className="aspect-[4/5] relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-green-100/30 to-emerald-200/30"></div>
                      <div className="absolute inset-4 border-3 border-green-400/50 rounded-xl bg-gradient-to-br from-green-50/95 to-emerald-50/95 backdrop-blur-sm">
                        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                          <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                            <div className="relative">
                              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-2xl mx-auto animate-pulse">
                                <span className="text-4xl text-white">🙏</span>
                              </div>
                              <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-lg">✨</span>
                              </div>
                            </div>
                            <div className="flex justify-center space-x-3 mb-3">
                              <span className="text-2xl">🏛️</span>
                              <span className="text-2xl">💫</span>
                              <span className="text-2xl">🏛️</span>
                            </div>
                          </div>
                          <h4 className="font-bold text-green-900 mb-3 text-lg font-serif">आपका पवित्र विवाह</h4>
                          <h5 className="font-semibold text-green-800 mb-3 text-sm">Your Sacred Wedding</h5>
                          <p className="text-xs text-green-700 font-serif italic mb-3">Divine Blessings Await</p>
                          <p className="text-xs text-gray-700 font-serif leading-relaxed">
                            Your blessed union awaits with divine grace across all spiritual traditions
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Sacred Wisdom Quote */}
                <div className="text-center bg-gradient-to-r from-orange-100/90 to-amber-100/90 p-8 rounded-xl border-2 border-temple-gold/40 shadow-xl">
                  <div className="flex justify-center mb-4">
                    <span className="text-4xl">🕉️</span>
                    <span className="text-3xl mx-3">✨</span>
                    <span className="text-4xl">🕉️</span>
                  </div>
                  <p className="text-lg text-deep-maroon italic font-serif mb-3">
                    "जब परमात्मा का आशीर्वाद मिलता है, तो पवित्र मिलन अवश्यंभावी हो जाता है"
                  </p>
                  <p className="text-base text-gray-700 font-serif mb-2">
                    "When the Divine blesses, sacred union becomes destined"
                  </p>
                  <p className="text-sm text-indigo-night font-serif">
                    - Universal Vedic Wisdom
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Registration Prompt */}
            <div className="mt-16 text-center">
              <Card className="bg-gradient-to-r from-white/95 to-orange-50/95 backdrop-blur-sm border-2 border-orange-200/50 shadow-2xl max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-deep-maroon mb-3 font-serif">
                      🌟 Ready to Find Your Spiritual Soulmate? 🌟
                    </h3>
                    <p className="text-lg text-gray-700 font-serif">
                      Join thousands of spiritual souls who have found their dharmic life partners
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-orange-50/50 rounded-lg">
                      <div className="text-2xl mb-2">🔒</div>
                      <h4 className="font-semibold text-orange-800 mb-1">Secure & Sacred</h4>
                      <p className="text-sm text-gray-600">Your privacy is as sacred as your spiritual journey</p>
                    </div>
                    <div className="text-center p-4 bg-rose-50/50 rounded-lg">
                      <div className="text-2xl mb-2">✅</div>
                      <h4 className="font-semibold text-rose-800 mb-1">Verified Profiles</h4>
                      <p className="text-sm text-gray-600">Only genuine souls seeking dharmic union</p>
                    </div>
                    <div className="text-center p-4 bg-amber-50/50 rounded-lg">
                      <div className="text-2xl mb-2">🕒</div>
                      <h4 className="font-semibold text-amber-800 mb-1">24/7 Support</h4>
                      <p className="text-sm text-gray-600">Our spiritual guidance team is here to help</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-deep-maroon mb-2 font-serif">
                        Looking for
                      </label>
                      <select className="w-full p-3 border border-orange-300 rounded-lg focus:ring-saffron focus:border-saffron bg-white/90">
                        <option>Bride</option>
                        <option>Groom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-deep-maroon mb-2 font-serif">
                        Spiritual Path
                      </label>
                      <select className="w-full p-3 border border-orange-300 rounded-lg focus:ring-saffron focus:border-saffron bg-white/90">
                        <option>Hinduism</option>
                        <option>Buddhism</option>
                        <option>Jainism</option>
                        <option>Sikhism</option>
                        <option>Other Vedic Tradition</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-deep-maroon mb-2 font-serif">
                        Creating profile for
                      </label>
                      <select className="w-full p-3 border border-orange-300 rounded-lg focus:ring-saffron focus:border-saffron bg-white/90">
                        <option>Self</option>
                        <option>Son</option>
                        <option>Daughter</option>
                        <option>Relative</option>
                      </select>
                    </div>
                  </div>

                  <Button 
                    onClick={handleFindMatches}
                    className="w-full bg-gradient-to-r from-saffron via-temple-gold to-orange-500 hover:from-saffron/90 hover:via-temple-gold/90 hover:to-orange-500/90 text-white py-4 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 font-serif rounded-xl"
                  >
                    <Star className="w-6 h-6 mr-3" />
                    Begin Your Divine Search
                  </Button>

                  <p className="text-xs text-center text-deep-maroon/70 mt-4 font-serif">
                    By proceeding, you agree to our <a href="#" className="text-saffron hover:underline font-semibold">Terms of Service</a> and <a href="#" className="text-saffron hover:underline font-semibold">Privacy Policy</a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Trust & Statistics Section */}
        <section className="py-16 bg-gradient-to-b from-white to-orange-50/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-deep-maroon mb-4 font-serif">
                🏛️ Blessed by Divine Grace 🏛️
              </h2>
              <p className="text-lg text-gray-700 font-serif">
                Thousands of spiritual souls have found their perfect dharmic match through our sacred platform
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-gradient-to-b from-orange-50 to-orange-100 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-orange-600 mb-2">10L+</div>
                <div className="text-gray-700 font-serif">Registered Spiritual Souls</div>
                <div className="text-2xl mt-2">🙏</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-b from-rose-50 to-rose-100 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-rose-600 mb-2">75K+</div>
                <div className="text-gray-700 font-serif">Blessed Unions</div>
                <div className="text-2xl mt-2">💕</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-b from-amber-50 to-amber-100 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-amber-600 mb-2">25+</div>
                <div className="text-gray-700 font-serif">Years of Sacred Service</div>
                <div className="text-2xl mt-2">⭐</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-b from-green-50 to-green-100 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-gray-700 font-serif">Verified Sacred Profiles</div>
                <div className="text-2xl mt-2">✅</div>
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
