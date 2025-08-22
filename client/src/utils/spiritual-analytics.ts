
export interface SpiritualMetrics {
  spiritualCompatibilityScore: number;
  dharamicAlignmentLevel: string;
  expertGuidedMatches: number;
  satsangParticipation: number;
  spiritualPracticeConsistency: number;
}

export const calculateSpiritualROI = (metrics: SpiritualMetrics): number => {
  const weights = {
    compatibility: 0.3,
    dharmic: 0.25,
    expertGuided: 0.2,
    community: 0.15,
    consistency: 0.1
  };

  const normalizedScores = {
    compatibility: metrics.spiritualCompatibilityScore / 100,
    dharmic: getDharmicScore(metrics.dharamicAlignmentLevel),
    expertGuided: Math.min(metrics.expertGuidedMatches / 10, 1),
    community: Math.min(metrics.satsangParticipation / 20, 1),
    consistency: metrics.spiritualPracticeConsistency / 100
  };

  return Object.entries(weights).reduce((total, [key, weight]) => {
    return total + (normalizedScores[key as keyof typeof normalizedScores] * weight);
  }, 0) * 100;
};

const getDharmicScore = (level: string): number => {
  const levelMap: { [key: string]: number } = {
    'EXPLORER': 0.25,
    'BEGINNER': 0.5,
    'REGULAR_PRACTITIONER': 0.75,
    'ADVANCED_PRACTITIONER': 1.0
  };
  return levelMap[level] || 0;
};

export const getSpiritualInsights = (metrics: SpiritualMetrics): string[] => {
  const insights: string[] = [];

  if (metrics.spiritualCompatibilityScore > 80) {
    insights.push("High spiritual compatibility indicates deep dharmic connection");
  }

  if (metrics.expertGuidedMatches > 5) {
    insights.push("Expert guidance significantly improves match success rate");
  }

  if (metrics.satsangParticipation > 10) {
    insights.push("Active community participation enhances spiritual growth");
  }

  if (metrics.spiritualPracticeConsistency > 75) {
    insights.push("Consistent spiritual practice builds strong relationship foundation");
  }

  return insights;
};

export const trackSacredJourney = (eventType: string, eventData: any): void => {
  // Analytics tracking with spiritual context
  const spiritualEvent = {
    type: eventType,
    timestamp: new Date().toISOString(),
    data: {
      ...eventData,
      spiritualContext: true,
      dharamicValues: true
    }
  };

  // Integration with your existing analytics
  console.log('Sacred Journey Event:', spiritualEvent);
};
