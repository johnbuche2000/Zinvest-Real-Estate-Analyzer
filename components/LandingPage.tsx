import React from 'react';

interface Props {
  onGetStarted: () => void;
  onLogin: () => void;
  onGuestAccess: () => void;
}

const LandingPage: React.FC<Props> = ({ onGetStarted, onLogin, onGuestAccess }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* Navigation */}
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4 absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center gap-2">
          <i className="fas fa-chart-line text-brand-600 text-3xl bg-white p-1 rounded-lg"></i>
          <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow-md">Z-Invest</span>
        </div>
        <div className="flex gap-4">
          <button onClick={onLogin} className="text-white hover:text-gray-100 font-medium drop-shadow-sm">Log In</button>
          <button onClick={onGetStarted} className="bg-brand-600 text-white px-5 py-2 rounded-full font-medium hover:bg-brand-700 transition shadow-lg border border-transparent">Sign Up</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-auto min-h-[600px] flex items-center justify-center overflow-hidden py-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80" 
            alt="Luxury Vacation Home" 
            className="w-full h-full object-cover"
          />
          {/* Darker overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mt-10">
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            🚀 The #1 Tool for Real Estate Investors
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-white mb-6 drop-shadow-lg">
            Find Your Next <br />
            <span className="text-brand-400">Cash Flow</span> Machine.
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto mb-10 drop-shadow-md font-medium">
            Analyze deals in seconds. Get real-time Cap Rate, ROI, and Expenses calculated instantly for every listing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onGetStarted} className="px-8 py-4 bg-brand-600 text-white text-lg font-bold rounded-lg shadow-xl hover:bg-brand-700 transition transform hover:-translate-y-1">
              Start Analyzing for Free
            </button>
            <button onClick={onGuestAccess} className="px-8 py-4 bg-white text-gray-900 text-lg font-bold rounded-lg shadow-xl hover:bg-gray-100 transition transform hover:-translate-y-1">
              Continue as Guest
            </button>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-white py-16 -mt-10 relative z-20 rounded-t-3xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Invest With Confidence</h2>
            <p className="text-gray-600 text-lg">We aggregate data from major listing services and overlay powerful financial modeling.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'fa-bolt', title: 'Instant Analysis', desc: 'Cap Rate, Cash-on-Cash, and Expenses calculated instantly for every listing.' },
              { icon: 'fa-search-location', title: 'Smart Filtering', desc: 'Filter by financial metrics, not just bedrooms and bathrooms.' },
              { icon: 'fa-file-invoice-dollar', title: 'Projections', desc: 'Visualize long-term equity buildup and appreciation potential.' }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center text-xl mb-6">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Serious Investors</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Jenkins", role: "House Flipper", img: "https://randomuser.me/api/portraits/women/44.jpg", text: "Z-Invest saved me from buying a money pit. The renovation estimator is spot on!" },
              { name: "Michael Ross", role: "Rental Portfolio Owner", img: "https://randomuser.me/api/portraits/men/32.jpg", text: "I used to spend hours on Excel. Now I scan 100 listings in 10 minutes. Game changer." },
              { name: "David Chen", role: "First Time Buyer", img: "https://randomuser.me/api/portraits/men/85.jpg", text: "The educational tooltips helped me understand what Cap Rate actually means. Highly recommend." }
            ].map((review, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{review.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{review.text}"</p>
                <div className="mt-auto pt-4 flex text-yellow-400 text-sm">
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold text-white">Z-Invest</span>
            <p className="text-sm mt-2">© 2024 Z-Invest Inc. Data sourced from Realtor.com</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;