
import React from 'react';
import { ChatAction } from '../types/chatbot.types';
import { Button } from '@/components/ui/button';
import { MessageCircle, UserPlus, LogIn, User, Phone } from 'lucide-react';

interface ChatActionsProps {
  actions: ChatAction[];
}

export const ChatActions: React.FC<ChatActionsProps> = ({ actions }) => {
  const handleAction = (action: ChatAction) => {
    switch (action.type) {
      case 'login':
        // Navigate to login
        window.location.href = '/login';
        break;
      case 'register':
        // Navigate to registration
        window.location.href = '/signup';
        break;
      case 'view-profile':
        // Navigate to profile
        window.location.href = '/profile';
        break;
      case 'expert-consultation':
        // Trigger expert consultation modal
        document.dispatchEvent(new CustomEvent('open-expert-modal'));
        break;
      case 'whatsapp':
        // Open WhatsApp
        const message = action.payload?.message || "🙏 Namaste! I seek dharmic guidance for my matrimonial journey.";
        const whatsappUrl = `https://wa.me/918000000000?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        break;
      default:
        console.log('Action:', action);
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'login': return <LogIn size={16} />;
      case 'register': return <UserPlus size={16} />;
      case 'view-profile': return <User size={16} />;
      case 'expert-consultation': return <Phone size={16} />;
      case 'whatsapp': return <MessageCircle size={16} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {actions.map((action, index) => (
        <Button
          key={index}
          onClick={() => handleAction(action)}
          variant="outline"
          size="sm"
          className="
            border-orange-300 text-orange-700 hover:bg-orange-50 
            hover:border-orange-400 transition-all duration-200
            flex items-center justify-start space-x-2
            text-sm font-medium
          "
        >
          {getActionIcon(action.type)}
          <span>{action.label}</span>
        </Button>
      ))}
    </div>
  );
};
