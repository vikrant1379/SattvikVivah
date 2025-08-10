// Re-export from centralized static options
export {
  annualIncomeOptions,
  annualIncomeMinOptions,
  annualIncomeMaxOptions
} from './static-options';

// Format annual income for display
export function formatAnnualIncome(income: string): string {
  // Handle special cases
  if (income === "Below ₹2 Lakh") return "Below ₹2L";
  if (income === "Above ₹1 Crore") return "Above ₹1Cr";
  if (income === "Prefer not to disclose") return "Not disclosed";
  
  // Convert ranges to shorter format
  return income
    .replace(/₹(\d+)-(\d+) Lakh/g, '₹$1-$2L')
    .replace(/₹(\d+) Lakh - ₹1 Crore/g, '₹$1L-₹1Cr')
    .replace(/₹(\d+)-(\d+) Lakh/g, '₹$1-$2L');
}