
import React from 'react';
import { useChatbot } from '../contexts/chatbot-context';
import { RESPONSE_TEMPLATES } from '../constants/chatbot.constants';

export const QuickReplies: React.FC = () => {
  const { sendMessage, state } = useChatbot();

  // Get contextual quick replies based on current flow
  const getQuickReplies = () => {
    switch (state.currentFlow.flowType) {
      case 'welcome':
        return RESPONSE_TEMPLATES.quickReplies.welcome;
      case 'profile-help':
        return RESPONSE_TEMPLATES.quickReplies.profileHelp;
      case 'matching-guidance':
        return RESPONSE_TEMPLATES.quickReplies.matching;
      default:
        return RESPONSE_TEMPLATES.quickReplies.welcome;
    }
  };

  const quickReplies = getQuickReplies();

  const handleQuickReply = async (reply: string) => {
    try {
      await sendMessage(reply);
    } catch (error) {
      console.error('Failed to send quick reply:', error);
    }
  };

  if (state.isLoading || quickReplies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="text-xs text-gray-500 font-medium">Quick responses:</div>
      <div className="flex flex-wrap gap-2">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            onClick={() => handleQuickReply(reply)}
            className="
              text-sm px-3 py-2 
              bg-white border border-orange-300 text-orange-700
              rounded-full hover:bg-orange-50 hover:border-orange-400
              transition-all duration-200
              shadow-sm hover:shadow-md
              font-medium
              focus:outline-none focus:ring-2 focus:ring-orange-400
            "
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  );
};
