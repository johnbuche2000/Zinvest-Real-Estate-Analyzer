import React from 'react';
import { Property, InvestmentAssumptions } from '../types';
import { analyzeProperty } from '../services/analysisEngine';
import MetricsDisplay from './MetricsDisplay';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  property: Property;
  assumptions: InvestmentAssumptions;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const PropertyDetail: React.FC<Props> = ({ property, assumptions, isOpen, onClose, isFavorite, onToggleFavorite }) => {
  if (!isOpen) return null;

  const analysis = analyzeProperty(property, assumptions);
  
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const expensesData = [
    { name: 'Mortgage', value: analysis.monthlyExpenses.mortgage },
    { name: 'Tax', value: analysis.monthlyExpenses.tax },
    { name: 'Insurance', value: analysis.monthlyExpenses.insurance },
    { name: 'HOA', value: analysis.monthlyExpenses.hoa },
    { name: 'Vacancy', value: analysis.monthlyExpenses.vacancy },
    { name: 'Maint.', value: analysis.monthlyExpenses.maintenance },
    { name: 'Mgmt', value: analysis.monthlyExpenses.management },
  ].filter(d => d.value > 0);

  const COLORS = ['#0ea5e9', '#6366f1', '#8b5cf6', '#d946ef', '#f43f5e', '#f97316', '#eab308'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-white">
          <div className="flex-1 min-w-0 mr-4">
            <h2 className="text-2xl font-bold text-gray-900 truncate">{property.address.street}</h2>
            <p className="text-gray-500 truncate">{property.address.city}, {property.address.state} {property.address.zipCode}</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-2xl font-bold text-brand-600">{formatCurrency(property.price)}</p>
              <p className="text-sm text-gray-500">List Price</p>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className={`p-3 rounded-full transition-all duration-200 border ${
                isFavorite 
                  ? 'bg-red-50 border-red-100 text-red-500' 
                  : 'bg-gray-50 border-gray-200 text-gray-400 hover:text-red-400'
              }`}
            >
              <i className={`${isFavorite ? 'fas' : 'far'} fa-heart text-xl`}></i>
            </button>

            <button onClick={onClose} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <i className="fas fa-times text-gray-600 text-lg"></i>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Details & Images */}
            <div className="lg:col-span-1 space-y-6">
              <div className="rounded-lg overflow-hidden shadow-lg aspect-w-4 aspect-h-3">
                <img src={property.details.images[0]} alt="Property" className="object-cover w-full h-64" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                 <img src={property.details.images[1]} alt="Interior" className="object-cover w-full h-32 rounded-lg" />
                 <img src={property.details.images[2]} alt="Interior" className="object-cover w-full h-32 rounded-lg" />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Property Specs</h3>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <span className="block text-gray-500">Bedrooms</span>
                    <span className="font-medium">{property.specs.bedrooms}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Bathrooms</span>
                    <span className="font-medium">{property.specs.bathrooms}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Square Feet</span>
                    <span className="font-medium">{property.specs.sqft.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Year Built</span>
                    <span className="font-medium">{property.specs.yearBuilt}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Lot Size</span>
                    <span className="font-medium">{property.specs.lotSize.toLocaleString()} sqft</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Type</span>
                    <span className="font-medium">{property.specs.type}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{property.details.description}</p>
              </div>
            </div>

            {/* Right Column: Financials */}
            <div className="lg:col-span-2 space-y-6">
              <MetricsDisplay analysis={analysis} />

              {/* Expense Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                   <h3 className="font-semibold text-gray-800 mb-4">Monthly Income & Expenses</h3>
                   <div className="space-y-3">
                      <div className="flex justify-between items-center text-green-600 font-medium pb-2 border-b">
                        <span>Est. Rental Income</span>
                        <span>{formatCurrency(analysis.monthlyIncome)}</span>
                      </div>
                      
                      {/* Expense Lines */}
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Mortgage (P&I)</span>
                          <span>{formatCurrency(analysis.monthlyExpenses.mortgage)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Property Tax</span>
                          <span>{formatCurrency(analysis.monthlyExpenses.tax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Insurance</span>
                          <span>{formatCurrency(analysis.monthlyExpenses.insurance)}</span>
                        </div>
                        {analysis.monthlyExpenses.hoa > 0 && (
                          <div className="flex justify-between">
                            <span>HOA</span>
                            <span>{formatCurrency(analysis.monthlyExpenses.hoa)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-gray-400">
                          <span>Vacancy ({assumptions.vacancyRatePercent}%)</span>
                          <span>{formatCurrency(analysis.monthlyExpenses.vacancy)}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Maintenance ({assumptions.maintenancePercent}%)</span>
                          <span>{formatCurrency(analysis.monthlyExpenses.maintenance)}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Mgmt ({assumptions.managementFeePercent}%)</span>
                          <span>{formatCurrency(analysis.monthlyExpenses.management)}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-red-600 font-medium pt-2 border-t mt-2">
                        <span>Total Expenses</span>
                        <span>{formatCurrency(analysis.monthlyExpenses.total)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center font-bold text-lg pt-2 border-t border-gray-100">
                        <span>Net Cash Flow</span>
                        <span className={analysis.cashFlow.monthly >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(analysis.cashFlow.monthly)}
                        </span>
                      </div>
                   </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
                  <h3 className="font-semibold text-gray-800 mb-4">Expense Distribution</h3>
                  <div className="flex-1 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={expensesData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" width={70} tick={{fontSize: 12}} />
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {expensesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-xs text-yellow-800">
                <p><strong>Disclaimer:</strong> Financial calculations are estimates for educational purposes only. Actual results may vary based on market conditions, specific property issues, and personal financial situation. Always consult with a qualified real estate professional or financial advisor before investing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;