
import { memo, useRef, useEffect, useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ThreeSacredSteps from "@/components/three-sacred-steps";
import SattvikConnectPreview from "@/components/sattvik-connect-preview";
import SuccessStoriesCarousel from "@/components/success-stories-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Search, Users, Star, Shield, Clock, CheckCircle, Phone, Mail, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Home = memo(() => {
  const homeRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

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
        <section className="relative min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-red-50 overflow-hidden">
          {/* Sacred Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 text-8xl text-orange-600 animate-pulse">🕉️</div>
            <div className="absolute top-20 right-20 text-6xl text-amber-600 floating-animation">🪷</div>
            <div className="absolute bottom-20 left-20 text-7xl text-red-600">🔱</div>
            <div className="absolute bottom-10 right-10 text-5xl text-orange-600 animate-bounce">✨</div>
            <div className="absolute top-1/3 left-1/4 text-4xl text-amber-500">🏛️</div>
            <div className="absolute top-2/3 right-1/3 text-6xl text-red-400">🔥</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-orange-400">💫</div>
          </div>

          {/* Floating Lotus Petals */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 text-2xl text-pink-300 animate-bounce opacity-60">🌸</div>
            <div className="absolute top-1/3 right-1/4 text-3xl text-rose-300 floating-animation opacity-40">🌺</div>
            <div className="absolute bottom-1/3 left-1/3 text-2xl text-orange-300 animate-pulse opacity-50">🏵️</div>
            <div className="absolute bottom-1/4 right-1/3 text-2xl text-amber-300 floating-animation opacity-60">🌼</div>
          </div>

          <div className="container mx-auto px-4 relative z-10 py-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
              {/* Left Content - Sacred Messaging */}
              <div className="space-y-10">
                {/* Welcome Header */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-8">
                    <div className="flex items-center space-x-6 text-6xl">
                      <span className="text-saffron animate-pulse">🕉️</span>
                      <span className="text-temple-gold">✨</span>
                      <span className="text-deep-maroon">🙏</span>
                    </div>
                  </div>

                  <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-deep-maroon font-serif leading-tight">
                    Welcome to{" "}
                    <span className="bg-gradient-to-r from-saffron via-temple-gold to-orange-600 bg-clip-text text-transparent block mt-2">
                      SattvikVivah
                    </span>
                  </h1>

                  <div className="mb-8">
                    <h2 className="text-2xl lg:text-4xl font-semibold mb-6 text-indigo-night font-serif italic">
                      Where Ancient Wisdom Meets Modern Love
                    </h2>
                    
                    <div className="bg-gradient-to-r from-white/90 via-orange-50/90 to-amber-50/90 p-8 rounded-2xl border-2 border-temple-gold/30 shadow-xl backdrop-blur-sm">
                      <div className="flex justify-center mb-4">
                        <span className="text-3xl">🏛️</span>
                        <span className="text-2xl mx-3">💕</span>
                        <span className="text-3xl">🏛️</span>
                      </div>
                      <p className="text-lg text-deep-maroon font-serif italic mb-4 leading-relaxed">
                        "In the sacred tradition of Sanatan Dharma, marriage is not just a union of two individuals, but a divine covenant blessed by the gods."
                      </p>
                      <p className="text-base text-gray-700 font-serif">
                        Here, spiritual souls find their perfect match for a lifetime of dharmic living.
                      </p>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="text-center p-6 bg-gradient-to-b from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200/50 shadow-lg">
                      <div className="text-4xl mb-3">🔮</div>
                      <h3 className="font-semibold text-orange-800 mb-2">Vedic Compatibility</h3>
                      <p className="text-sm text-gray-600 font-serif">Based on spiritual values & dharmic principles</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-b from-amber-50 to-amber-100 rounded-xl border-2 border-amber-200/50 shadow-lg">
                      <div className="text-4xl mb-3">🏛️</div>
                      <h3 className="font-semibold text-amber-800 mb-2">Sacred Approach</h3>
                      <p className="text-sm text-gray-600 font-serif">Traditional matchmaking with modern convenience</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-b from-red-50 to-red-100 rounded-xl border-2 border-red-200/50 shadow-lg">
                      <div className="text-4xl mb-3">🤝</div>
                      <h3 className="font-semibold text-red-800 mb-2">Spiritual Community</h3>
                      <p className="text-sm text-gray-600 font-serif">Connect with like-minded Vedic souls</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-xl border-2 border-yellow-200/50 shadow-lg">
                      <div className="text-4xl mb-3">🙏</div>
                      <h3 className="font-semibold text-yellow-800 mb-2">Divine Blessings</h3>
                      <p className="text-sm text-gray-600 font-serif">Begin with blessings of divine couples</p>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                    <Button 
                      onClick={handleFindMatches}
                      size="lg"
                      className="bg-gradient-to-r from-saffron via-temple-gold to-orange-600 hover:from-saffron/90 hover:via-temple-gold/90 hover:to-orange-600/90 text-white px-10 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 font-serif rounded-2xl transform hover:scale-105"
                    >
                      <Heart className="w-7 h-7 mr-3" />
                      Find Your Better Half
                    </Button>
                    <Button 
                      variant="outline"
                      size="lg"
                      className="border-3 border-deep-maroon text-deep-maroon hover:bg-deep-maroon hover:text-white px-10 py-6 text-lg font-semibold transition-all duration-500 font-serif rounded-2xl transform hover:scale-105"
                    >
                      <Users className="w-6 h-6 mr-3" />
                      Join Our Sacred Community
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right - Divine Couples & Registration */}
              <div className="space-y-10">
                {/* Divine Couples Collage */}
                <div className="bg-gradient-to-br from-white/95 to-orange-50/95 p-8 rounded-3xl border-3 border-temple-gold/40 shadow-2xl backdrop-blur-sm">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-deep-maroon mb-4 font-serif">
                      🏛️ Divine Unions in Sacred Tradition 🏛️
                    </h3>
                    <p className="text-lg text-gray-700 font-serif italic">
                      Following the blessed path of divine couples
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Ram-Sita */}
                    <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-3 border-orange-300/60 bg-gradient-to-br from-orange-50 to-red-50 group cursor-pointer">
                      <div className="aspect-square relative">
                        <div className="absolute inset-2 border-2 border-orange-400/50 rounded-xl bg-gradient-to-br from-orange-100/95 to-red-100/95 backdrop-blur-sm">
                          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-500">
                              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-3 shadow-xl mx-auto">
                                <span className="text-2xl text-white">🏹</span>
                              </div>
                              <div className="flex justify-center space-x-2 mb-2">
                                <span className="text-lg">🏛️</span>
                                <span className="text-lg">🔥</span>
                              </div>
                            </div>
                            <h4 className="font-bold text-orange-900 mb-2 text-sm font-serif">श्री राम-सीता</h4>
                            <h5 className="font-semibold text-orange-800 mb-2 text-xs">Divine Swayamvara</h5>
                            <p className="text-xs text-gray-700 font-serif leading-relaxed">
                              Sacred bow ceremony uniting dharma and devotion
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Shiva-Parvati */}
                    <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-3 border-blue-300/60 bg-gradient-to-br from-blue-50 to-purple-50 group cursor-pointer">
                      <div className="aspect-square relative">
                        <div className="absolute inset-2 border-2 border-blue-400/50 rounded-xl bg-gradient-to-br from-blue-100/95 to-purple-100/95 backdrop-blur-sm">
                          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-500">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center mb-3 shadow-xl mx-auto">
                                <span className="text-2xl text-white">🔱</span>
                              </div>
                              <div className="flex justify-center space-x-2 mb-2">
                                <span className="text-lg">🏔️</span>
                                <span className="text-lg">🔥</span>
                              </div>
                            </div>
                            <h4 className="font-bold text-blue-900 mb-2 text-sm font-serif">शिव-पार्वती</h4>
                            <h5 className="font-semibold text-blue-800 mb-2 text-xs">Cosmic Balance</h5>
                            <p className="text-xs text-gray-700 font-serif leading-relaxed">
                              Eternal union of divine masculine and feminine
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Krishna-Rukmini */}
                    <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-3 border-yellow-300/60 bg-gradient-to-br from-yellow-50 to-amber-50 group cursor-pointer">
                      <div className="aspect-square relative">
                        <div className="absolute inset-2 border-2 border-yellow-400/50 rounded-xl bg-gradient-to-br from-yellow-100/95 to-amber-100/95 backdrop-blur-sm">
                          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-500">
                              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mb-3 shadow-xl mx-auto">
                                <span className="text-2xl text-white">🪶</span>
                              </div>
                              <div className="flex justify-center space-x-2 mb-2">
                                <span className="text-lg">🏰</span>
                                <span className="text-lg">💕</span>
                              </div>
                            </div>
                            <h4 className="font-bold text-yellow-900 mb-2 text-sm font-serif">कृष्ण-रुक्मिणी</h4>
                            <h5 className="font-semibold text-yellow-800 mb-2 text-xs">Love Marriage</h5>
                            <p className="text-xs text-gray-700 font-serif leading-relaxed">
                              Pure love and devotion in sacred matrimony
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Sacred Quote */}
                  <div className="text-center bg-gradient-to-r from-amber-100/90 to-orange-100/90 p-6 rounded-xl border-2 border-temple-gold/40 shadow-xl">
                    <div className="flex justify-center mb-3">
                      <span className="text-3xl">🕉️</span>
                      <span className="text-2xl mx-3">✨</span>
                      <span className="text-3xl">🕉️</span>
                    </div>
                    <p className="text-base text-deep-maroon italic font-serif mb-2 leading-relaxed">
                      "धर्मे च अर्थे च कामे च मोक्षे च भरतर्षभ।<br/>
                      यदिहास्ति तदन्यत्र यन्नेहास्ति न तत्क्वचित्॥"
                    </p>
                    <p className="text-sm text-gray-700 font-serif">
                      "What exists here exists elsewhere; what does not exist here, exists nowhere"
                    </p>
                  </div>
                </div>

                {/* Registration/Login Form */}
                <Card className="bg-gradient-to-br from-white/98 to-sandalwood/50 backdrop-blur-sm border-3 border-temple-gold/50 shadow-2xl">
                  <CardContent className="p-8">
                    <div className="mb-8 text-center">
                      <h3 className="text-2xl font-bold text-deep-maroon mb-3 font-serif">
                        🌟 Ready to Find Your Spiritual Soulmate? 🌟
                      </h3>
                      <p className="text-gray-700 font-serif">
                        Begin your sacred journey toward divine matrimony
                      </p>
                    </div>

                    {/* Toggle Login/Register */}
                    <div className="flex mb-6">
                      <Button
                        variant={isLogin ? "default" : "outline"}
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 mr-2 font-serif ${isLogin ? 'bg-saffron hover:bg-saffron/90' : ''}`}
                      >
                        Login
                      </Button>
                      <Button
                        variant={!isLogin ? "default" : "outline"}
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 ml-2 font-serif ${!isLogin ? 'bg-saffron hover:bg-saffron/90' : ''}`}
                      >
                        Register
                      </Button>
                    </div>

                    <form className="space-y-6">
                      {!isLogin && (
                        <>
                          {/* Registration Fields */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-deep-maroon mb-2 font-serif">
                                Full Name *
                              </label>
                              <Input
                                type="text"
                                placeholder="Enter your full name"
                                className="border-orange-300 focus:border-saffron focus:ring-saffron bg-white/90"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-deep-maroon mb-2 font-serif">
                                Date of Birth *
                              </label>
                              <Input
                                type="date"
                                className="border-orange-300 focus:border-saffron focus:ring-saffron bg-white/90"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-deep-maroon mb-2 font-serif">
                                Looking for
                              </label>
                              <Select>
                                <SelectTrigger className="border-orange-300 focus:border-saffron bg-white/90">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="bride">Bride</SelectItem>
                                  <SelectItem value="groom">Groom</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-deep-maroon mb-2 font-serif">
                                Creating profile for
                              </label>
                              <Select>
                                <SelectTrigger className="border-orange-300 focus:border-saffron bg-white/90">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="self">Self</SelectItem>
                                  <SelectItem value="son">Son</SelectItem>
                                  <SelectItem value="daughter">Daughter</SelectItem>
                                  <SelectItem value="relative">Relative</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Email/Phone */}
                      <div>
                        <label className="block text-sm font-medium text-deep-maroon mb-2 font-serif">
                          {isLogin ? 'Email or Mobile Number' : 'Email Address OR Mobile Number'} *
                        </label>
                        <Input
                          type="text"
                          placeholder={isLogin ? "Enter email or mobile" : "Enter email or mobile number"}
                          className="border-orange-300 focus:border-saffron focus:ring-saffron bg-white/90"
                        />
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-sm font-medium text-deep-maroon mb-2 font-serif">
                          Password *
                        </label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="border-orange-300 focus:border-saffron focus:ring-saffron bg-white/90 pr-12"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      {isLogin && (
                        <div className="text-center">
                          <a href="#" className="text-saffron hover:underline font-serif text-sm">
                            Forgot Password? Receive divine guidance
                          </a>
                        </div>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-saffron via-temple-gold to-orange-600 hover:from-saffron/90 hover:via-temple-gold/90 hover:to-orange-600/90 text-white py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 font-serif rounded-xl"
                      >
                        <Star className="w-5 h-5 mr-3" />
                        {isLogin ? 'Start Your Divine Search' : 'Begin Your Sacred Journey'}
                      </Button>

                      {!isLogin && (
                        <p className="text-xs text-center text-deep-maroon/70 font-serif">
                          By registering, you agree to our{' '}
                          <a href="#" className="text-saffron hover:underline font-semibold">Terms of Service</a>
                          {' '}and{' '}
                          <a href="#" className="text-saffron hover:underline font-semibold">Privacy Policy</a>
                        </p>
                      )}
                    </form>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-orange-200/50">
                      <div className="text-center p-3 bg-green-50/80 rounded-lg">
                        <Shield className="w-6 h-6 mx-auto mb-2 text-green-600" />
                        <h4 className="font-semibold text-green-800 mb-1 text-xs">Secure & Sacred</h4>
                        <p className="text-xs text-gray-600">Your privacy is sacred</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50/80 rounded-lg">
                        <CheckCircle className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                        <h4 className="font-semibold text-blue-800 mb-1 text-xs">Verified Profiles</h4>
                        <p className="text-xs text-gray-600">Genuine souls only</p>
                      </div>
                      <div className="text-center p-3 bg-amber-50/80 rounded-lg">
                        <Clock className="w-6 h-6 mx-auto mb-2 text-amber-600" />
                        <h4 className="font-semibold text-amber-800 mb-1 text-xs">24/7 Support</h4>
                        <p className="text-xs text-gray-600">Spiritual guidance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Sacred Statistics */}
        <section className="py-20 bg-gradient-to-b from-white to-sandalwood/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-deep-maroon mb-6 font-serif">
                🏛️ Blessed by Divine Grace 🏛️
              </h2>
              <p className="text-xl text-gray-700 font-serif max-w-3xl mx-auto">
                Thousands of spiritual souls have found their perfect dharmic match through our sacred platform. 
                Join the blessed community of divine unions.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center p-8 bg-gradient-to-b from-orange-50 to-orange-100 rounded-2xl shadow-xl border-2 border-orange-200/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="text-5xl font-bold text-orange-600 mb-4">10L+</div>
                <div className="text-gray-700 font-serif font-semibold mb-2">Registered Souls</div>
                <div className="text-3xl">🙏</div>
              </div>
              <div className="text-center p-8 bg-gradient-to-b from-red-50 to-red-100 rounded-2xl shadow-xl border-2 border-red-200/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="text-5xl font-bold text-red-600 mb-4">75K+</div>
                <div className="text-gray-700 font-serif font-semibold mb-2">Blessed Unions</div>
                <div className="text-3xl">💕</div>
              </div>
              <div className="text-center p-8 bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl shadow-xl border-2 border-amber-200/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="text-5xl font-bold text-amber-600 mb-4">25+</div>
                <div className="text-gray-700 font-serif font-semibold mb-2">Years of Service</div>
                <div className="text-3xl">⭐</div>
              </div>
              <div className="text-center p-8 bg-gradient-to-b from-green-50 to-green-100 rounded-2xl shadow-xl border-2 border-green-200/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="text-5xl font-bold text-green-600 mb-4">100%</div>
                <div className="text-gray-700 font-serif font-semibold mb-2">Verified Profiles</div>
                <div className="text-3xl">✅</div>
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

      <style jsx>{`
        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
