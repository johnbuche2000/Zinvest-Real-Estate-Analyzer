import React from 'react';

export type Tab = 'search' | 'favorites' | 'buy' | 'sell' | 'tutorials' | 'settings';

interface Props {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
  isGuest: boolean;
}

const Navigation: React.FC<Props> = ({ activeTab, onChange, isGuest }) => {
  
  const items: { id: Tab; label: string; icon: string; gated?: boolean }[] = [
    { id: 'search', label: 'Search', icon: 'fa-search' },
    { id: 'favorites', label: 'Favorites', icon: 'fa-heart', gated: true },
    { id: 'buy', label: 'Buy', icon: 'fa-home' },
    { id: 'sell', label: 'Sell', icon: 'fa-sign' },
    { id: 'tutorials', label: 'Learn', icon: 'fa-graduation-cap' },
    { id: 'settings', label: 'Account', icon: 'fa-user' },
  ];

  const NavButton = ({ item, isMobile }: any) => {
    const isActive = activeTab === item.id;
    return (
      <button
        onClick={() => onChange(item.id)}
        className={`
          flex items-center transition-all duration-200
          ${isMobile 
            ? 'flex-col justify-center py-2 px-1 text-xs' 
            : 'w-full px-4 py-3 gap-3 rounded-lg text-sm font-medium mb-1'
          }
          ${isActive 
            ? 'text-brand-600 bg-brand-50' 
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }
        `}
      >
        <div className="relative">
          <i className={`fas ${item.icon} ${isMobile ? 'text-xl mb-1' : 'text-lg w-6 text-center'}`}></i>
          {item.gated && isGuest && (
            <div className="absolute -top-1 -right-2 w-2 h-2 bg-gray-400 rounded-full border border-white"></div>
          )}
        </div>
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-30 pt-20 px-4">
        <div className="flex-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">Menu</p>
          {items.map(item => <NavButton key={item.id} item={item} isMobile={false} />)}
        </div>
        
        {!isGuest && (
           <div className="mb-8 p-4 bg-brand-50 rounded-xl">
             <p className="text-xs font-bold text-brand-800 mb-1">Pro Member</p>
             <p className="text-xs text-brand-600">You have full access.</p>
           </div>
        )}
      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 pb-safe">
        <div className="grid grid-cols-6 h-16">
          {items.map(item => <NavButton key={item.id} item={item} isMobile={true} />)}
        </div>
      </nav>
    </>
  );
};

export default Navigation;