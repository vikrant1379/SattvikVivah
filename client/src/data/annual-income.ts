
export const annualIncomeMinOptions = [
  "Rs. 0",
  "Rs. 1 Lakh",
  "Rs. 2 Lakh",
  "Rs. 3 Lakh",
  "Rs. 4 Lakh",
  "Rs. 5 Lakh",
  "Rs. 7.5 Lakh",
  "Rs. 10 Lakh",
  "Rs. 12.5 Lakh",
  "Rs. 15 Lakh",
  "Rs. 20 Lakh",
  "Rs. 25 Lakh",
  "Rs. 30 Lakh",
  "Rs. 35 Lakh",
  "Rs. 40 Lakh",
  "Rs. 45 Lakh",
  "Rs. 50 Lakh",
  "Rs. 75 Lakh",
  "Rs. 1 Crore"
];

export const annualIncomeMaxOptions = [
  "Rs. 1 Lakh",
  "Rs. 2 Lakh",
  "Rs. 3 Lakh",
  "Rs. 4 Lakh",
  "Rs. 5 Lakh",
  "Rs. 7.5 Lakh",
  "Rs. 10 Lakh",
  "Rs. 12.5 Lakh",
  "Rs. 15 Lakh",
  "Rs. 20 Lakh",
  "Rs. 25 Lakh",
  "Rs. 30 Lakh",
  "Rs. 35 Lakh",
  "Rs. 40 Lakh",
  "Rs. 45 Lakh",
  "Rs. 50 Lakh",
  "Rs. 75 Lakh",
  "Rs. 1 Crore",
  "Above Rs. 1 Crore"
];

// Legacy options for backward compatibility (used by existing profiles)
export const annualIncomeOptions = [
  "Below Rs. 1 Lakh",
  "Rs. 1 - 2 Lakh p.a",
  "Rs. 2 - 3 Lakh p.a",
  "Rs. 3 - 4 Lakh p.a", 
  "Rs. 4 - 5 Lakh p.a",
  "Rs. 5 - 7.5 Lakh p.a",
  "Rs. 7.5 - 10 Lakh p.a",
  "Rs. 10 - 12.5 Lakh p.a",
  "Rs. 12.5 - 15 Lakh p.a",
  "Rs. 15 - 20 Lakh p.a",
  "Rs. 20 - 25 Lakh p.a",
  "Rs. 25 - 30 Lakh p.a",
  "Rs. 30 - 35 Lakh p.a",
  "Rs. 35 - 40 Lakh p.a",
  "Rs. 40 - 45 Lakh p.a",
  "Rs. 45 - 50 Lakh p.a",
  "Rs. 50 - 75 Lakh p.a",
  "Rs. 75 Lakh - 1 Crore p.a",
  "Rs. 1 - 2 Crore p.a",
  "Rs. 2 - 5 Crore p.a",
  "Above Rs. 5 Crore p.a"
];

// Helper function to format annual income for display
export const formatAnnualIncome = (income: string | undefined): string => {
  if (!income) return '';
  
  // If the income is already in the correct format, return as is
  if (annualIncomeOptions.includes(income)) {
    return income;
  }
  
  // Handle legacy formats or convert if needed
  return income;
};
