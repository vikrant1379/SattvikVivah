
import React from 'react';
import { ChatMessage as ChatMessageType } from '../types/chatbot.types';
import { ChatActions } from './chat-actions';
import { BOT_PERSONALITY } from '../constants/chatbot.constants';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-slideIn`}>
      <div className={`flex items-start space-x-2 max-w-[80%] ${!isBot && 'flex-row-reverse space-x-reverse'}`}>
        {/* Avatar */}
        {isBot && (
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm">{BOT_PERSONALITY.emoji}</span>
          </div>
        )}
        
        {/* Message Bubble */}
        <div
          className={`
            px-4 py-3 rounded-2xl shadow-sm
            ${isBot 
              ? 'bg-gradient-to-br from-orange-50 to-yellow-50 text-gray-800 border border-orange-100' 
              : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
            }
            ${isBot ? 'rounded-tl-sm' : 'rounded-tr-sm'}
          `}
        >
          {/* Message Content */}
          <div 
            className={`text-sm leading-relaxed ${isBot ? 'text-gray-800' : 'text-white'}`}
            style={{ 
              fontFamily: isBot ? 'Inter, sans-serif' : 'inherit',
              lineHeight: '1.5'
            }}
          >
            {message.content}
          </div>
          
          {/* Actions */}
          {message.metadata?.actions && message.metadata.actions.length > 0 && (
            <div className="mt-3">
              <ChatActions actions={message.metadata.actions} />
            </div>
          )}
        </div>
        
        {/* User Avatar */}
        {!isBot && (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm text-white">👤</span>
          </div>
        )}
      </div>
    </div>
  );
};
