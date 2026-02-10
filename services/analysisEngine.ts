import { Property, InvestmentAssumptions, AnalysisResult } from '../types';

export const calculateMortgage = (principal: number, rate: number, years: number): number => {
  if (rate === 0) return principal / (years * 12);
  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = years * 12;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
};

export const analyzeProperty = (property: Property, assumptions: InvestmentAssumptions): AnalysisResult => {
  const { price, financials } = property;
  
  // 1. Initial Investment
  const downPayment = price * (assumptions.downPaymentPercent / 100);
  const closingCosts = price * (assumptions.closingCostsPercent / 100);
  const totalCashNeeded = downPayment + closingCosts;
  const loanAmount = price - downPayment;

  // 2. Income
  const monthlyIncome = financials.zestimateRent;
  const annualIncome = monthlyIncome * 12;

  // 3. Expenses (Monthly)
  const monthlyMortgage = calculateMortgage(loanAmount, assumptions.interestRate, assumptions.loanTermYears);
  const monthlyTax = financials.propertyTaxAnnual / 12;
  const monthlyInsurance = assumptions.insuranceAnnual / 12; // In a real app, this might be property specific
  const monthlyHOA = financials.hoaMonthly;
  
  // Variable Expenses
  const monthlyVacancy = monthlyIncome * (assumptions.vacancyRatePercent / 100);
  const monthlyMaintenance = (price * (assumptions.maintenancePercent / 100)) / 12;
  const monthlyManagement = monthlyIncome * (assumptions.managementFeePercent / 100);

  const totalMonthlyExpenses = 
    monthlyMortgage + 
    monthlyTax + 
    monthlyInsurance + 
    monthlyHOA + 
    monthlyVacancy + 
    monthlyMaintenance + 
    monthlyManagement;

  // 4. Cash Flow
  const monthlyCashFlow = monthlyIncome - totalMonthlyExpenses;
  const annualCashFlow = monthlyCashFlow * 12;

  // 5. Metrics
  const noi = (annualIncome - (monthlyVacancy + monthlyMaintenance + monthlyManagement + (monthlyTax * 12) + (monthlyInsurance * 12) + (monthlyHOA * 12)));
  const capRate = (noi / price) * 100;
  const cashOnCash = (annualCashFlow / totalCashNeeded) * 100;
  const grm = annualIncome > 0 ? price / annualIncome : 0;
  const dscr = monthlyMortgage > 0 ? noi / (monthlyMortgage * 12) : 0;

  // 6. Projections (Simple linear for UI speed)
  // ROI = (Total Cash Flow + Equity Buildup + Appreciation) / Total Invested
  // This is a simplified projection for the "feed" view
  const annualAppreciationAmount = price * (assumptions.appreciationRate / 100);
  // Approximation of principal paydown in year 1
  const firstYearInterest = loanAmount * (assumptions.interestRate / 100);
  const firstYearPrincipal = (monthlyMortgage * 12) - firstYearInterest;
  
  const year1TotalReturn = annualCashFlow + annualAppreciationAmount + firstYearPrincipal;
  const year1TotalROI = (year1TotalReturn / totalCashNeeded) * 100;

  // Simple extrapolation for 5/10 years (compound effects omitted for brevity in this engine version, but acceptable for estimation)
  const year5TotalROI = year1TotalROI * 5; // Simplified
  const year10TotalROI = year1TotalROI * 10; // Simplified

  // 7. Scoring
  let score: AnalysisResult['score'] = 'Poor';
  if (cashOnCash > 12 && capRate > 7) score = 'Excellent';
  else if (cashOnCash > 8 && capRate > 5) score = 'Good';
  else if (cashOnCash > 4) score = 'Fair';

  return {
    monthlyIncome,
    monthlyExpenses: {
      mortgage: monthlyMortgage,
      tax: monthlyTax,
      insurance: monthlyInsurance,
      hoa: monthlyHOA,
      vacancy: monthlyVacancy,
      maintenance: monthlyMaintenance,
      management: monthlyManagement,
      total: totalMonthlyExpenses
    },
    cashFlow: {
      monthly: monthlyCashFlow,
      annual: annualCashFlow
    },
    metrics: {
      capRate,
      cashOnCash,
      grm,
      dscr,
      totalCashNeeded
    },
    projections: {
      year1TotalROI,
      year5TotalROI,
      year10TotalROI
    },
    score
  };
};