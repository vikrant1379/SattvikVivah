
import React, { memo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Video } from 'lucide-react';

interface CeremonyService {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  duration: string;
  price: string;
  includes: string[];
  recommended: boolean;
}

const VirtualCeremonyServices = memo(() => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services: CeremonyService[] = [
    {
      id: 'compatibility-blessing',
      name: 'Compatibility Blessing',
      sanskritName: 'Sambandhā Āśīrvāda',
      description: 'Sacred ritual to bless your connection and seek divine guidance',
      duration: '45 minutes',
      price: '₹2,999',
      includes: ['Ganesha Puja', 'Compatibility Chanting', 'Personal Guidance', 'Blessed Prasadam'],
      recommended: true
    },
    {
      id: 'engagement-ceremony',
      name: 'Virtual Engagement',
      sanskritName: 'Nischay Ceremony',
      description: 'Traditional engagement ceremony with Vedic mantras and rituals',
      duration: '90 minutes',
      price: '₹7,499',
      includes: ['Ring Exchange Mantras', 'Family Blessing', 'Sacred Fire Ritual', 'Certificate']
    },
    {
      id: 'pre-marriage-puja',
      name: 'Pre-Marriage Puja',
      sanskritName: 'Vivāha Pūrvak Pūjā',
      description: 'Comprehensive puja to remove obstacles and ensure marital bliss',
      duration: '2 hours',
      price: '₹12,999',
      includes: ['Navagraha Puja', 'Obstacle Removal', 'Prosperity Chanting', 'Astrological Remedies']
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-sandalwood/20 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-crimson font-bold text-indigo-night mb-4">
            Sacred Virtual Ceremonies
          </h2>
          <p className="text-xl text-indigo-night/70 max-w-3xl mx-auto">
            Receive divine blessings through authentic Vedic ceremonies conducted by verified pandits
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                service.recommended ? 'border-saffron bg-saffron/5' : 'border-temple-gold/30'
              }`}
            >
              {service.recommended && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-saffron text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-crimson text-indigo-night">
                  {service.name}
                </CardTitle>
                <p className="text-temple-gold font-devanagari text-sm">
                  {service.sanskritName}
                </p>
                <div className="text-2xl font-bold text-saffron mt-2">
                  {service.price}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-indigo-night/80 text-sm">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Video className="w-4 h-4" />
                    <span>Online</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-indigo-night text-sm">Includes:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {service.includes.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-temple-gold rounded-full"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className={`w-full ${
                    service.recommended 
                      ? 'bg-saffron hover:bg-saffron/90' 
                      : 'bg-temple-gold hover:bg-temple-gold/90'
                  } text-white`}
                  onClick={() => setSelectedService(service.id)}
                >
                  Book Sacred Ceremony
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="flex justify-center items-center space-x-8 text-sm text-indigo-night/70">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-saffron" />
              <span>Flexible Scheduling</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-saffron" />
              <span>Family Participation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Video className="w-4 h-4 text-saffron" />
              <span>HD Video Quality</span>
            </div>
          </div>
          
          <Badge className="bg-sandalwood/50 text-indigo-night border-temple-gold/30 px-6 py-2">
            🙏 Conducted by Verified Pandits • Sacred Mantras • Divine Blessings
          </Badge>
        </div>
      </div>
    </section>
  );
});

VirtualCeremonyServices.displayName = 'VirtualCeremonyServices';

export { VirtualCeremonyServices };
