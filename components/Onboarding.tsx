import React, { useState } from 'react';
import { OnboardingData } from '../types';

interface Props {
  onComplete: (data: OnboardingData, userDetails: { name: string; email: string }) => void;
  onSkip: (data?: OnboardingData) => void;
}

const Onboarding: React.FC<Props> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    investorType: 'Beginner',
    goal: 'Cash Flow',
    budget: '$50k - $200k'
  });

  // Sign Up State
  const [signUpForm, setSignUpForm] = useState({ name: '', email: '', password: '' });
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningUp(true);
    // Simulate API delay
    setTimeout(() => {
      onComplete(data, { name: signUpForm.name, email: signUpForm.email });
    }, 1000);
  };

  const handleGoogleSignUp = () => {
    setIsSigningUp(true);
    // Simulate OAuth popup and redirect
    setTimeout(() => {
      onComplete(data, { name: 'Google User', email: 'user@gmail.com' });
    }, 1500);
  };

  const updateData = (key: keyof OnboardingData, val: string) => {
    setData({ ...data, [key]: val });
  };

  const OptionButton = ({ selected, onClick, label, icon }: any) => (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
        selected 
          ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm' 
          : 'border-gray-200 hover:border-brand-200 hover:bg-gray-50 text-gray-700'
      }`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
        selected ? 'bg-brand-200 text-brand-700' : 'bg-gray-100 text-gray-500'
      }`}>
        <i className={`fas ${icon}`}></i>
      </div>
      <span className="font-bold text-lg">{label}</span>
      {selected && <i className="fas fa-check-circle ml-auto text-brand-600 text-xl"></i>}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 w-full">
          <div 
            className="h-full bg-brand-600 transition-all duration-300 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Step {step} of 4</span>
            <button 
              onClick={() => onSkip(data)} 
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Skip
            </button>
          </div>

          {step === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-3xl font-extrabold text-gray-900">What is your experience level?</h2>
              <p className="text-gray-500">This helps us tailor the educational content to your needs.</p>
              <div className="space-y-3">
                <OptionButton 
                  label="Beginner" 
                  icon="fa-seedling"
                  selected={data.investorType === 'Beginner'}
                  onClick={() => updateData('investorType', 'Beginner')}
                />
                <OptionButton 
                  label="Intermediate" 
                  icon="fa-chart-line"
                  selected={data.investorType === 'Intermediate'}
                  onClick={() => updateData('investorType', 'Intermediate')}
                />
                <OptionButton 
                  label="Pro / Institutional" 
                  icon="fa-building"
                  selected={data.investorType === 'Pro'}
                  onClick={() => updateData('investorType', 'Pro')}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-3xl font-extrabold text-gray-900">What is your primary goal?</h2>
              <p className="text-gray-500">We'll prioritize metrics that match your strategy.</p>
              <div className="space-y-3">
                <OptionButton 
                  label="Monthly Cash Flow" 
                  icon="fa-money-bill-wave"
                  selected={data.goal === 'Cash Flow'}
                  onClick={() => updateData('goal', 'Cash Flow')}
                />
                <OptionButton 
                  label="Long-term Appreciation" 
                  icon="fa-piggy-bank"
                  selected={data.goal === 'Appreciation'}
                  onClick={() => updateData('goal', 'Appreciation')}
                />
                <OptionButton 
                  label="Fix & Flip" 
                  icon="fa-hammer"
                  selected={data.goal === 'Fix & Flip'}
                  onClick={() => updateData('goal', 'Fix & Flip')}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-3xl font-extrabold text-gray-900">Estimated Investment Budget?</h2>
              <p className="text-gray-500">We'll help you find properties you can actually afford.</p>
              <div className="space-y-3">
                <OptionButton 
                  label="Under $50k" 
                  icon="fa-wallet"
                  selected={data.budget === '<$50k'}
                  onClick={() => updateData('budget', '<$50k')}
                />
                <OptionButton 
                  label="$50k - $200k" 
                  icon="fa-coins"
                  selected={data.budget === '$50k - $200k'}
                  onClick={() => updateData('budget', '$50k - $200k')}
                />
                <OptionButton 
                  label="$200k+" 
                  icon="fa-landmark"
                  selected={data.budget === '$200k+'}
                  onClick={() => updateData('budget', '$200k+')}
                />
              </div>
            </div>
          )}

          {/* Step 4: Account Creation */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create your account</h2>
                <p className="text-gray-500">Save your preferences and access advanced analytics.</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleGoogleSignUp}
                  disabled={isSigningUp}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors bg-white text-gray-700 font-medium"
                >
                  {isSigningUp ? (
                    <i className="fas fa-circle-notch fa-spin text-gray-400"></i>
                  ) : (
                    <>
                      <i className="fab fa-google text-red-500 text-lg"></i>
                      <span>Sign up with Google</span>
                    </>
                  )}
                </button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or sign up with email</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <form onSubmit={handleSignUpSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                      value={signUpForm.name}
                      onChange={e => setSignUpForm({ ...signUpForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                      value={signUpForm.email}
                      onChange={e => setSignUpForm({ ...signUpForm, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                      value={signUpForm.password}
                      onChange={e => setSignUpForm({ ...signUpForm, password: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSigningUp}
                    className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg shadow-md transition-colors flex justify-center items-center"
                  >
                    {isSigningUp ? <i className="fas fa-circle-notch fa-spin"></i> : 'Create Account'}
                  </button>
                </form>
              </div>

              <div className="text-center pt-2">
                 <button onClick={() => onSkip(data)} className="text-sm text-gray-500 hover:text-gray-900 underline">
                   Continue as Guest
                 </button>
              </div>
            </div>
          )}

          {step < 4 && (
            <div className="mt-10 pt-6 border-t">
              <button 
                onClick={handleNext}
                className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg shadow-lg transition transform active:scale-95"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;