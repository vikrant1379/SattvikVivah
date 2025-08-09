
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
  "Rs. 30 - 40 Lakh p.a",
  "Rs. 40 - 50 Lakh p.a",
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
