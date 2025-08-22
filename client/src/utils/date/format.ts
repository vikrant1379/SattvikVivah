
import { format, parseISO, isValid, differenceInYears } from 'date-fns';

export const formatDate = (date: string | Date, formatString = 'dd MMM yyyy'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, formatString) : 'Invalid Date';
  } catch {
    return 'Invalid Date';
  }
};

export const calculateAge = (birthDate: string | Date): number => {
  try {
    const dateObj = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
    return isValid(dateObj) ? differenceInYears(new Date(), dateObj) : 0;
  } catch {
    return 0;
  }
};

export const formatLastSeen = (lastSeen: string): string => {
  const now = new Date();
  const lastSeenDate = parseISO(lastSeen);
  const diffMinutes = Math.floor((now.getTime() - lastSeenDate.getTime()) / (1000 * 60));
  
  if (diffMinutes < 5) return 'Online now';
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hours ago`;
  
  return formatDate(lastSeen, 'dd-MMM-yy');
};
