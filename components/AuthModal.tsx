import React, { useState } from 'react';
import { User } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<Props> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({
        id: 'u-123',
        name: name || email.split('@')[0],
        email,
        isGuest: false,
        favorites: []
      });
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <i className="fas fa-times text-xl"></i>
        </button>
        
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-gray-500 text-sm mt-1">{isLogin ? 'Login to access your saved properties' : 'Join thousands of investors today'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  required 
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input 
                type="email" 
                required 
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                required 
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition flex justify-center items-center"
            >
              {isLoading ? (
                <i className="fas fa-circle-notch fa-spin"></i>
              ) : (
                isLogin ? 'Log In' : 'Sign Up Free'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-brand-600 font-bold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;