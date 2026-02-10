export enum PropertyType {
  SingleFamily = 'Single Family',
  MultiFamily = 'Multi Family',
  Condo = 'Condo',
  Townhouse = 'Townhouse',
  Land = 'Land'
}

export interface Property {
  id: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    lat: number;
    lng: number;
  };
  price: number;
  specs: {
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    lotSize: number; // in sqft
    yearBuilt: number;
    type: PropertyType;
  };
  financials: {
    hoaMonthly: number;
    propertyTaxAnnual: number;
    zestimateRent: number;
  };
  details: {
    description: string;
    images: string[];
    daysOnMarket: number;
    listingAgent?: string;
    source: string;
  };
}

export interface FilterState {
  priceMin: number;
  priceMax: number;
  bedsMin: number;
  bathsMin: number;
  propertyType: PropertyType | 'Any';
  keywords: string;
  zipCode: string;
}

export interface InvestmentAssumptions {
  downPaymentPercent: number; // e.g., 20
  interestRate: number; // e.g., 6.5
  loanTermYears: number; // e.g., 30
  closingCostsPercent: number; // e.g., 3
  vacancyRatePercent: number; // e.g., 5
  managementFeePercent: number; // e.g., 10
  maintenancePercent: number; // e.g., 1 (annual)
  insuranceAnnual: number; // e.g., 1200 (if not specific per property)
  appreciationRate: number; // e.g., 3
}

export interface AnalysisResult {
  monthlyIncome: number;
  monthlyExpenses: {
    mortgage: number;
    tax: number;
    insurance: number;
    hoa: number;
    vacancy: number;
    maintenance: number;
    management: number;
    total: number;
  };
  cashFlow: {
    monthly: number;
    annual: number;
  };
  metrics: {
    capRate: number;
    cashOnCash: number;
    grm: number; // Gross Rent Multiplier
    dscr: number; // Debt Service Coverage Ratio
    totalCashNeeded: number;
  };
  projections: {
    year1TotalROI: number;
    year5TotalROI: number;
    year10TotalROI: number;
  };
  score: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

export interface OnboardingData {
  investorType: 'Beginner' | 'Intermediate' | 'Pro';
  goal: 'Cash Flow' | 'Appreciation' | 'Fix & Flip';
  budget: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isGuest: boolean;
  onboarding?: OnboardingData;
  favorites: string[];
}