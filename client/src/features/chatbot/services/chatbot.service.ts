
import { BotResponse, UserContext, ConversationFlow, IntentMatch } from '../types/chatbot.types';
import { RESPONSE_TEMPLATES, INTENT_PATTERNS, BOT_PERSONALITY, CONTEXTUAL_TRIGGERS } from '../constants/chatbot.constants';

class ChatbotService {
  private intentClassifier = new IntentClassifier();
  private responseGenerator = new ResponseGenerator();

  async processMessage(message: string, userContext: UserContext, currentFlow: ConversationFlow): Promise<BotResponse> {
    const intent = this.intentClassifier.classify(message);
    
    // Handle different conversation flows
    switch (currentFlow.flowType) {
      case 'welcome':
        return this.handleWelcomeFlow(message, intent, userContext);
      case 'profile-help':
        return this.handleProfileHelpFlow(message, intent, userContext);
      case 'matching-guidance':
        return this.handleMatchingFlow(message, intent, userContext);
      case 'spiritual-guidance':
        return this.handleSpiritualFlow(message, intent, userContext);
      default:
        return this.handleGeneralQuery(message, intent, userContext);
    }
  }

  getWelcomeMessage(userContext: UserContext): BotResponse {
    if (userContext.isAuthenticated) {
      return {
        message: RESPONSE_TEMPLATES.greeting.returningUser("dear soul"),
        quickReplies: RESPONSE_TEMPLATES.quickReplies.welcome,
        actions: [
          { type: 'view-profile', label: 'View My Profile', payload: {} },
          { type: 'expert-consultation', label: 'Speak to Expert 🙏', payload: {} }
        ]
      };
    }
    
    return {
      message: RESPONSE_TEMPLATES.greeting.newUser,
      quickReplies: RESPONSE_TEMPLATES.quickReplies.welcome,
      actions: [
        { type: 'register', label: 'Create Sacred Profile 🌸', payload: {} },
        { type: 'login', label: 'Continue as Guest', payload: {} }
      ]
    };
  }

  getProactiveMessage(trigger: string, userContext: UserContext): BotResponse | null {
    const contextualTrigger = CONTEXTUAL_TRIGGERS[trigger as keyof typeof CONTEXTUAL_TRIGGERS];
    if (!contextualTrigger) return null;

    return {
      message: contextualTrigger.message,
      quickReplies: this.getContextualQuickReplies(trigger)
    };
  }

  private handleWelcomeFlow(message: string, intent: IntentMatch, userContext: UserContext): BotResponse {
    if (intent.intent === 'profile' || message.toLowerCase().includes('profile')) {
      if (!userContext.isAuthenticated) {
        return {
          message: RESPONSE_TEMPLATES.profileHelp.notLoggedIn,
          actions: [
            { type: 'register', label: 'Create Profile Now 🌸', payload: {} },
            { type: 'login', label: 'Login to Existing Account', payload: {} }
          ],
          followUp: RESPONSE_TEMPLATES.loginEncouragement.benefits
        };
      }
      
      return this.responseGenerator.generateProfileAdvice(userContext);
    }

    if (intent.intent === 'matching') {
      return this.responseGenerator.generateMatchingAdvice(userContext);
    }

    if (intent.intent === 'expert') {
      return {
        message: "🙏 Our dharmic relationship experts provide personalized guidance for your sacred journey.",
        actions: [
          { type: 'expert-consultation', label: 'Book Expert Consultation', payload: {} },
          { type: 'whatsapp', label: 'WhatsApp Guidance', payload: {} }
        ]
      };
    }

    return this.responseGenerator.generateGeneralResponse(message, intent, userContext);
  }

  private handleProfileHelpFlow(message: string, intent: IntentMatch, userContext: UserContext): BotResponse {
    if (!userContext.isAuthenticated) {
      return {
        message: "To provide specific profile guidance, I need to see your current profile. Creating one takes just 2 minutes! 🌺",
        actions: [{ type: 'register', label: 'Create Profile', payload: {} }]
      };
    }

    return this.responseGenerator.generateDetailedProfileAdvice(message, userContext);
  }

  private handleMatchingFlow(message: string, intent: IntentMatch, userContext: UserContext): BotResponse {
    return this.responseGenerator.generateMatchingGuidance(message, intent, userContext);
  }

  private handleSpiritualFlow(message: string, intent: IntentMatch, userContext: UserContext): BotResponse {
    return this.responseGenerator.generateSpiritualGuidance(message, intent, userContext);
  }

