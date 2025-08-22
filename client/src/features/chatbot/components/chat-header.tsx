
import React from 'react';
import { X } from 'lucide-react';
import { BOT_PERSONALITY } from '../constants/chatbot.constants';

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {/* Bot Avatar */}
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
          <span className="text-xl">{BOT_PERSONALITY.emoji}</span>
        </div>
        
        {/* Bot Info */}
        <div>
          <h4 className="font-bold text-lg">{BOT_PERSONALITY.name}</h4>
          <div className="flex items-center space-x-1 text-sm opacity-90">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Online • {BOT_PERSONALITY.title}</span>
          </div>
        </div>
      </div>
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="
          p-1.5 rounded-full hover:bg-white/20 
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-white/50
        "
        aria-label="Close chat"
      >
        <X size={20} />
      </button>
    </div>
  );
};
