/* TODO: replace with JS utility for financial calculations

dummy calculations for monthly and total amounts in:
- Loan Calculator section for Qualify step
- financial search fields in Car Search step
- Create Quote popup
*/

export const getTotalAmountForCarSearch = (
  monthlyBudget: number,
  term: number,
  isFlexible: boolean,
  partExchangeSettlement = 0,
  deposit = 0
): number => {
  return (
    monthlyBudget * term -
    partExchangeSettlement -
    deposit -
    (isFlexible ? 50 : 0)
  );
};

export const calculateTotalAmountFromMonthly = (
  monthlyRepayment: number,
  term: number,
  apr: number
): number => {
  const total = monthlyRepayment * term;
  const interest = total * (apr / 100);
  return total + interest;
};

export const calculateMonthlyFromTotalAmount = (
  loanAmount: number,
  term: number,
  apr: number
): number => {
  const totalAmount = (100 * loanAmount) / (100 + apr);
  return totalAmount / term;
};

export const calculateCostOfCredit = (
  loanAmount: number,
  term: number,
  apr: number
): number => {
  return (loanAmount / term) * (apr / 100);
};

export const getTotalAmountForQuote = (
  carPrice: number,
  deposit: number,
  pxSettlement: number,
  paintProtection: number
): number => {
  return carPrice + paintProtection - (deposit + pxSettlement);
};

export const getMonthlyPaymentForQuote = (
  amount: number,
  term: number,
  apr: number
): number => {
  return (amount / 12) * term * (apr / 100);
};

export const getTotalCreditAmountForQuote = (
  amount: number,
  term: number,
  apr: number
): number => {
  return (amount / term) * (apr / 100);
};
