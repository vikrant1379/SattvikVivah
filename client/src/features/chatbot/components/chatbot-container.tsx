
import React, { useEffect, useRef } from 'react';
import { useChatbot } from '../contexts/chatbot-context';
import { ChatbotFloat } from './chatbot-float';
import { ChatInterface } from './chat-interface';
import { CHATBOT_CONFIG } from '../constants/chatbot.constants';
import { useMobile } from '@/hooks/use-mobile';

export const SattvicChatbot: React.FC = () => {
  const { state, triggerProactiveMessage } = useChatbot();
  const isMobile = useMobile();
  const pageTimeRef = useRef<NodeJS.Timeout>();
  const profileViewCountRef = useRef(0);
  const searchCountRef = useRef(0);
  const idleTimeRef = useRef<NodeJS.Timeout>();

  // Initialize proactive triggers
  useEffect(() => {
    // Page time trigger for new visitors
    if (!state.userContext.isAuthenticated) {
      pageTimeRef.current = setTimeout(() => {
        triggerProactiveMessage('newVisitor');
      }, CHATBOT_CONFIG.TRIGGERS.pageTimeThreshold);
    }

    // Idle timeout
    const resetIdleTimer = () => {
      if (idleTimeRef.current) clearTimeout(idleTimeRef.current);
      idleTimeRef.current = setTimeout(() => {
        triggerProactiveMessage('idle');
      }, CHATBOT_CONFIG.TRIGGERS.idleTimeout);
    };

    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('keypress', resetIdleTimer);
    resetIdleTimer();

    return () => {
      if (pageTimeRef.current) clearTimeout(pageTimeRef.current);
      if (idleTimeRef.current) clearTimeout(idleTimeRef.current);
      document.removeEventListener('mousemove', resetIdleTimer);
      document.removeEventListener('keypress', resetIdleTimer);
    };
  }, [state.userContext.isAuthenticated, triggerProactiveMessage]);

  // Monitor profile browsing activity
  useEffect(() => {
    const handleProfileView = () => {
      profileViewCountRef.current += 1;
      if (profileViewCountRef.current >= CHATBOT_CONFIG.TRIGGERS.profileViewThreshold) {
        triggerProactiveMessage('profileBrowsing');
        profileViewCountRef.current = 0; // Reset counter
      }
    };

    // Listen for profile view events
    document.addEventListener('profile-viewed', handleProfileView);
    return () => document.removeEventListener('profile-viewed', handleProfileView);
  }, [triggerProactiveMessage]);

  // Monitor search activity
  useEffect(() => {
    const handleSearchActivity = () => {
      searchCountRef.current += 1;
      if (searchCountRef.current >= CHATBOT_CONFIG.TRIGGERS.searchActivityThreshold) {
        triggerProactiveMessage('searchActivity');
        searchCountRef.current = 0; // Reset counter
      }
    };

    document.addEventListener('search-performed', handleSearchActivity);
    return () => document.removeEventListener('search-performed', handleSearchActivity);
  }, [triggerProactiveMessage]);

  return (
    <div className="sattvic-chatbot-container">
      <ChatbotFloat />
      {state.isOpen && <ChatInterface />}
    </div>
  );
};
