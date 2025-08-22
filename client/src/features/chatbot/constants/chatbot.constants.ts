
export const CHATBOT_CONFIG = {
  POSITION: {
    bottom: '20px',
    right: '20px',
    floatSize: '60px',
    chatWidth: '380px',
    chatHeight: '600px',
    mobileWidth: '90vw',
    mobileHeight: '80vh'
  },
  ANIMATIONS: {
    breathingDuration: '3s',
    pulseInterval: 2000,
    messageDelay: 1500
  },
  TRIGGERS: {
    pageTimeThreshold: 120000, // 2 minutes
    profileViewThreshold: 5,
    idleTimeout: 300000, // 5 minutes
    searchActivityThreshold: 3
  }
};

export const BOT_PERSONALITY = {
  name: 'Dharma',
  title: 'Sattvic Guide',
  emoji: '🪷',
  greeting: '🙏',
  tone: 'warm, respectful, spiritually aware',
  language: 'English with Sanskrit/Hindi terms'
};

export const RESPONSE_TEMPLATES = {
  greeting: {
    newUser: "🙏 Namaste and welcome to Sattvic Matrimony! I'm Dharma, your spiritual guide in finding your soulmate. ✨",
    returningUser: (name: string) => `🙏 Pranam ${name}! Your dharmic journey continues. How may I guide you today? 🌸`,
    guest: "🕉️ Greetings, dear soul! I'm here to help you navigate your sacred journey to finding true love."
  },
  
  profileHelp: {
    notLoggedIn: "To provide personalized profile guidance, I'd love to know your story. Shall we create your sacred profile? 🌺",
    incomplete: "Your profile is your spiritual introduction! Let me help you enhance it with dharmic wisdom. 🪷",
    complete: "Your profile radiates authenticity! Here are some advanced tips to attract your perfect match..."
  },
  
  matchingAdvice: {
    general: "True compatibility comes from aligned values and spiritual harmony. Let me share some sacred wisdom... 💝",
    specific: "Based on your preferences, here's how to recognize your dharmic companion... ✨",
    compatibility: "Spiritual compatibility is deeper than surface attractions. Consider these dharmic principles..."
  },

  loginEncouragement: {
    soft: "For personalized guidance based on your spiritual values, creating a profile helps immensely! 🌸",
    benefits: "Registered souls receive: ✨ Spiritual matching algorithm, 💝 Personalized guidance, 🌟 Expert consultations",
    gentle: "I understand you may want to explore first! Let me share general wisdom while you decide... 🕉️"
  },

  quickReplies: {
    welcome: [
      "Help me create my profile 🌸",
      "How do I find compatible matches? 💝",
      "I need expert guidance 🙏",
      "Tell me about your features ✨"
    ],
    profileHelp: [
      "Improve my bio 📝",
      "Photo selection tips 📸",
      "Preference optimization ⚙️",
      "Spiritual practices section 🕉️"
    ],
    matching: [
      "First message tips 💌",
      "Reading compatibility signs 🔮",
      "Family approval strategies 👨‍👩‍👧‍👦",
      "Cultural considerations 🎭"
    ]
  }
};

export const INTENT_PATTERNS = {
  profile: ['profile', 'bio', 'photo', 'picture', 'about', 'description'],
  matching: ['match', 'compatible', 'partner', 'soulmate', 'relationship'],
  communication: ['message', 'chat', 'talk', 'contact', 'approach'],
  spiritual: ['spiritual', 'dharmic', 'vedic', 'astrology', 'horoscope'],
  technical: ['help', 'support', 'problem', 'issue', 'bug', 'error'],
  expert: ['expert', 'consultation', 'guidance', 'advice', 'guru']
};

export const CONTEXTUAL_TRIGGERS = {
  newVisitor: {
    delay: 120000, // 2 minutes
    message: "🪷 Namaste! Finding the right information? I'm here if you need guidance!"
  },
  profileBrowsing: {
    threshold: 5,
    message: "I see you're exploring potential matches! Want tips on meaningful first contact? ✨"
  },
  searchActivity: {
    threshold: 3,
    message: "Your search shows dedication! Let me help refine your preferences for better matches 🌸"
  },
  idle: {
    timeout: 300000, // 5 minutes
    message: "Take your time in this sacred journey. I'll be here when you need dharmic guidance! 🕉️"
  }
};
