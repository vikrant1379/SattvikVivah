
import React, { useState, useRef } from 'react';
import { useChatbot } from '../contexts/chatbot-context';
import { Button } from '@/components/ui/button';
import { Send, Smile } from 'lucide-react';

export const ChatInput: React.FC = () => {
  const { sendMessage, state } = useChatbot();
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || state.isLoading) return;
    
    const message = inputValue.trim();
    setInputValue('');
    
    try {
      await sendMessage(message);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Could show an error state here
    }
    
    // Focus back to input
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const quickInserts = [
    "🙏 I need guidance",
    "💝 Help me find matches", 
    "📝 Improve my profile",
    "✨ Expert consultation"
  ];

  return (
    <div className="border-t border-orange-100 bg-white p-4">
      {/* Quick Insert Suggestions */}
      {state.messages.length === 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            {quickInserts.map((text, index) => (
              <button
                key={index}
                onClick={() => setInputValue(text)}
                className="
                  text-xs px-3 py-1.5 bg-orange-50 text-orange-700 
                  rounded-full border border-orange-200
                  hover:bg-orange-100 hover:border-orange-300
                  transition-colors duration-200
                  font-medium
                "
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share your heart's question... 🪷"
            disabled={state.isLoading}
            className="
              w-full px-4 py-3 pr-12 
              border border-orange-200 rounded-full
              focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent
              bg-orange-50/50 text-gray-800
              placeholder-gray-500
              disabled:opacity-50 disabled:cursor-not-allowed
              text-sm
            "
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
          
          {/* Emoji Button */}
          <button
            type="button"
            className="
              absolute right-3 top-1/2 transform -translate-y-1/2
              p-1 text-gray-400 hover:text-orange-500
              transition-colors duration-200
            "
            onClick={() => {
              // Could add emoji picker functionality here
              setInputValue(prev => prev + " 🙏");
            }}
          >
            <Smile size={18} />
          </button>
        </div>
        
        {/* Send Button */}
        <Button
          type="submit"
          disabled={!inputValue.trim() || state.isLoading}
          className="
            bg-gradient-to-r from-orange-500 to-yellow-500 
            hover:from-orange-600 hover:to-yellow-600
            text-white p-3 rounded-full
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            shadow-lg hover:shadow-xl
            focus:ring-2 focus:ring-orange-400
          "
        >
          {state.isLoading ? (
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <Send size={18} />
          )}
        </Button>
      </form>
      
      {/* Typing Indicator Space */}
      <div className="h-4 flex items-center justify-center">
        {state.isLoading && (
          <div className="text-xs text-orange-600 italic animate-pulse">
            Dharma is preparing sacred wisdom...
          </div>
        )}
      </div>
    </div>
  );
};
