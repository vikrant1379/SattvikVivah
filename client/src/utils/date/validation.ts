
export const isValidAge = (age: number): boolean => {
  return age >= 18 && age <= 100;
};

export const isValidDateRange = (startDate: string, endDate: string): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= end;
};
