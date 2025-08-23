
import React, { memo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Play, Users, Award, Clock } from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  sanskritTitle: string;
  description: string;
  duration: string;
  progress: number;
  lessons: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  rating: number;
  students: number;
}

const SpiritualLearningModules = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const modules: LearningModule[] = [
    {
      id: 'dharmic-relationships',
      title: 'Dharmic Relationships',
      sanskritTitle: 'Dhārmik Saṃbandhā',
      description: 'Understanding sacred partnerships and spiritual marriage principles',
      duration: '4 hours',
      progress: 65,
      lessons: 12,
      category: 'Relationships',
      difficulty: 'Beginner',
      instructor: 'Pandit Rajesh Sharma',
      rating: 4.8,
      students: 1247
    },
    {
      id: 'vedic-compatibility',
      title: 'Vedic Compatibility Science',
      sanskritTitle: 'Jyotiṣa Samyuktā',
      description: 'Deep dive into astrological matching and spiritual compatibility',
      duration: '6 hours',
      progress: 0,
      lessons: 18,
      category: 'Astrology',
      difficulty: 'Intermediate',
      instructor: 'Dr. Meera Acharya',
      rating: 4.9,
      students: 892
    },
    {
      id: 'conscious-communication',
      title: 'Conscious Communication',
      sanskrtTitle: 'Sacetan Samvāda',
      description: 'Mindful communication techniques for spiritual couples',
      duration: '3 hours',
      progress: 30,
      lessons: 10,
      category: 'Communication',
      difficulty: 'Beginner',
      instructor: 'Swami Ananda',
      rating: 4.7,
      students: 756
    },
    {
      id: 'grihastha-dharma',
      title: 'Grihastha Dharma',
      sanskritTitle: 'Gṛhastha Dharmā',
      description: 'The householder path to spiritual enlightenment',
      duration: '8 hours',
      progress: 0,
      lessons: 24,
      category: 'Philosophy',
      difficulty: 'Advanced',
      instructor: 'Acharya Vishnu Das',
      rating: 4.9,
      students: 543
    }
  ];

  const categories = ['all', 'Relationships', 'Astrology', 'Communication', 'Philosophy'];

  const filteredModules = selectedCategory === 'all' 
    ? modules 
    : modules.filter(module => module.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-crimson font-bold text-indigo-night mb-4">
            Spiritual Learning Modules
          </h2>
          <p className="text-xl text-indigo-night/70 max-w-3xl mx-auto">
            Deepen your understanding of dharmic relationships and spiritual partnership
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 bg-sandalwood/30 p-2 rounded-lg">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-saffron hover:bg-saffron/90 text-white"
                  : "bg-white hover:bg-sandalwood/50 text-indigo-night border-temple-gold/30"
                }
              >
                {category === 'all' ? 'All Modules' : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Learning Modules Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredModules.map((module) => (
            <Card key={module.id} className="border-temple-gold/30 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-crimson text-indigo-night">
                      {module.title}
                    </CardTitle>
                    <p className="text-sm text-temple-gold font-devanagari mt-1">
                      {module.sanskritTitle}
                    </p>
                  </div>
                  <Badge className={getDifficultyColor(module.difficulty)}>
                    {module.difficulty}
                  </Badge>
                </div>
                
                <p className="text-sm text-indigo-night/70 mt-2">
                  {module.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Bar (if started) */}
                {module.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-saffron font-semibold">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>
                )}

                {/* Module Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{module.lessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{module.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Award className="w-4 h-4" />
                    <span>★ {module.rating}</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="text-sm">
                  <span className="text-gray-500">Instructor: </span>
                  <span className="text-indigo-night font-semibold">{module.instructor}</span>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full flex items-center space-x-2 bg-saffron hover:bg-saffron/90 text-white"
                >
                  {module.progress > 0 ? (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Continue Learning</span>
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4" />
                      <span>Start Module</span>
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-saffron/10 to-temple-gold/10 border-saffron/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-crimson font-bold text-indigo-night mb-4">
                Become a Conscious Partner
              </h3>
              <p className="text-indigo-night/70 mb-6">
                Access our complete library of spiritual relationship courses and grow together with your dharmic partner
              </p>
              <Button className="bg-saffron hover:bg-saffron/90 text-white px-8 py-2">
                Unlock All Modules - ₹2,999/year
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
});

SpiritualLearningModules.displayName = 'SpiritualLearningModules';

export { SpiritualLearningModules };
