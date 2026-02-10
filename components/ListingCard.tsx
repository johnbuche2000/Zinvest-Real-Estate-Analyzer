import React from 'react';
import { Property, InvestmentAssumptions } from '../types';
import { analyzeProperty } from '../services/analysisEngine';
import MetricsDisplay from './MetricsDisplay';

interface Props {
  property: Property;
  assumptions: InvestmentAssumptions;
  onClick: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent) => void;
}

const ListingCard: React.FC<Props> = ({ property, assumptions, onClick, isFavorite = false, onToggleFavorite }) => {
  const analysis = analyzeProperty(property, assumptions);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(e);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col md:flex-row h-auto md:h-56 cursor-pointer group"
      onClick={onClick}
    >
      
      {/* Image Section */}
      <div className="md:w-1/3 relative h-48 md:h-full overflow-hidden">
        <img 
          src={property.details.images[0]} 
          alt={property.address.street} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
          {property.specs.type}
        </div>
        <div className="absolute bottom-2 left-2 bg-brand-600 text-white text-sm font-bold px-3 py-1 rounded shadow">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(property.price)}
        </div>
        
        {/* Favorite Button */}
        <button 
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-sm transition-all duration-200 z-10 ${
            isFavorite 
              ? 'bg-white text-red-500 hover:bg-gray-50' 
              : 'bg-black bg-opacity-40 text-white hover:bg-white hover:text-red-500'
          }`}
        >
          <i className={`${isFavorite ? 'fas' : 'far'} fa-heart text-lg`}></i>
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-900 truncate">{property.address.street}</h3>
            <p className="text-gray-500 text-sm">{property.address.city}, {property.address.state} {property.address.zipCode}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-600">
              <span><i className="fas fa-bed mr-1"></i> {property.specs.bedrooms} bds</span>
              <span><i className="fas fa-bath mr-1"></i> {property.specs.bathrooms} ba</span>
              <span><i className="fas fa-ruler-combined mr-1"></i> {property.specs.sqft.toLocaleString()} sqft</span>
            </div>
          </div>
          <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide border ${
            analysis.score === 'Excellent' ? 'bg-green-100 text-green-700 border-green-200' :
            analysis.score === 'Good' ? 'bg-blue-100 text-blue-700 border-blue-200' :
            analysis.score === 'Fair' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
            'bg-red-100 text-red-700 border-red-200'
          }`}>
            {analysis.score} Deal
          </div>
        </div>

        {/* Mini Metrics */}
        <MetricsDisplay analysis={analysis} compact />

        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-400">
             Listed {property.details.daysOnMarket} days ago
          </span>
          <button 
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
          >
            Details & Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;