  private handleGeneralQuery(message: string, intent: IntentMatch, userContext: UserContext): BotResponse {
    return this.responseGenerator.generateGeneralResponse(message, intent, userContext);
  }

  private getContextualQuickReplies(trigger: string): string[] {
    switch (trigger) {
      case 'newVisitor':
        return ["Tell me about Sattvic Matrimony", "How does matching work?", "Create my profile"];
      case 'profileBrowsing':
        return ["How to send first message?", "Understanding compatibility", "Profile tips"];
      case 'searchActivity':
        return ["Refine my preferences", "Expand search criteria", "Expert guidance"];
      default:
        return RESPONSE_TEMPLATES.quickReplies.welcome;
    }
  }
}

class IntentClassifier {
  classify(message: string): IntentMatch {
    const normalizedMessage = message.toLowerCase();
    let bestMatch = { intent: 'general', confidence: 0, entities: {} };

    for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
      const matches = patterns.filter(pattern => 
        normalizedMessage.includes(pattern.toLowerCase())
      );
      
      const confidence = matches.length / patterns.length;
      if (confidence > bestMatch.confidence) {
        bestMatch = { intent, confidence, entities: {} };
      }
    }

    return bestMatch;
  }
}

class ResponseGenerator {
  generateProfileAdvice(userContext: UserContext): BotResponse {
    if (userContext.profileCompleteness < 50) {
      return {
        message: "Your profile needs some dharmic enhancement! 🌸 A complete profile attracts 5x more compatible matches.",
        quickReplies: RESPONSE_TEMPLATES.quickReplies.profileHelp,
        actions: [{ type: 'view-profile', label: 'Complete My Profile', payload: {} }]
      };
    }

    return {
      message: "Your profile shows good spiritual foundation! Here are advanced tips to attract your perfect match... ✨",
      quickReplies: ["Photo optimization tips", "Bio enhancement", "Spiritual practices section"]
    };
  }

  generateMatchingAdvice(userContext: UserContext): BotResponse {
    if (!userContext.isAuthenticated) {
      return {
        message: RESPONSE_TEMPLATES.matchingAdvice.general + "\n\n" + RESPONSE_TEMPLATES.loginEncouragement.gentle,
        actions: [{ type: 'register', label: 'Get Personalized Guidance', payload: {} }]
      };
    }

    return {
      message: "Based on your spiritual preferences, here's how to recognize your dharmic companion... 💝",
      quickReplies: RESPONSE_TEMPLATES.quickReplies.matching
    };
  }

  generateDetailedProfileAdvice(message: string, userContext: UserContext): BotResponse {
    const advice = this.getSpecificProfileAdvice(message);
    return {
      message: advice,
      quickReplies: ["More bio tips", "Photo guidance", "Spiritual section help", "View my profile"]
    };
  }

  generateMatchingGuidance(message: string, intent: IntentMatch, userContext: UserContext): BotResponse {
    return {
      message: "True dharmic compatibility comes from shared values and spiritual alignment. Let me share some sacred wisdom... 🕉️",
      quickReplies: ["First message tips", "Reading signs", "Family considerations"]
    };
  }

  generateSpiritualGuidance(message: string, intent: IntentMatch, userContext: UserContext): BotResponse {
    return {
      message: "In the sacred tradition of dharmic unions, spiritual harmony is the foundation of lasting love... 🪷",
      quickReplies: ["Astrological compatibility", "Spiritual practices", "Vedic principles"]
    };
  }

  generateGeneralResponse(message: string, intent: IntentMatch, userContext: UserContext): BotResponse {
    const responses = [
      "🙏 I understand your concern. Let me share some dharmic wisdom to guide you...",
      "🌸 That's a beautiful question! In the path of finding your soulmate...",
      "✨ Every journey to finding true love has its sacred moments. Here's my guidance..."
    ];

    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      quickReplies: ["Profile help", "Matching guidance", "Expert consultation", "More questions"]
    };
  }

  private getSpecificProfileAdvice(message: string): string {
    if (message.toLowerCase().includes('bio')) {
      return "A dharmic bio should reflect your authentic soul... 📝 Share your spiritual journey, family values, and vision of partnership.";
    }
    if (message.toLowerCase().includes('photo')) {
      return "Sacred photos show your genuine self... 📸 Choose images that reflect your spiritual nature and cultural values.";
    }
    return "Let me provide comprehensive profile guidance based on dharmic principles... 🌸";
  }
}

export const chatbotService = new ChatbotService();
