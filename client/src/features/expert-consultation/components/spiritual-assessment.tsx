
import { memo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { SPIRITUAL_ASSESSMENT_QUESTIONS } from '../constants/expert-consultation.constants';

interface SpiritualAssessmentProps {
  onAssessmentChange: (assessment: Record<string, string[]>) => void;
  className?: string;
}

export const SpiritualAssessment = memo<SpiritualAssessmentProps>(({
  onAssessmentChange,
  className = ''
}) => {
  const [assessment, setAssessment] = useState<Record<string, string[]>>({});

  const handleOptionChange = (questionId: string, option: string, checked: boolean) => {
    const newAssessment = { ...assessment };
    
    if (!newAssessment[questionId]) {
      newAssessment[questionId] = [];
    }

    if (checked) {
      newAssessment[questionId] = [...newAssessment[questionId], option];
    } else {
      newAssessment[questionId] = newAssessment[questionId].filter(o => o !== option);
    }

    setAssessment(newAssessment);
    onAssessmentChange(newAssessment);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-orange-800 mb-2">
          Sacred Self-Discovery
        </h3>
        <p className="text-sm text-gray-600 italic">
          "Help us understand your dharmic aspirations"
        </p>
      </div>

      {SPIRITUAL_ASSESSMENT_QUESTIONS.map((question) => (
        <Card key={question.id} className="bg-gradient-to-r from-orange-50/50 to-rose-50/50">
          <CardContent className="p-6">
            <Label className="text-base font-semibold text-gray-800 mb-4 block">
              {question.question}
            </Label>
            
            <div className="grid gap-3">
              {question.options.map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <Checkbox
                    id={`${question.id}-${option}`}
                    checked={(assessment[question.id] || []).includes(option)}
                    onCheckedChange={(checked) => 
                      handleOptionChange(question.id, option, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={`${question.id}-${option}`}
                    className="text-sm text-gray-700 cursor-pointer flex-1"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});

SpiritualAssessment.displayName = 'SpiritualAssessment';
