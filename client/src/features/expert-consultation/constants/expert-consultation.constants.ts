
import type { IConsultationTier, IExpertCategory, ISacredMilestone } from '../types/expert-consultation.types';

export const CONSULTATION_TIERS: IConsultationTier[] = [
  {
    id: 'samskara',
    name: 'Samskara (Foundation)',
    icon: '🪷',
    description: 'Basic matrimonial guidance rooted in values',
    features: [
      '1 monthly consultation with certified counselors',
      'Response within 24-48 hours with mindful advice',
      'Basic compatibility insights',
      'Dharmic relationship principles'
    ],
    responseTime: '24-48 hours',
    price: 0
  },
  {
    id: 'seva',
    name: 'Seva (Service)',
    icon: '🕉️',
    description: 'Dedicated relationship guidance with spiritual wisdom',
    features: [
      'Unlimited value-based consultations',
      'Priority response (4-6 hours)',
      'Personalized compatibility analysis',
      'Sacred communication templates',
      'Family harmony guidance'
    ],
    responseTime: '4-6 hours',
    price: 999,
    isPopular: true
  },
  {
    id: 'satsang',
    name: 'Satsang (Sacred Community)',
    icon: '🌟',
    description: 'Personal dharmic relationship mentor',
    features: [
      'Personal dharmic relationship mentor',
      'Real-time spiritual guidance',
      'Holistic profile enhancement',
      'Sacred introduction services',
      'Family blessing coordination',
      'Astrological compatibility deep-dive'
    ],
    responseTime: 'Real-time',
    price: 2999
  }
];

export const EXPERT_CATEGORIES: IExpertCategory[] = [
  {
    id: 'atman-connection',
    name: 'Atman Connection',
    icon: '🌸',
    description: 'Soul compatibility, spiritual alignment',
    color: 'text-rose-600'
  },
  {
    id: 'grihastha-dharma',
    name: 'Grihastha Dharma',
    icon: '🏠',
    description: 'Householder life preparation, family responsibilities',
    color: 'text-orange-600'
  },
  {
    id: 'karma-yoga-love',
    name: 'Karma Yoga in Love',
    icon: '💫',
    description: 'Selfless love, mutual growth, seva together',
    color: 'text-purple-600'
  },
  {
    id: 'sanskar-harmony',
    name: 'Sanskar Harmony',
    icon: '🎭',
    description: 'Cultural traditions, ceremonial guidance',
    color: 'text-blue-600'
  },
  {
    id: 'satya-communication',
    name: 'Satya in Communication',
    icon: '🗣️',
    description: 'Truthful, respectful relationship building',
    color: 'text-green-600'
  },
  {
    id: 'moksha-partnership',
    name: 'Moksha Partnership',
    icon: '🌱',
    description: 'Spiritual evolution together, life purpose alignment',
    color: 'text-emerald-600'
  }
];

export const SACRED_MILESTONES: ISacredMilestone[] = [
  {
    id: 'seeker',
    title: 'Seeker',
    description: 'Just beginning the sacred search',
    icon: '🌱',
    karmaPoints: 0,
    unlockedFeatures: ['basic-guidance']
  },
  {
    id: 'bloomer',
    title: 'Bloomer',
    description: 'Actively engaging with dharmic principles',
    icon: '🌸',
    karmaPoints: 100,
    unlockedFeatures: ['priority-support', 'cultural-guidance']
  },
  {
    id: 'wisdom-keeper',
    title: 'Wisdom Keeper',
    description: 'Successfully implementing spiritual guidance',
    icon: '🌺',
    karmaPoints: 500,
    unlockedFeatures: ['expert-matching', 'family-coordination']
  },
  {
    id: 'soul-guide',
    title: 'Soul Guide',
    description: 'Inspiring others on their sacred journey',
    icon: '🌟',
    karmaPoints: 1000,
    unlockedFeatures: ['mentorship', 'community-leadership']
  },
  {
    id: 'dharma-master',
    title: 'Dharma Master',
    description: 'Achieved sacred union with divine blessings',
    icon: '🕉️',
    karmaPoints: 2500,
    unlockedFeatures: ['lifetime-support', 'blessing-ceremonies']
  }
];

export const SPIRITUAL_ASSESSMENT_QUESTIONS = [
  {
    id: 'spiritual-qualities',
    question: 'What spiritual qualities do you seek in a life partner?',
    options: [
      'Devotion and faith',
      'Meditation practice',
      'Ethical living',
      'Service to others',
      'Scriptural knowledge'
    ]
  },
  {
    id: 'cultural-importance',
    question: 'How important are cultural traditions in your future family?',
    options: [
      'Extremely important',
      'Very important',
      'Moderately important',
      'Somewhat important',
      'Not very important'
    ]
  },
  {
    id: 'dharma-role',
    question: 'What role does dharma play in your ideal relationship?',
    options: [
      'Central to everything',
      'Guiding principle',
      'Important consideration',
      'One of many factors',
      'Personal choice'
    ]
  },
  {
    id: 'spiritual-growth',
    question: 'How do you envision growing spiritually together?',
    options: [
      'Daily prayers together',
      'Studying scriptures',
      'Meditation practice',
      'Temple visits',
      'Service activities'
    ]
  }
];

export const WHATSAPP_MESSAGES = {
  general: "🙏 Namaste! I seek guidance for finding my dharmic life partner on Sattvik Matrimonial. Please bless me with your wisdom.",
  urgent: "🆘 I need immediate spiritual guidance about my matrimonial journey. Can you help with dharmic advice?",
  cultural: "🎭 I have questions about balancing modern life with traditional values in marriage. Please guide me.",
  authenticated: (name: string) => `🙏 Namaste! I'm ${name}, a registered member of Sattvik Matrimonial. I seek divine guidance for my sacred journey to find a dharmic life partner. Please bless me with your wisdom.`
};
