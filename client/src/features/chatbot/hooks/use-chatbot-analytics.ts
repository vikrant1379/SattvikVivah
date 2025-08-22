
import { useCallback } from 'react';

interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: Date;
}

export const useChatbotAnalytics = () => {
  const trackEvent = useCallback((event: string, properties: Record<string, any> = {}) => {
    const analyticsEvent: AnalyticsEvent = {
      event: `chatbot_${event}`,
      properties: {
        ...properties,
        source: 'sattvic_chatbot',
        session_id: Date.now().toString()
      },
      timestamp: new Date()
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Chatbot Analytics:', analyticsEvent);
    }

    // Send to your analytics service
    // Example: analytics.track(analyticsEvent);
    
    // Store in localStorage for now
    const existingEvents = JSON.parse(localStorage.getItem('chatbot_analytics') || '[]');
    existingEvents.push(analyticsEvent);
    localStorage.setItem('chatbot_analytics', JSON.stringify(existingEvents.slice(-100))); // Keep last 100 events
  }, []);

  const trackChatOpen = useCallback(() => {
    trackEvent('chat_opened');
  }, [trackEvent]);

  const trackChatClose = useCallback(() => {
    trackEvent('chat_closed');
  }, [trackEvent]);

  const trackMessageSent = useCallback((messageLength: number, intent?: string) => {
    trackEvent('message_sent', { 
      message_length: messageLength,
      intent: intent || 'unknown'
    });
  }, [trackEvent]);

  const trackActionClicked = useCallback((actionType: string, actionLabel: string) => {
    trackEvent('action_clicked', {
      action_type: actionType,
      action_label: actionLabel
    });
  }, [trackEvent]);

  const trackQuickReplyUsed = useCallback((reply: string) => {
    trackEvent('quick_reply_used', { reply });
  }, [trackEvent]);

  const trackConversion = useCallback((conversionType: 'login' | 'register' | 'expert_consultation') => {
    trackEvent('conversion', { conversion_type: conversionType });
  }, [trackEvent]);

  return {
    trackEvent,
    trackChatOpen,
    trackChatClose,
    trackMessageSent,
    trackActionClicked,
    trackQuickReplyUsed,
    trackConversion
  };
};
