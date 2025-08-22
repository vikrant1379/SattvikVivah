
import { memo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { SPIRITUAL_ASSESSMENT_QUESTIONS } from '../constants/expert-consultation.constants';

interface SpiritualAssessmentProps {
  onAssessmentChange: (assessment: Record<string, string[]>) => void;
  className?: string;
}

export const SpiritualAssessment = memo<SpiritualAssessmentProps>(({
  onAssessmentChange,
  className = ''
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});

  const handleOptionSelect = (questionId: string, option: string) => {
    const currentAnswers = selectedAnswers[questionId] || [];
    const updatedAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter(a => a !== option)
      : [...currentAnswers, option];
    
    const newAssessment = {
      ...selectedAnswers,
      [questionId]: updatedAnswers
    };
    
    setSelectedAnswers(newAssessment);
    onAssessmentChange(newAssessment);
  };

  // Get questions for all categories to provide comprehensive assessment
  const allQuestions = Object.entries(SPIRITUAL_ASSESSMENT_QUESTIONS).flatMap(([category, questions]) => 
    questions.map(q => ({ ...q, category }))
  );

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-orange-800 mb-2 font-serif">
          🌺 Sacred Self-Discovery
        </h3>
        <p className="text-gray-600 italic mb-4">
          "Know thyself to find your divine complement"
        </p>
        <div className="text-sm font-bold text-orange-800 font-serif">
          आत्मानं विद्धि
        </div>
        <p className="text-xs text-gray-500 italic mb-6">
          "Know thy inner self"
        </p>
      </div>

      <div className="space-y-6">
        {allQuestions.map((question) => (
          <Card key={question.id} className="border-orange-200 bg-gradient-to-r from-orange-50/50 to-rose-50/50">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 font-serif">
                🪷 {question.question}
              </h4>
              
              <div className="grid gap-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswers[question.id]?.includes(option) || false;
                  
                  return (
                    <div
                      key={index}
                      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'border-orange-300 bg-orange-100/70 ring-2 ring-orange-200' 
                          : 'border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-50/50'
                      }`}
                      onClick={() => handleOptionSelect(question.id, option)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected 
                            ? 'border-orange-500 bg-orange-500' 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-gray-700 font-medium">{option}</span>
                      </div>
                      
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-orange-100 text-orange-700 border-orange-300 text-xs">
                            Selected
                          </Badge>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Progress Indicator */}
              <div className="mt-4 pt-4 border-t border-orange-200">
                <div className="text-xs text-gray-500 text-center">
                  {selectedAnswers[question.id]?.length || 0} preference
                  {(selectedAnswers[question.id]?.length || 0) !== 1 ? 's' : ''} selected
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sacred Wisdom */}
      <div className="text-center">
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-200">
          <CardContent className="p-6">
            <div className="text-lg font-bold text-orange-800 mb-2 font-serif">
              🙏 Divine Reflection Complete
            </div>
            <p className="text-sm text-gray-600 italic">
              "Your authentic desires have been revealed to guide the sacred consultation"
            </p>
            <div className="text-xs font-bold text-orange-700 font-serif mt-3">
              सत्यमेव जयते
            </div>
            <p className="text-xs text-gray-500 italic">
              "Truth alone triumphs"
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

SpiritualAssessment.displayName = 'SpiritualAssessment';
