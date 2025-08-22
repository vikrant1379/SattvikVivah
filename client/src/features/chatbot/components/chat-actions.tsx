
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatAction } from '../types/chatbot.types';
import { Button } from '@/components/ui/button';
import { ExternalLink, User, Users, Phone, MessageSquare } from 'lucide-react';

interface ChatActionsProps {
  actions: ChatAction[];
}

export const ChatActions: React.FC<ChatActionsProps> = ({ actions }) => {
  const navigate = useNavigate();

  const handleAction = (action: ChatAction) => {
    switch (action.type) {
      case 'login':
        // Open login modal or navigate to login
        navigate('/login');
        break;
      
      case 'register':
        // Open registration modal or navigate to registration
        navigate('/register');
        break;
      
      case 'view-profile':
        // Navigate to profile management
        navigate('/profile');
        break;
      
      case 'expert-consultation':
        // Open expert consultation modal
        const modal = document.querySelector('[data-expert-modal]') as HTMLElement;
        if (modal) {
          modal.click();
        } else {
          // Fallback: scroll to expert section
          const expertSection = document.querySelector('[data-expert-section]');
          expertSection?.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      
      case 'whatsapp':
        // Open WhatsApp with predefined message
        const phoneNumber = action.payload?.phone || '+919876543210';
        const message = action.payload?.message || 'Hi, I need help with my Sattvic Matrimony profile';
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
        break;
      
      default:
        console.log('Unknown action type:', action.type);
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'login':
      case 'register':
        return <User size={16} />;
      case 'view-profile':
        return <Users size={16} />;
      case 'expert-consultation':
        return <Phone size={16} />;
      case 'whatsapp':
        return <MessageSquare size={16} />;
      default:
        return <ExternalLink size={16} />;
    }
  };

  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 mt-3">
      <div className="text-xs text-orange-600 font-medium">Available Actions:</div>
      <div className="flex flex-wrap gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            onClick={() => handleAction(action)}
            variant="outline"
            size="sm"
            className="
              text-sm px-3 py-2 h-auto
              bg-gradient-to-r from-orange-50 to-yellow-50
              border-orange-300 text-orange-700
              hover:from-orange-100 hover:to-yellow-100
              hover:border-orange-400
              transition-all duration-200
              shadow-sm hover:shadow-md
              font-medium
              flex items-center gap-2
            "
          >
            {getActionIcon(action.type)}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
