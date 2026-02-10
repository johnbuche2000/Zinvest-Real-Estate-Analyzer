import React from 'react';
import { Property, InvestmentAssumptions, User } from '../types';
import ListingCard from './ListingCard';

// --- Buy View ---
export const BuyView: React.FC = () => {
  const steps = [
    { icon: 'fa-file-invoice-dollar', title: 'Get Pre-Qualified', desc: 'Understanding your budget is the first step. Connect with lenders to get a pre-approval letter.' },
    { icon: 'fa-search-location', title: 'Market Research', desc: 'Use our "Search" tab to identify high-growth neighborhoods and properties with good cash flow.' },
    { icon: 'fa-handshake', title: 'Find an Agent', desc: 'Work with an investor-friendly agent who understands Cap Rate and ROI, not just granite countertops.' },
    { icon: 'fa-key', title: 'Close the Deal', desc: 'Navigate inspections, appraisals, and closing costs with your team.' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      <div className="bg-brand-600 rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Buying Investment Property</h2>
        <p className="text-brand-100 text-lg max-w-2xl">
          Whether you're looking for your first rental or expanding your portfolio, 
          successful investing starts with a solid plan and the right team.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-brand-200 transition-colors">
            <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center text-xl mb-4">
              <i className={`fas ${step.icon}`}></i>
            </div>
            <h3 className="font-bold text-lg mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Need an Investor-Friendly Agent?</h3>
          <p className="text-gray-600">We verify agents based on their transaction history with investment properties.</p>
        </div>
        <button className="px-6 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
          Find an Agent
        </button>
      </div>
    </div>
  );
};

// --- Sell View ---
export const SellView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Selling Your Property</h2>
        <p className="text-gray-300 text-lg max-w-2xl">
          Maximize your return on equity. Understand your home's value and market dynamics before you list.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-4 text-green-600 text-3xl"><i className="fas fa-chart-line"></i></div>
          <h3 className="font-bold text-lg mb-2">Home Valuation</h3>
          <p className="text-gray-600 text-sm mb-4">Get a data-driven estimate of your property's value based on recent comps and rental income potential.</p>
          <button className="text-brand-600 font-bold text-sm hover:underline">Get Estimate &rarr;</button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-4 text-blue-600 text-3xl"><i className="fas fa-paint-roller"></i></div>
          <h3 className="font-bold text-lg mb-2">Prepare to Sell</h3>
          <p className="text-gray-600 text-sm mb-4">Learn which renovations add the most value and which ones to skip to maximize your net profit.</p>
          <button className="text-brand-600 font-bold text-sm hover:underline">Read Guide &rarr;</button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="mb-4 text-purple-600 text-3xl"><i className="fas fa-bullhorn"></i></div>
          <h3 className="font-bold text-lg mb-2">Marketing Strategy</h3>
          <p className="text-gray-600 text-sm mb-4">Professional photography and staging can increase sale price by up to 5%. Don't cut corners.</p>
          <button className="text-brand-600 font-bold text-sm hover:underline">See Checklist &rarr;</button>
        </div>
      </div>

      {/* Find an Agent Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Need a Top Listing Agent?</h3>
          <p className="text-gray-600">Sell for more. We match you with agents who specialize in investment property exits and 1031 exchanges.</p>
        </div>
        <button className="px-6 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
          Find a Seller's Agent
        </button>
      </div>
    </div>
  );
};

// --- Learn / Tutorials View ---
export const LearnView: React.FC = () => {
  const articles = [
    { tag: 'Basics', title: 'What is Cap Rate?', desc: 'The Capitalization Rate is the ratio of Net Operating Income (NOI) to property asset value.', readTime: '5 min read' },
    { tag: 'Strategy', title: 'The BRRRR Method Explained', desc: 'Buy, Rehab, Rent, Refinance, Repeat. How to scale your portfolio with limited capital.', readTime: '8 min read' },
    { tag: 'Finance', title: 'Cash-on-Cash Return vs ROI', desc: 'Why cash flow investors prioritize CoC return over total Return on Investment.', readTime: '4 min read' },
    { tag: 'Tax', title: 'Real Estate Tax Benefits', desc: 'Depreciation, 1031 Exchanges, and deductions that make real estate a tax haven.', readTime: '10 min read' },
    { tag: 'Management', title: 'Self-Managing vs Hiring a Pro', desc: 'When does it make sense to pay 10% of your gross rent to a property manager?', readTime: '6 min read' },
    { tag: 'Market', title: 'Analyzing Neighborhood Trends', desc: 'How to spot up-and-coming areas before they become too expensive.', readTime: '7 min read' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Investor Academy</h2>
        <p className="text-gray-600">Master the fundamentals of real estate investing.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-2 bg-brand-500"></div>
            <div className="p-6">
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded uppercase tracking-wider mb-3">
                {article.tag}
              </span>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{article.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{article.desc}</p>
              <div className="flex items-center text-xs text-gray-400 font-medium">
                <i className="far fa-clock mr-1"></i> {article.readTime}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Favorites View ---
interface FavoritesProps {
  favorites: string[];
  allListings: Property[];
  assumptions: InvestmentAssumptions;
  onSelect: (property: Property) => void;
  onToggleFavorite: (id: string) => void;
}

export const FavoritesView: React.FC<FavoritesProps> = ({ 
  favorites, 
  allListings, 
  assumptions, 
  onSelect, 
  onToggleFavorite 
}) => {
  const favoriteListings = allListings.filter(p => favorites.includes(p.id));

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-3xl mb-6">
          <i className="far fa-heart"></i>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Favorites Yet</h3>
        <p className="text-gray-500 max-w-sm mb-8">
          Save properties you're interested in to compare them side-by-side and track their performance.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Properties ({favorites.length})</h2>
      <div className="space-y-6">
        {favoriteListings.map(property => (
          <ListingCard 
            key={property.id} 
            property={property} 
            assumptions={assumptions}
            onClick={() => onSelect(property)}
            isFavorite={true}
            onToggleFavorite={() => onToggleFavorite(property.id)}
          />
        ))}
        
        {favoriteListings.length < favorites.length && (
           <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-yellow-800 text-sm text-center">
             Note: Some favorites might not be displayed because they are not in the current loaded batch of mock data.
           </div>
        )}
      </div>
    </div>
  );
};

// --- Account View ---
interface AccountProps {
  user: User;
  onLogout: () => void;
}

export const AccountView: React.FC<AccountProps> = ({ user, onLogout }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
      
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-3xl font-bold">
          {user.name.charAt(0)}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
          <p className="text-gray-500">{user.email || 'Guest User'}</p>
          <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {user.isGuest ? 'Guest Account' : 'Verified Member'}
          </div>
        </div>
        <button onClick={onLogout} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
          Log Out
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Subscription */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
           <h3 className="font-bold text-lg mb-4 text-gray-900"><i className="fas fa-crown text-yellow-500 mr-2"></i> Subscription</h3>
           <div className="space-y-4">
             <div className="flex justify-between items-center pb-4 border-b border-gray-50">
               <span className="text-gray-600">Current Plan</span>
               <span className="font-bold text-gray-900">Pro Investor</span>
             </div>
             <div className="flex justify-between items-center pb-4 border-b border-gray-50">
               <span className="text-gray-600">Status</span>
               <span className="text-green-600 font-medium">Active</span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-gray-600">Next Billing</span>
               <span className="text-gray-900">Oct 24, 2024</span>
             </div>
             <button className="w-full py-2 mt-2 bg-brand-50 text-brand-700 font-bold rounded-lg hover:bg-brand-100 transition">
               Manage Subscription
             </button>
           </div>
        </div>

        {/* Investment Profile */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
           <h3 className="font-bold text-lg mb-4 text-gray-900"><i className="fas fa-sliders-h text-gray-400 mr-2"></i> Investment Profile</h3>
           {user.onboarding ? (
             <div className="space-y-4">
               <div>
                 <p className="text-xs text-gray-400 uppercase font-bold">Experience Level</p>
                 <p className="font-medium text-gray-900">{user.onboarding.investorType}</p>
               </div>
               <div>
                 <p className="text-xs text-gray-400 uppercase font-bold">Primary Goal</p>
                 <p className="font-medium text-gray-900">{user.onboarding.goal}</p>
               </div>
               <div>
                 <p className="text-xs text-gray-400 uppercase font-bold">Budget Range</p>
                 <p className="font-medium text-gray-900">{user.onboarding.budget}</p>
               </div>
               <button className="text-sm text-brand-600 font-medium hover:underline mt-2">Edit Preferences</button>
             </div>
           ) : (
             <div className="text-center py-6">
               <p className="text-gray-500 mb-4">No profile data set.</p>
               <button className="text-brand-600 font-bold">Take Quiz</button>
             </div>
           )}
        </div>
      </div>

       {/* General Settings */}
       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
         <h3 className="font-bold text-lg mb-4 text-gray-900">General Settings</h3>
         <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Get alerts for new listings matching your criteria.</p>
              </div>
              <button className="text-brand-600 text-2xl"><i className="fas fa-toggle-on"></i></button>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div>
                <p className="font-medium text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-500">Switch between light and dark themes.</p>
              </div>
               <button className="text-gray-400 text-2xl"><i className="fas fa-toggle-off"></i></button>
            </div>
         </div>
       </div>
    </div>
  );
};