import React, { useState } from 'react';
import { Property, InvestmentAssumptions } from '../types';
import { analyzeProperty } from '../services/analysisEngine';

interface Props {
  listings: Property[];
  assumptions: InvestmentAssumptions;
  onSelectProperty: (property: Property) => void;
}

const MapView: React.FC<Props> = ({ listings, assumptions, onSelectProperty }) => {
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);

  if (listings.length === 0) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-xl border border-gray-200 min-h-[500px]">
        <div className="text-center text-gray-500">
          <i className="fas fa-map-marked-alt text-4xl mb-3"></i>
          <p>No listings to display on map.</p>
        </div>
      </div>
    );
  }

  // Calculate bounding box to normalize coordinates
  const lats = listings.map(p => p.address.lat);
  const lngs = listings.map(p => p.address.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  // Add padding to bounds
  const latSpan = maxLat - minLat || 0.01;
  const lngSpan = maxLng - minLng || 0.01;
  const boundMinLat = minLat - latSpan * 0.1;
  const boundMaxLat = maxLat + latSpan * 0.1;
  const boundMinLng = minLng - lngSpan * 0.1;
  const boundMaxLng = maxLng + lngSpan * 0.1;

  // Function to project lat/lng to percentage x/y
  const getPosition = (lat: number, lng: number) => {
    const y = ((boundMaxLat - lat) / (boundMaxLat - boundMinLat)) * 100;
    const x = ((lng - boundMinLng) / (boundMaxLng - boundMinLng)) * 100;
    return { x, y };
  };

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return val.toString();
  };

  return (
    <div className="relative w-full h-[600px] bg-slate-200 rounded-xl overflow-hidden border border-gray-300 shadow-inner group">
      
      {/* Map Background Pattern Simulation */}
      <div className="absolute inset-0 opacity-10" 
           style={{
             backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', 
             backgroundSize: '20px 20px'
           }}>
      </div>
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded text-xs font-bold text-gray-500 z-0">
        Simulated Map View
      </div>

      {listings.map(property => {
        const { x, y } = getPosition(property.address.lat, property.address.lng);
        const analysis = analyzeProperty(property, assumptions);
        const isHovered = hoveredProperty?.id === property.id;

        return (
          <div
            key={property.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10 hover:z-20"
            style={{ left: `${x}%`, top: `${y}%` }}
            onMouseEnter={() => setHoveredProperty(property)}
            onMouseLeave={() => setHoveredProperty(null)}
            onClick={() => onSelectProperty(property)}
          >
            <div className={`
               flex items-center justify-center px-2 py-1 rounded-md shadow-md text-xs font-bold transition-all
               ${isHovered ? 'bg-brand-600 text-white scale-110' : 'bg-white text-gray-800 hover:bg-gray-50'}
               border border-gray-300
            `}>
              {formatCurrency(property.price)}
            </div>
            
            {/* Map Pin Stem */}
            <div className="w-0.5 h-2 bg-gray-400 mx-auto"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full mx-auto -mt-1 opacity-50 blur-[1px]"></div>

            {/* Popup Card */}
            {isHovered && (
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-30 pointer-events-none animate-fade-in-up">
                <div className="h-24 w-full">
                  <img src={property.details.images[0]} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="p-2">
                  <p className="font-bold text-gray-800 text-sm truncate">{property.address.street}</p>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500">{property.specs.bedrooms}b/{property.specs.bathrooms}ba</span>
                    <span className={`${analysis.cashFlow.monthly > 0 ? 'text-green-600' : 'text-red-500'} font-bold`}>
                      CF: ${analysis.cashFlow.monthly}
                    </span>
                  </div>
                </div>
                {/* Arrow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MapView;