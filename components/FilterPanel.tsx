import React from 'react';
import { FilterState, PropertyType } from '../types';
import { PROPERTY_TYPES } from '../constants';

interface Props {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  className?: string;
  onClose: () => void;
}

const FilterPanel: React.FC<Props> = ({ filters, onChange, className = '', onClose }) => {
  
  const handleChange = (key: keyof FilterState, value: string | number) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className={`bg-white p-5 rounded-xl shadow-lg border border-gray-100 h-fit ${className}`}>
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <h2 className="font-bold text-gray-800 text-lg">Filters</h2>
        <div className="flex gap-4">
          <button 
            className="text-xs text-brand-600 hover:text-brand-800 font-medium"
            onClick={() => onChange({
              priceMin: 0,
              priceMax: 2000000,
              bedsMin: 0,
              bathsMin: 0,
              propertyType: 'Any',
              keywords: '',
              zipCode: ''
            })}
          >
            Reset
          </button>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600">
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      <div className="space-y-5">
        
        {/* Location / Zip */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code(s)</label>
          <input 
            type="text" 
            placeholder="e.g. 90210, 78704"
            value={filters.zipCode}
            onChange={e => handleChange('zipCode', e.target.value)}
            className="w-full text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <div className="flex gap-2">
             <input 
               type="number" 
               placeholder="Min"
               value={filters.priceMin || ''}
               onChange={e => handleChange('priceMin', Number(e.target.value))}
               className="w-full text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
             />
             <input 
               type="number" 
               placeholder="Max"
               value={filters.priceMax || ''}
               onChange={e => handleChange('priceMax', Number(e.target.value))}
               className="w-full text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
             />
          </div>
        </div>

        {/* Beds & Baths */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Beds</label>
            <select 
              value={filters.bedsMin}
              onChange={e => handleChange('bedsMin', Number(e.target.value))}
              className="w-full text-sm p-2 border border-gray-300 rounded"
            >
              <option value={0}>Any</option>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Baths</label>
            <select 
              value={filters.bathsMin}
              onChange={e => handleChange('bathsMin', Number(e.target.value))}
              className="w-full text-sm p-2 border border-gray-300 rounded"
            >
              <option value={0}>Any</option>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
            </select>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
          <select 
             value={filters.propertyType}
             onChange={e => handleChange('propertyType', e.target.value)}
             className="w-full text-sm p-2 border border-gray-300 rounded"
          >
            {PROPERTY_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
          <input 
            type="text" 
            placeholder="e.g. pool, garage, fixer"
            value={filters.keywords}
            onChange={e => handleChange('keywords', e.target.value)}
            className="w-full text-sm p-2 border border-gray-300 rounded focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
          />
        </div>
        
        <button 
          onClick={onClose}
          className="w-full py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition"
        >
          View Listings
        </button>

      </div>
    </div>
  );
};

export default FilterPanel;