
export const formatHeight = (height: string): string => {
  if (!height) return "Not specified";
  const feetInchesMatch = height.match(/(\d+)'(\d+)"/);
  if (feetInchesMatch) {
    const feet = feetInchesMatch[1];
    const inches = feetInchesMatch[2];
    return `${feet}' ${inches}"`;
  }
  return height;
};

export const formatInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const formatProfileUrl = (id: string, name: string): string => {
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `/profile/${id}/${slug}`;
};

export const formatLocation = (city?: string, state?: string): string => {
  if (!city && !state) return '';
  if (city && state) return `${city}, ${state}`;
  return city || state || '';
};
