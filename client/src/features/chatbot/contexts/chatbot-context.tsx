
import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { ChatbotState, ChatMessage, UserContext, ConversationFlow, BotResponse } from '../types/chatbot.types';
import { chatbotService } from '../services/chatbot.service';
import { useAuth } from '@/hooks/use-auth';

interface ChatbotContextType {
  state: ChatbotState;
  sendMessage: (message: string) => Promise<void>;
  toggleChatbot: () => void;
  closeChatbot: () => void;
  clearMessages: () => void;
  triggerProactiveMessage: (trigger: string) => void;
  markAsRead: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | null>(null);

type ChatbotAction = 
  | { type: 'TOGGLE_CHATBOT' }
  | { type: 'CLOSE_CHATBOT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'ADD_BOT_RESPONSE'; payload: BotResponse }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'UPDATE_USER_CONTEXT'; payload: Partial<UserContext> }
  | { type: 'SET_FLOW'; payload: ConversationFlow }
  | { type: 'MARK_AS_READ' }
  | { type: 'INCREMENT_UNREAD' };

const initialState: ChatbotState = {
  isOpen: false,
  isLoading: false,
  messages: [],
  unreadCount: 0,
  currentFlow: {
    currentStep: 'welcome',
    flowType: 'welcome',
    stepData: {}
  },
  userContext: {
    isAuthenticated: false,
    hasProfile: false,
    profileCompleteness: 0,
    lastActivity: '',
    sessionDuration: 0,
    viewedProfiles: 0,
    receivedInterests: 0
  }
};

function chatbotReducer(state: ChatbotState, action: ChatbotAction): ChatbotState {
  switch (action.type) {
    case 'TOGGLE_CHATBOT':
      return { 
        ...state, 
        isOpen: !state.isOpen,
        unreadCount: state.isOpen ? state.unreadCount : 0
      };
    
    case 'CLOSE_CHATBOT':
      return { ...state, isOpen: false };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        unreadCount: !state.isOpen && action.payload.sender === 'bot' 
          ? state.unreadCount + 1 
          : state.unreadCount
      };
    
    case 'ADD_BOT_RESPONSE':
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        content: action.payload.message,
        sender: 'bot',
        timestamp: new Date(),
        type: action.payload.actions ? 'action' : 'text',
        metadata: {
          actions: action.payload.actions
        }
      };
      return {
        ...state,
        messages: [...state.messages, botMessage],
        isLoading: false,
        unreadCount: !state.isOpen ? state.unreadCount + 1 : state.unreadCount
      };
    
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };
    
    case 'UPDATE_USER_CONTEXT':
      return {
        ...state,
        userContext: { ...state.userContext, ...action.payload }
      };
    
    case 'SET_FLOW':
      return { ...state, currentFlow: action.payload };
    
    case 'MARK_AS_READ':
      return { ...state, unreadCount: 0 };
    
    case 'INCREMENT_UNREAD':
      return { ...state, unreadCount: state.unreadCount + 1 };
    
    default:
      return state;
  }
}

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatbotReducer, initialState);
  const { isAuthenticated, user } = useAuth();

  // Update user context when auth changes
  useEffect(() => {
    dispatch({
      type: 'UPDATE_USER_CONTEXT',
      payload: {
        isAuthenticated,
        hasProfile: !!user,
        // Add more user context updates based on your user data
      }
    });
  }, [isAuthenticated, user]);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const botResponse = await chatbotService.processMessage(content, state.userContext, state.currentFlow);
      
      setTimeout(() => {
        dispatch({ type: 'ADD_BOT_RESPONSE', payload: botResponse });
      }, 1500); // Simulate thinking time
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      const errorResponse: BotResponse = {
        message: "🙏 My apologies, I'm experiencing some difficulty. Please try again or contact our support team."
      };
      dispatch({ type: 'ADD_BOT_RESPONSE', payload: errorResponse });
    }
  }, [state.userContext, state.currentFlow]);

  const toggleChatbot = useCallback(() => {
    dispatch({ type: 'TOGGLE_CHATBOT' });
    
    // Send welcome message if opening for first time
    if (!state.isOpen && state.messages.length === 0) {
      setTimeout(() => {
        const welcomeResponse = chatbotService.getWelcomeMessage(state.userContext);
        dispatch({ type: 'ADD_BOT_RESPONSE', payload: welcomeResponse });
      }, 500);
    }
  }, [state.isOpen, state.messages.length, state.userContext]);

  const closeChatbot = useCallback(() => {
    dispatch({ type: 'CLOSE_CHATBOT' });
  }, []);

  const clearMessages = useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  }, []);

  const triggerProactiveMessage = useCallback((trigger: string) => {
    const proactiveResponse = chatbotService.getProactiveMessage(trigger, state.userContext);
    if (proactiveResponse) {
      dispatch({ type: 'ADD_BOT_RESPONSE', payload: proactiveResponse });
    }
  }, [state.userContext]);

  const markAsRead = useCallback(() => {
    dispatch({ type: 'MARK_AS_READ' });
  }, []);

  return (
    <ChatbotContext.Provider value={{
      state,
      sendMessage,
      toggleChatbot,
      closeChatbot,
      clearMessages,
      triggerProactiveMessage,
      markAsRead
    }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within ChatbotProvider');
  }
  return context;
};
