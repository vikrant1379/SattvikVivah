
import React from 'react';
import { useChatbot } from '../contexts/chatbot-context';
import { BOT_PERSONALITY, CHATBOT_CONFIG } from '../constants/chatbot.constants';
import { useMobile } from '@/hooks/use-mobile';

export const ChatbotFloat: React.FC = () => {
  const { state, toggleChatbot } = useChatbot();
  const isMobile = useMobile();

  return (
    <div
      className={`
        fixed z-50 cursor-pointer transition-all duration-300 ease-in-out
        hover:scale-105 active:scale-95
        ${isMobile ? 'bottom-4 right-4' : 'bottom-5 right-5'}
      `}
      style={{
        width: isMobile ? '55px' : CHATBOT_CONFIG.POSITION.floatSize,
        height: isMobile ? '55px' : CHATBOT_CONFIG.POSITION.floatSize
      }}
      onClick={toggleChatbot}
      role="button"
      aria-label="Open Sattvic Matrimony Assistant"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          toggleChatbot();
        }
      }}
    >
      <div
        className="
          relative w-full h-full rounded-full flex items-center justify-center
          bg-gradient-to-br from-orange-400 to-yellow-500
          shadow-lg hover:shadow-xl
          ring-4 ring-white
        "
        style={{
          background: 'linear-gradient(135deg, #FF9933, #FFD700)',
          boxShadow: '0 4px 20px rgba(255, 153, 51, 0.3), 0 0 0 3px rgba(255, 255, 255, 0.8)',
          animation: `breathe ${CHATBOT_CONFIG.ANIMATIONS.breathingDuration} ease-in-out infinite`
        }}
      >
        {/* Lotus Icon */}
        <span 
          className="text-2xl animate-pulse"
          style={{ 
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
            fontSize: isMobile ? '24px' : '30px'
          }}
        >
          {BOT_PERSONALITY.emoji}
        </span>

        {/* Notification Badge */}
        {state.unreadCount > 0 && (
          <div
            className="
              absolute -top-1 -right-1 
              w-6 h-6 bg-red-500 text-white 
              rounded-full flex items-center justify-center
              text-xs font-bold
              animate-pulse
              shadow-lg
            "
            style={{
              fontSize: '11px',
              minWidth: '24px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          >
            {state.unreadCount > 9 ? '9+' : state.unreadCount}
          </div>
        )}

        {/* Ripple Effect */}
        <div
          className="
            absolute inset-0 rounded-full
            bg-gradient-to-br from-orange-400 to-yellow-500
            opacity-0 animate-ping
          "
          style={{
            animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}
        />
      </div>

      {/* Floating Tooltip */}
      <div
        className="
          absolute bottom-full right-0 mb-2
          bg-gray-900 text-white text-xs
          px-3 py-1 rounded-lg
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          whitespace-nowrap
          pointer-events-none
        "
        style={{ 
          fontSize: '11px',
          transform: 'translateX(50%)'
        }}
      >
        🙏 Need dharmic guidance?
        <div
          className="absolute top-full right-1/2 w-0 h-0"
          style={{
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop: '4px solid #1F2937',
            transform: 'translateX(50%)'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(1.1);
            opacity: 0;
          }
        }

        .group:hover .group-hover\\:opacity-100 {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};
