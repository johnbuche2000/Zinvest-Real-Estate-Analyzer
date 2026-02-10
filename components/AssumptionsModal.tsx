import React from 'react';
import { InvestmentAssumptions } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  assumptions: InvestmentAssumptions;
  onSave: (newAssumptions: InvestmentAssumptions) => void;
}

const AssumptionsModal: React.FC<Props> = ({ isOpen, onClose, assumptions, onSave }) => {
  const [formData, setFormData] = React.useState<InvestmentAssumptions>(assumptions);

  React.useEffect(() => {
    setFormData(assumptions);
  }, [assumptions]);

  if (!isOpen) return null;

  const handleChange = (key: keyof InvestmentAssumptions, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">Investment Assumptions</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Loan Settings */}
            <div className="space-y-4">
              <h3 className="font-semibold text-brand-700 border-b pb-2">Loan Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Down Payment (%)</label>
                <input 
                  type="number" 
                  value={formData.downPaymentPercent} 
                  onChange={e => handleChange('downPaymentPercent', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={formData.interestRate} 
                  onChange={e => handleChange('interestRate', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Loan Term (Years)</label>
                <select 
                  value={formData.loanTermYears} 
                  onChange={e => handleChange('loanTermYears', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-brand-500 focus:ring-brand-500"
                >
                  <option value={15}>15 Years</option>
                  <option value={30}>30 Years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Closing Costs (%)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={formData.closingCostsPercent} 
                  onChange={e => handleChange('closingCostsPercent', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Operating Expenses */}
            <div className="space-y-4">
              <h3 className="font-semibold text-brand-700 border-b pb-2">Operating Expenses</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vacancy Rate (%)</label>
                <input 
                  type="number" 
                  step="0.5"
                  value={formData.vacancyRatePercent} 
                  onChange={e => handleChange('vacancyRatePercent', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Management Fee (%)</label>
                <input 
                  type="number" 
                  step="0.5"
                  value={formData.managementFeePercent} 
                  onChange={e => handleChange('managementFeePercent', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Maintenance (Annual %)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={formData.maintenancePercent} 
                  onChange={e => handleChange('maintenancePercent', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Default Insurance (Annual $)</label>
                <input 
                  type="number" 
                  value={formData.insuranceAnnual} 
                  onChange={e => handleChange('insuranceAnnual', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700 transition-colors shadow-sm"
            >
              Apply Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssumptionsModal;