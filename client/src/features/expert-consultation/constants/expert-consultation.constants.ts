export const CONSULTATION_TIERS = [
  {
    id: 'samskara',
    name: '🪷 Samskara (Foundation)',
    subtitle: 'Basic dharmic guidance',
    price: 'Free',
    originalPrice: null,
    features: [
      'Basic matrimonial guidance rooted in values',
      '1 monthly consultation with certified counselors',
      'Response within 24-48 hours with mindful advice',
      'Access to dharmic wisdom library',
      'Sacred compatibility basics'
    ],
    responseTime: '24-48 hours',
    consultationsIncluded: '1 per month',
    bgGradient: 'from-orange-50 to-yellow-50',
    borderColor: 'border-orange-200',
    iconColor: 'text-orange-600',
    popular: false
  },
  {
    id: 'seva',
    name: '🕉️ Seva (Service)',
    subtitle: 'Premium spiritual guidance',
    price: '₹999',
    originalPrice: '₹1,999',
    features: [
      'Dedicated relationship guidance with spiritual wisdom',
      'Unlimited value-based consultations',
      'Priority response (4-6 hours) with personalized care',
      'Access to compatibility analysis based on life values',
      'Sacred text guidance for relationships',
      'Cultural harmony counseling'
    ],
    responseTime: '4-6 hours',
    consultationsIncluded: 'Unlimited',
    bgGradient: 'from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
    popular: true
  },
  {
    id: 'satsang',
    name: '🌟 Satsang (Sacred Community)',
    subtitle: 'VIP dharmic mentorship',
    price: '₹2,499',
    originalPrice: '₹4,999',
    features: [
      'Personal dharmic relationship mentor',
      'Real-time spiritual guidance and support',
      'Holistic profile enhancement with value alignment',
      'Sacred introduction services with family blessings',
      'Astrological compatibility analysis',
      'Direct family coordination support',
      'Vedic timing guidance for important steps'
    ],
    responseTime: 'Real-time',
    consultationsIncluded: 'Unlimited + Mentorship',
    bgGradient: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-600',
    popular: false
  }
];

export const EXPERT_CATEGORIES = [
  {
    id: 'dharmic-matchmaking',
    name: 'Dharmic Matchmaking Advisors',
    icon: '🌸',
    description: 'Value-based compatibility and life purpose alignment',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    iconColor: 'text-rose-600'
  },
  {
    id: 'sanskara-counselors',
    name: 'Sanskara Counselors',
    icon: '🏠',
    description: 'Cultural wisdom, family harmony, spiritual growth together',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    iconColor: 'text-amber-600'
  },
  {
    id: 'vedic-life-coaches',
    name: 'Vedic Life Coaches',
    icon: '💫',
    description: 'Astrological compatibility, auspicious timing guidance',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-600'
  },
  {
    id: 'sacred-communication',
    name: 'Sacred Communication Guides',
    icon: '🗣️',
    description: 'Respectful courtship, meaningful conversations',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-600'
  },
  {
    id: 'atman-connection',
    name: 'Atman Connection Experts',
    icon: '🎭',
    description: 'Soul compatibility, spiritual alignment guidance',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600'
  },
  {
    id: 'moksha-partnership',
    name: 'Moksha Partnership Guides',
    icon: '🌱',
    description: 'Spiritual evolution together, life purpose alignment',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    iconColor: 'text-emerald-600'
  }
];

export const SPIRITUAL_ASSESSMENT_QUESTIONS = {
  'dharmic-matchmaking': [
    {
      id: 'spiritual-qualities',
      question: 'What spiritual qualities do you seek in a life partner?',
      options: [
        'Daily meditation practice',
        'Regular scripture study',
        'Service-oriented mindset',
        'Deep devotion to dharma',
        'Compassionate nature',
        'Wisdom in difficult times'
      ]
    },
    {
      id: 'life-values',
      question: 'Which life values are most important to you?',
      options: [
        'Truthfulness (Satya)',
        'Non-violence (Ahimsa)',
        'Contentment (Santosha)',
        'Self-discipline (Tapas)',
        'Surrender to divine (Ishvara)',
        'Inner purity (Saucha)'
      ]
    }
  ],
  'sanskara-counselors': [
    {
      id: 'cultural-traditions',
      question: 'How important are cultural traditions in your future family?',
      options: [
        'Extremely important - complete adherence',
        'Very important - with modern adaptations',
        'Moderately important - selective practices',
        'Somewhat important - basic observances',
        'Open to learning and growing together'
      ]
    },
    {
      id: 'family-harmony',
      question: 'How do you envision maintaining family harmony?',
      options: [
        'Regular family prayers together',
        'Celebrating all festivals traditionally',
        'Weekly dharmic discussions',
        'Respecting elders\' wisdom',
        'Creating peaceful home environment',
        'Balancing individual and family needs'
      ]
    }
  ],
  'vedic-life-coaches': [
    {
      id: 'dharma-role',
      question: 'What role does dharma play in your ideal relationship?',
      options: [
        'Foundation of all decisions',
        'Guiding principle for life',
        'Source of strength in challenges',
        'Path to spiritual growth',
        'Framework for raising children',
        'Connection to divine purpose'
      ]
    }
  ],
  'sacred-communication': [
    {
      id: 'spiritual-growth',
      question: 'How do you envision growing spiritually together?',
      options: [
        'Daily prayers and meditation',
        'Regular temple visits',
        'Studying sacred texts together',
        'Serving community together',
        'Practicing yoga and mindfulness',
        'Seeking guidance from spiritual teachers'
      ]
    }
  ]
};

export const WHATSAPP_MESSAGES = {
  general: "🙏 Namaste! I seek guidance for finding my dharmic life partner on SattvikVivah. Please bless me with your wisdom.",
  authenticated: (name: string) => `🙏 Namaste! This is ${name} from SattvikVivah. I seek your divine guidance for my sacred matrimonial journey. Please help me with dharmic wisdom.`,
  urgent: "🆘 I need immediate spiritual guidance about my matrimonial journey. Can you help with dharmic advice?",
  cultural: "🎭 I have questions about balancing modern life with traditional values in marriage. Please guide me.",
  compatibility: "💫 I seek guidance about spiritual compatibility and astrological harmony with a potential partner.",
  family: "🏠 I need help navigating family expectations and maintaining harmony during the matrimonial process."
};

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
    unlockedFeatures: ['guru-status', 'divine-blessings']
  }
];

export interface ISacredMilestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  karmaPoints: number;
  unlockedFeatures: string[];
}

export const DAILY_DHARMIC_QUOTES = [
  {
    sanskrit: "यत्र नार्यस्तु पूज्यन्ते रमन्ते तत्र देवताः",
    translation: "Where women are honored, there the gods are pleased",
    context: "Marriage and respect"
  },
  {
    sanskrit: "धर्मे च अर्थे च कामे च मोक्षे च भरतर्षभ",
    translation: "In dharma, prosperity, desires, and liberation",
    context: "Four goals of life in marriage"
  },
  {
    sanskrit: "सह नाववतु सह नौ भुनक्तु",
    translation: "May we be protected together, may we be nourished together",
    context: "Unity in marriage"
  }
];