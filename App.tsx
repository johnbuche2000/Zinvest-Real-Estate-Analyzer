import React, { useState, useEffect, useMemo } from 'react';
import { Property, FilterState, InvestmentAssumptions, User, OnboardingData } from './types';
import { DEFAULT_ASSUMPTIONS, DEFAULT_FILTERS } from './constants';
import { fetchListings } from './services/listingService';

// Components
import ListingCard from './components/ListingCard';
import FilterPanel from './components/FilterPanel';
import AssumptionsModal from './components/AssumptionsModal';
import PropertyDetail from './components/PropertyDetail';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import Navigation, { Tab } from './components/Navigation';
import AuthModal from './components/AuthModal';
import MapView from './components/MapView';
import { BuyView, SellView, LearnView, FavoritesView, AccountView } from './components/TabViews';

type ViewState = 'landing' | 'onboarding' | 'app';
type SearchMode = 'list' | 'map';

const App: React.FC = () => {
  // Application State
  const [view, setView] = useState<ViewState>('landing');
  const [activeTab, setActiveTab] = useState<Tab>('search');
  const [user, setUser] = useState<User | null>(null);

  // UI State
  const [showFilters, setShowFilters] = useState(false);
  const [searchMode, setSearchMode] = useState<SearchMode>('list');

  // Data State
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [assumptions, setAssumptions] = useState<InvestmentAssumptions>(DEFAULT_ASSUMPTIONS);
  
  const [isAssumptionsModalOpen, setIsAssumptionsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Initial Data Load when entering app view
  useEffect(() => {
    if (view === 'app') {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const loadData = async (pageNum = 1) => {
    setLoading(true);
    try {
      const newData = await fetchListings(pageNum);
      if (newData.length === 0) setHasMore(false);
      
      setListings(prev => pageNum === 1 ? newData : [...prev, ...newData]);
      setPage(pageNum);
    } catch (error) {
      console.error("Failed to load listings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    loadData(page + 1);
  };

  // Auth Handlers
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setView('app');
  };

  const handleGuestAccess = (onboardingData?: OnboardingData) => {
    setUser({
      id: 'guest',
      name: 'Guest',
      email: '',
      isGuest: true,
      onboarding: onboardingData,
      favorites: []
    });
    setView('app');
  };

  const handleOnboardingComplete = (data: OnboardingData, userDetails: { name: string, email: string }) => {
    setUser({
      id: `u-${Date.now()}`,
      name: userDetails.name,
      email: userDetails.email,
      isGuest: false,
      onboarding: data,
      favorites: []
    });
    setView('app');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
    setActiveTab('search');
    // Optional: Reset other states if needed
  };

  const handleTabChange = (tab: Tab) => {
    if ((tab === 'favorites' || tab === 'settings') && user?.isGuest) {
      setIsAuthModalOpen(true);
      return;
    }
    setActiveTab(tab);
  };

  const handleToggleFavorite = (propertyId: string) => {
    if (!user || user.isGuest) {
      setIsAuthModalOpen(true);
      return;
    }

    const isFav = user.favorites.includes(propertyId);
    const newFavorites = isFav 
      ? user.favorites.filter(id => id !== propertyId)
      : [...user.favorites, propertyId];
    
    setUser({ ...user, favorites: newFavorites });
  };

  // Filter Logic
  const filteredListings = useMemo(() => {
    return listings.filter(p => {
      const matchPrice = p.price >= filters.priceMin && p.price <= filters.priceMax;
      const matchBeds = p.specs.bedrooms >= filters.bedsMin;
      const matchBaths = p.specs.bathrooms >= filters.bathsMin;
      const matchType = filters.propertyType === 'Any' || p.specs.type === filters.propertyType;
      const matchKey = filters.keywords === '' || 
                       p.details.description.toLowerCase().includes(filters.keywords.toLowerCase()) || 
                       p.address.city.toLowerCase().includes(filters.keywords.toLowerCase());
      const matchZip = filters.zipCode === '' || p.address.zipCode.includes(filters.zipCode);
      
      return matchPrice && matchBeds && matchBaths && matchType && matchKey && matchZip;
    });
  }, [listings, filters]);


  // Render Views
  if (view === 'landing') {
    return (
      <>
        <LandingPage 
          onGetStarted={() => setView('onboarding')}
          onLogin={() => setIsAuthModalOpen(true)}
          onGuestAccess={() => handleGuestAccess()}
        />
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          onLogin={handleLogin}
        />
      </>
    );
  }

  if (view === 'onboarding') {
    return (
      <Onboarding 
        onComplete={handleOnboardingComplete}
        onSkip={handleGuestAccess}
      />
    );
  }

  // Main App Layout
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation 
        activeTab={activeTab} 
        onChange={handleTabChange} 
        isGuest={user?.isGuest || false} 
      />

      {/* Mobile Top Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 h-14 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <i className="fas fa-chart-line text-brand-600 text-xl"></i>
            <h1 className="text-lg font-bold text-gray-900">Z-Invest</h1>
          </div>
          {activeTab === 'search' && (
             <div className="flex gap-2">
               <button onClick={() => setSearchMode(searchMode === 'list' ? 'map' : 'list')} className="text-gray-600 p-2">
                 <i className={`fas ${searchMode === 'list' ? 'fa-map' : 'fa-list'}`}></i>
               </button>
               <button onClick={() => setShowFilters(!showFilters)} className="text-gray-600 p-2">
                 <i className="fas fa-filter"></i>
               </button>
             </div>
          )}
        </div>
      </header>
      
      {/* Desktop Header */}
      <header className="hidden lg:flex pl-64 bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl w-full mx-auto px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800 capitalize">
              {activeTab === 'search' ? `Properties in ${filters.zipCode || 'All Areas'}` : activeTab}
            </h2>
            
            {/* View Toggle */}
            {activeTab === 'search' && (
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button 
                  onClick={() => setSearchMode('list')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition ${searchMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  List
                </button>
                <button 
                  onClick={() => setSearchMode('map')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition ${searchMode === 'map' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Map
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {activeTab === 'search' && (
              <>
                 <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${showFilters ? 'bg-brand-50 text-brand-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <i className="fas fa-filter"></i>
                  <span>Filters</span>
                </button>
                <button 
                  onClick={() => setIsAssumptionsModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition"
                >
                  <i className="fas fa-sliders-h"></i>
                  <span>Assumptions</span>
                </button>
              </>
            )}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-sm">
                {user?.name.charAt(0)}
              </div>
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-64 w-full px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-6 relative">
        <div className="max-w-7xl mx-auto h-full">
          
          {activeTab === 'search' && (
            <div className="flex flex-col lg:flex-row gap-8 items-start relative h-full">
              
              {/* Collapsible Sidebar Filters */}
              {showFilters && (
                <aside className="w-full lg:w-80 flex-shrink-0 animate-fade-in-up absolute lg:relative z-30 lg:z-auto">
                   <div className="lg:sticky lg:top-24">
                     <FilterPanel 
                       filters={filters} 
                       onChange={setFilters} 
                       onClose={() => setShowFilters(false)}
                     />
                   </div>
                </aside>
              )}

              {/* Feed or Map */}
              <section className="flex-1 w-full transition-all duration-300">
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-gray-500 text-sm">Found {filteredListings.length} properties</p>
                  <p className="text-xs text-gray-400 hidden sm:block">Sourced from Realtor.com</p>
                </div>

                {searchMode === 'list' ? (
                  <div className="space-y-6">
                    {filteredListings.map(property => (
                      <ListingCard 
                        key={property.id} 
                        property={property} 
                        assumptions={assumptions}
                        onClick={() => setSelectedProperty(property)}
                        isFavorite={user?.favorites.includes(property.id)}
                        onToggleFavorite={() => handleToggleFavorite(property.id)}
                      />
                    ))}

                    {filteredListings.length === 0 && !loading && (
                      <div className="text-center py-20 text-gray-400 bg-white rounded-xl border border-dashed border-gray-300">
                        <i className="fas fa-search text-4xl mb-3"></i>
                        <p>No listings match your criteria.</p>
                      </div>
                    )}

                    {loading && (
                      <div className="flex justify-center py-12">
                         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600"></div>
                      </div>
                    )}

                    {!loading && hasMore && filteredListings.length > 0 && (
                      <button 
                        onClick={handleLoadMore}
                        className="w-full py-4 bg-white text-gray-600 font-medium rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        Load More Listings
                      </button>
                    )}
                  </div>
                ) : (
                  <MapView 
                    listings={filteredListings}
                    assumptions={assumptions}
                    onSelectProperty={setSelectedProperty}
                  />
                )}
              </section>
            </div>
          )}

          {activeTab === 'favorites' && user && (
            <FavoritesView 
              favorites={user.favorites}
              allListings={listings} // In real app, fetch by ID
              assumptions={assumptions}
              onSelect={setSelectedProperty}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {activeTab === 'buy' && <BuyView />}
          
          {activeTab === 'sell' && <SellView />}
          
          {activeTab === 'tutorials' && <LearnView />}

          {/* Account Settings View */}
          {activeTab === 'settings' && user && (
            <AccountView user={user} onLogout={handleLogout} />
          )}

        </div>
      </main>

      {/* Modals */}
      <AssumptionsModal 
        isOpen={isAssumptionsModalOpen} 
        onClose={() => setIsAssumptionsModalOpen(false)}
        assumptions={assumptions}
        onSave={setAssumptions}
      />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin}
      />

      {selectedProperty && (
        <PropertyDetail 
          property={selectedProperty}
          assumptions={assumptions}
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
          isFavorite={user?.favorites.includes(selectedProperty.id) || false}
          onToggleFavorite={() => handleToggleFavorite(selectedProperty.id)}
        />
      )}
    </div>
  );
};

export default App;