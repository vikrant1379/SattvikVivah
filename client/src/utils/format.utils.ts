
export const formatSpiritualPractices = (practices: string[]): string => {
  if (practices.length === 0) return "No practices listed";
  if (practices.length === 1) return practices[0];
  if (practices.length === 2) return practices.join(" & ");
  return `${practices.slice(0, -1).join(", ")} & ${practices[practices.length - 1]}`;
};

export const formatFullName = (firstName: string, lastName?: string): string => {
  if (!lastName) return firstName;
  return `${firstName} ${lastName}`;
};

export const formatAge = (age: number): string => {
  return `${age} years old`;
};

export const formatHeight = (height: string): string => {
  if (!height) return 'Not specified';
  return height;
};

export const formatLocation = (city?: string, state?: string): string => {
  if (city && state) return `${city}, ${state}`;
  if (state) return state;
  if (city) return city;
  return 'Location not specified';
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const formatArrayToString = (items: string[], separator: string = ', '): string => {
  return items.join(separator);
};

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
