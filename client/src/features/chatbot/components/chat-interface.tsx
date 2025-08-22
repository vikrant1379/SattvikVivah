
import React, { useEffect, useRef, useState } from 'react';
import { useChatbot } from '../contexts/chatbot-context';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { ChatHeader } from './chat-header';
import { QuickReplies } from './quick-replies';
import { CHATBOT_CONFIG } from '../constants/chatbot.constants';
import { useMobile } from '@/hooks/use-mobile';

export const ChatInterface: React.FC = () => {
  const { state, closeChatbot, markAsRead } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const [isVisible, setIsVisible] = useState(false);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  // Mark messages as read when interface is open
  useEffect(() => {
    if (state.unreadCount > 0) {
      markAsRead();
    }
  }, [state.unreadCount, markAsRead]);

  const chatDimensions = isMobile 
    ? {
        width: CHATBOT_CONFIG.POSITION.mobileWidth,
        height: CHATBOT_CONFIG.POSITION.mobileHeight,
        bottom: '0',
        right: '0',
        left: '0',
        margin: 'auto'
      }
    : {
        width: CHATBOT_CONFIG.POSITION.chatWidth,
        height: CHATBOT_CONFIG.POSITION.chatHeight,
        bottom: '90px',
        right: CHATBOT_CONFIG.POSITION.right
      };

  return (
    <div
      className={`
        fixed z-40 bg-white rounded-lg shadow-2xl
        flex flex-col overflow-hidden
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        ${isMobile ? 'mx-auto' : ''}
      `}
      style={{
        ...chatDimensions,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 153, 51, 0.1)',
        border: '1px solid rgba(255, 153, 51, 0.2)',
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(255, 153, 51, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.8) 0%, transparent 50%)
        `
      }}
    >
      {/* Lotus Pattern Watermark */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF9933' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20zm0 0c0 11.046-8.954 20-20 20S-10 41.046-10 30s8.954-20 20-20 20 8.954 20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }}
      />

      {/* Header */}
      <ChatHeader onClose={closeChatbot} />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-orange-200">
        {state.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500 space-y-2">
              <div className="text-4xl animate-bounce">🪷</div>
              <p className="text-sm font-medium">Ready to begin your dharmic journey?</p>
            </div>
          </div>
        ) : (
          <>
            {state.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {/* Loading Indicator */}
            {state.isLoading && (
              <div className="flex items-center space-x-2 text-orange-600">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                <span className="text-sm font-medium">Dharma is thinking...</span>
              </div>
            )}
            
            {/* Quick Replies for last bot message */}
            {state.messages.length > 0 && 
             state.messages[state.messages.length - 1]?.sender === 'bot' &&
             !state.isLoading && (
              <QuickReplies />
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput />

      {/* Sanskrit Blessing Footer */}
      <div className="px-4 py-2 bg-gradient-to-r from-orange-50 to-yellow-50 border-t border-orange-100">
        <div className="text-center">
          <div className="text-xs font-bold text-orange-800 mb-1" style={{ fontFamily: 'serif' }}>
            सर्वे भवन्तु सुखिनः
          </div>
          <p className="text-xs text-orange-600">May all beings find happiness in sacred union</p>
        </div>
      </div>
    </div>
  );
};
