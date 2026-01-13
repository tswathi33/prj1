
import React, { useState } from 'react';
import { UserRole } from '../types';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.STUDENT);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mocking an API call
    setTimeout(() => {
      onLogin(selectedRole);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-indigo-950 flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Visual Side */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-900 relative p-12 flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-800 rounded-full -mr-24 -mt-24 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full -ml-32 -mb-32 opacity-30 blur-3xl"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white p-3 rounded-2xl shadow-xl">
            <i className="fas fa-graduation-cap text-indigo-900 text-3xl"></i>
          </div>
          <span className="text-white font-black text-2xl tracking-tighter">College Companion</span>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-black text-white leading-tight mb-6">
            Everything you need <br /> for your academic <br /> success.
          </h1>
          <p className="text-indigo-200 text-lg max-w-md">
            The ultimate digital assistant for students, faculty, and administrators. Manage your schedule, attendance, and more.
          </p>
        </div>

        <div className="relative z-10 flex gap-4">
           <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <p className="text-white font-bold text-2xl">84%</p>
              <p className="text-indigo-300 text-xs">Avg Attendance</p>
           </div>
           <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <p className="text-white font-bold text-2xl">1.2k</p>
              <p className="text-indigo-300 text-xs">Active Students</p>
           </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 bg-white flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="md:hidden flex items-center justify-center gap-2 mb-12">
             <i className="fas fa-graduation-cap text-indigo-600 text-3xl"></i>
             <span className="font-black text-2xl">Companion</span>
          </div>
          
          <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-10 font-medium">Please enter your details to sign in</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Your Role</label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-2xl">
                {Object.values(UserRole).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                      selectedRole === role 
                        ? 'bg-white text-indigo-600 shadow-md' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <i className="far fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@university.edu"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 transition-all text-gray-700 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-bold text-indigo-600 hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 transition-all text-gray-700 font-medium"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isLoading ? (
                <i className="fas fa-circle-notch animate-spin"></i>
              ) : (
                <>
                  Sign In
                  <i className="fas fa-arrow-right text-sm"></i>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
