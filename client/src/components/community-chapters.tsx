
import React, { memo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Calendar, Users, Heart } from 'lucide-react';

interface CommunityChapter {
  id: string;
  city: string;
  state: string;
  members: number;
  coordinator: {
    name: string;
    avatar: string;
    title: string;
  };
  upcomingEvents: number;
  description: string;
  specialties: string[];
  established: string;
}

interface SpiritualEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  type: 'meditation' | 'discussion' | 'ceremony' | 'workshop';
  chapter: string;
}

const CommunityChapters = memo(() => {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  const chapters: CommunityChapter[] = [
    {
      id: 'mumbai',
      city: 'Mumbai',
      state: 'Maharashtra',
      members: 1247,
      coordinator: {
        name: 'Priya Sharma',
        avatar: '/api/placeholder/40/40',
        title: 'Senior Spiritual Counselor'
      },
      upcomingEvents: 8,
      description: 'Vibrant community focused on Vedantic philosophy and conscious relationships',
      specialties: ['Advaita Study', 'Couple Meditation', 'Vedic Ceremonies'],
      established: '2019'
    },
    {
      id: 'bangalore',
      city: 'Bangalore',
      state: 'Karnataka',
      members: 892,
      coordinator: {
        name: 'Raj Patel',
        avatar: '/api/placeholder/40/40',
        title: 'Yoga & Meditation Guide'
      },
      upcomingEvents: 12,
      description: 'Tech-savvy spiritual seekers combining ancient wisdom with modern life',
      specialties: ['Digital Detox', 'Mindful Communication', 'Sacred Geometry'],
      established: '2020'
    },
    {
      id: 'pune',
      city: 'Pune',
      state: 'Maharashtra',
      members: 656,
      coordinator: {
        name: 'Anita Desai',
        avatar: '/api/placeholder/40/40',
        title: 'Astrology & Compatibility Expert'
      },
      upcomingEvents: 5,
      description: 'Academic approach to spirituality with emphasis on scholarly study',
      specialties: ['Vedic Astrology', 'Sanskrit Study', 'Philosophy Circles'],
      established: '2018'
    },
    {
      id: 'delhi',
      city: 'Delhi',
      state: 'Delhi NCR',
      members: 1456,
      coordinator: {
        name: 'Vikram Singh',
        avatar: '/api/placeholder/40/40',
        title: 'Community Elder'
      },
      upcomingEvents: 15,
      description: 'Traditional approach to spiritual matchmaking and family values',
      specialties: ['Traditional Ceremonies', 'Family Integration', 'Cultural Heritage'],
      established: '2017'
    }
  ];

  const upcomingEvents: SpiritualEvent[] = [
    {
      id: 'event1',
      title: 'Group Meditation for Couples',
      date: '2025-01-25',
      time: '7:00 PM',
      location: 'Bandra Community Center',
      attendees: 24,
      type: 'meditation',
      chapter: 'mumbai'
    },
    {
      id: 'event2',
      title: 'Vedic Compatibility Workshop',
      date: '2025-01-27',
      time: '10:00 AM',
      location: 'Koramangala Spiritual Center',
      attendees: 18,
      type: 'workshop',
      chapter: 'bangalore'
    },
    {
      id: 'event3',
      title: 'Philosophy Discussion: Marriage in Vedas',
      date: '2025-01-28',
      time: '6:30 PM',
      location: 'Pune Study Circle',
      attendees: 15,
      type: 'discussion',
      chapter: 'pune'
    }
  ];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meditation': return '🧘';
      case 'discussion': return '💭';
      case 'ceremony': return '🕉️';
      case 'workshop': return '📚';
      default: return '✨';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meditation': return 'bg-blue-100 text-blue-800';
      case 'discussion': return 'bg-green-100 text-green-800';
      case 'ceremony': return 'bg-purple-100 text-purple-800';
      case 'workshop': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-sandalwood/20 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-crimson font-bold text-indigo-night mb-4">
            Spiritual Community Chapters
          </h2>
          <p className="text-xl text-indigo-night/70 max-w-3xl mx-auto">
            Connect with local seekers, join meaningful discussions, and participate in sacred gatherings
          </p>
        </div>

        {/* Community Chapters Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {chapters.map((chapter) => (
            <Card key={chapter.id} className="border-temple-gold/30 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-crimson text-indigo-night">
                      {chapter.city}
                    </CardTitle>
                    <p className="text-temple-gold text-sm">{chapter.state}</p>
                  </div>
                  <Badge className="bg-saffron/20 text-saffron">
                    Est. {chapter.established}
                  </Badge>
                </div>
                
                <p className="text-sm text-indigo-night/70">
                  {chapter.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Coordinator Info */}
                <div className="flex items-center space-x-3 p-3 bg-sandalwood/30 rounded-lg">
                  <Avatar>
                    <AvatarImage src={chapter.coordinator.avatar} />
                    <AvatarFallback>{chapter.coordinator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-indigo-night text-sm">{chapter.coordinator.name}</p>
                    <p className="text-xs text-gray-600">{chapter.coordinator.title}</p>
                  </div>
                </div>

                {/* Specialties */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-indigo-night">Specialties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {chapter.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-temple-gold/10 border-temple-gold/30 text-temple-gold">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{chapter.members.toLocaleString()} members</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{chapter.upcomingEvents} upcoming events</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full bg-saffron hover:bg-saffron/90 text-white"
                  onClick={() => setSelectedChapter(chapter.id)}
                >
                  Join {chapter.city} Chapter
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-crimson font-bold text-indigo-night text-center mb-8">
            Upcoming Spiritual Gatherings
          </h3>
          
          <div className="space-y-4">
            {upcomingEvents.map((event) => {
              const chapter = chapters.find(c => c.id === event.chapter);
              return (
                <Card key={event.id} className="border-temple-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-indigo-night">{event.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{event.attendees} attending</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        <Badge variant="outline" className="text-saffron border-saffron/30">
                          {chapter?.city}
                        </Badge>
                        <Button size="sm" className="bg-temple-gold hover:bg-temple-gold/90 text-white">
                          Join Event
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-saffron/10 to-temple-gold/10 border-saffron/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-crimson font-bold text-indigo-night mb-4">
                Start a Chapter in Your City
              </h3>
              <p className="text-indigo-night/70 mb-6">
                Bring spiritual seekers together in your community and help create meaningful connections
              </p>
              <Button className="bg-saffron hover:bg-saffron/90 text-white px-8 py-2">
                Become a Community Coordinator
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
});

CommunityChapters.displayName = 'CommunityChapters';

export { CommunityChapters };
