import { InvestmentAssumptions, FilterState, PropertyType } from './types';

export const DEFAULT_ASSUMPTIONS: InvestmentAssumptions = {
  downPaymentPercent: 20,
  interestRate: 6.8,
  loanTermYears: 30,
  closingCostsPercent: 3,
  vacancyRatePercent: 5,
  managementFeePercent: 0, // Assume self-managed by default
  maintenancePercent: 1.0,
  insuranceAnnual: 1000, // Default fallback
  appreciationRate: 3.0,
};

export const DEFAULT_FILTERS: FilterState = {
  priceMin: 0,
  priceMax: 2000000,
  bedsMin: 0,
  bathsMin: 0,
  propertyType: 'Any',
  keywords: '',
  zipCode: '',
};

export const PROPERTY_TYPES = [
  'Any',
  PropertyType.SingleFamily,
  PropertyType.MultiFamily,
  PropertyType.Condo,
  PropertyType.Townhouse,
  PropertyType.Land
];