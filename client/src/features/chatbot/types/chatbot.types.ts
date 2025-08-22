
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'quick-reply' | 'action';
  metadata?: {
    intent?: string;
    confidence?: number;
    actions?: ChatAction[];
  };
}

export interface ChatAction {
  type: 'login' | 'register' | 'view-profile' | 'expert-consultation' | 'whatsapp';
  label: string;
  payload?: Record<string, any>;
}

export interface ChatbotState {
  isOpen: boolean;
  isLoading: boolean;
  messages: ChatMessage[];
  unreadCount: number;
  currentFlow: ConversationFlow;
  userContext: UserContext;
}

export interface UserContext {
  isAuthenticated: boolean;
  hasProfile: boolean;
  profileCompleteness: number;
  lastActivity: string;
  sessionDuration: number;
  viewedProfiles: number;
  receivedInterests: number;
}

export interface ConversationFlow {
  currentStep: string;
  flowType: 'welcome' | 'profile-help' | 'matching-guidance' | 'technical-support' | 'spiritual-guidance';
  stepData: Record<string, any>;
}

export interface BotResponse {
  message: string;
  quickReplies?: string[];
  actions?: ChatAction[];
  followUp?: string;
}

export interface IntentMatch {
  intent: string;
  confidence: number;
  entities: Record<string, string>;
}
