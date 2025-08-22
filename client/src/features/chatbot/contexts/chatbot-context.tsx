import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react';
import { ChatbotState, ChatbotAction, Message, ChatFlow } from '../types/chatbot.types';
import { INITIAL_MESSAGES, RESPONSE_TEMPLATES } from '../constants/chatbot.constants';
import { chatbotService } from '../services/chatbot.service';

interface ChatbotContextType {
  state: ChatbotState;
  sendMessage: (content: string) => void;
  selectQuickReply: (reply: string) => void;
  resetChat: () => void;
  setCurrentFlow: (flow: ChatFlow) => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

const initialState: ChatbotState = {
  messages: INITIAL_MESSAGES,
  isTyping: false,
  currentFlow: 'welcome',
  userContext: {},
  sessionId: `session_${Date.now()}`,
};

function chatbotReducer(state: ChatbotState, action: ChatbotAction): ChatbotState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'SET_TYPING':
      return {
        ...state,
        isTyping: action.payload,
      };
    case 'SET_CURRENT_FLOW':
      return {
        ...state,
        currentFlow: action.payload,
      };
    case 'UPDATE_USER_CONTEXT':
      return {
        ...state,
        userContext: { ...state.userContext, ...action.payload },
      };
    case 'RESET_CHAT':
      return {
        ...initialState,
        sessionId: `session_${Date.now()}`,
      };
    default:
      return state;
  }
}

export const ChatbotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatbotReducer, initialState);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_TYPING', payload: true });

    try {
      // Get bot response
      const response = await chatbotService.processMessage(content, state.currentFlow, state.userContext);

      setTimeout(() => {
        const botMessage: Message = {
          id: `msg_${Date.now() + 1}`,
          content: response.message,
          sender: 'bot',
          timestamp: new Date(),
          actions: response.actions,
          quickReplies: response.quickReplies,
        };

        dispatch({ type: 'ADD_MESSAGE', payload: botMessage });
        dispatch({ type: 'SET_TYPING', payload: false });

        if (response.flow) {
          dispatch({ type: 'SET_CURRENT_FLOW', payload: response.flow });
        }

        if (response.context) {
          dispatch({ type: 'UPDATE_USER_CONTEXT', payload: response.context });
        }
      }, 1000 + Math.random() * 1000);

    } catch (error) {
      console.error('Error processing message:', error);

      setTimeout(() => {
        const errorMessage: Message = {
          id: `msg_${Date.now() + 1}`,
          content: "I apologize, but I'm having trouble understanding. Could you please try again?",
          sender: 'bot',
          timestamp: new Date(),
        };

        dispatch({ type: 'ADD_MESSAGE', payload: errorMessage });
        dispatch({ type: 'SET_TYPING', payload: false });
      }, 1000);
    }
  }, [state.currentFlow, state.userContext]);

  const selectQuickReply = useCallback((reply: string) => {
    sendMessage(reply);
  }, [sendMessage]);

  const resetChat = useCallback(() => {
    dispatch({ type: 'RESET_CHAT' });
  }, []);

  const setCurrentFlow = useCallback((flow: ChatFlow) => {
    dispatch({ type: 'SET_CURRENT_FLOW', payload: flow });
  }, []);

  // Initialize chatbot analytics - only run once
  useEffect(() => {
    const initializeAnalytics = async () => {
      try {
        await chatbotService.initializeSession(state.sessionId);
      } catch (error) {
        console.error('Failed to initialize chatbot analytics:', error);
      }
    };

    initializeAnalytics();
  }, [state.sessionId]); // Only depend on sessionId which changes only on reset

  const contextValue: ChatbotContextType = {
    state,
    sendMessage,
    selectQuickReply,
    resetChat,
    setCurrentFlow,
  };

  return (
    <ChatbotContext.Provider value={contextValue}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = (): ChatbotContextType => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};