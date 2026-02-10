import { Property, PropertyType } from '../types';

// In a real application, these requests would be routed through a backend server
// that scrapes Realtor.com or uses an official API.
// Current implementation simulates the data structure returned by such a scraper.

const STREET_NAMES = ['Maple', 'Oak', 'Pine', 'Cedar', 'Elm', 'Washington', 'Main', 'Highland', 'Park', 'Lake'];
const TYPES = [PropertyType.SingleFamily, PropertyType.MultiFamily, PropertyType.Condo, PropertyType.Townhouse];

// City data with approximate central coordinates
const CITIES = [
  { city: 'Austin', state: 'TX', zip: '78701', basePrice: 450000, lat: 30.2672, lng: -97.7431 },
  { city: 'Dallas', state: 'TX', zip: '75201', basePrice: 350000, lat: 32.7767, lng: -96.7970 },
  { city: 'Nashville', state: 'TN', zip: '37203', basePrice: 400000, lat: 36.1627, lng: -86.7816 },
  { city: 'Atlanta', state: 'GA', zip: '30308', basePrice: 380000, lat: 33.7490, lng: -84.3880 },
  { city: 'Phoenix', state: 'AZ', zip: '85001', basePrice: 420000, lat: 33.4484, lng: -112.0740 },
];

const generateRandomProperty = (id: number): Property => {
  const location = CITIES[Math.floor(Math.random() * CITIES.length)];
  const type = TYPES[Math.floor(Math.random() * TYPES.length)];
  
  const bedrooms = Math.floor(Math.random() * 4) + 2; // 2-5
  const bathrooms = Math.floor(Math.random() * 3) + 1; // 1-3
  const sqft = 1000 + Math.floor(Math.random() * 2500);
  
  // Price variance based on sqft and random factor
  const price = Math.floor((location.basePrice + (sqft * 150) + (Math.random() * 100000 - 50000)) / 1000) * 1000;
  
  // Rent rule of thumb roughly 0.7% - 1.2% of price for simulation
  const rentRatio = 0.006 + (Math.random() * 0.005); 
  const zestimateRent = Math.floor(price * rentRatio);

  const taxRate = 0.012; // 1.2%
  const annualTax = Math.floor(price * taxRate);
  
  const hoa = type === PropertyType.Condo ? 350 + Math.floor(Math.random() * 200) : 0;

  // Generate random coordinate offset approx within 5 miles
  const latOffset = (Math.random() - 0.5) * 0.1;
  const lngOffset = (Math.random() - 0.5) * 0.1;

  return {
    id: `prop-${id}`,
    address: {
      street: `${Math.floor(Math.random() * 9999)} ${STREET_NAMES[Math.floor(Math.random() * STREET_NAMES.length)]} St`,
      city: location.city,
      state: location.state,
      zipCode: location.zip,
      lat: location.lat + latOffset,
      lng: location.lng + lngOffset
    },
    price,
    specs: {
      bedrooms,
      bathrooms,
      sqft,
      lotSize: sqft * (type === PropertyType.SingleFamily ? 4 : 1),
      yearBuilt: 1950 + Math.floor(Math.random() * 74),
      type
    },
    financials: {
      hoaMonthly: hoa,
      propertyTaxAnnual: annualTax,
      zestimateRent
    },
    details: {
      description: `Beautiful ${type.toLowerCase()} located in the heart of ${location.city}. Features updated amenities, spacious living areas, and great potential for investors. Recently renovated kitchen with granite countertops. Walking distance to local parks and shops.`,
      images: [
        `https://picsum.photos/800/600?random=${id}`,
        `https://picsum.photos/800/600?random=${id + 100}`,
        `https://picsum.photos/800/600?random=${id + 200}`,
      ],
      daysOnMarket: Math.floor(Math.random() * 120),
      listingAgent: "Realtor.com Verified Agent",
      source: "Realtor.com"
    }
  };
};

export const fetchListings = async (page: number = 1, limit: number = 10): Promise<Property[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return Array.from({ length: limit }).map((_, i) => generateRandomProperty(page * 1000 + i));
};