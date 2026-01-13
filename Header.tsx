
import React from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  title: string;
  onToggleSidebar: () => void;
  onLogout: () => void;
  onNewTask?: () => void;
  setCurrentView: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ role, setRole, title, onLogout, onToggleSidebar, onNewTask, setCurrentView }) => {
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-transparent sticky top-0 z-10">
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={onToggleSidebar}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#dde3ea] transition-colors"
        >
          <i className="fas fa-bars text-[#444746]"></i>
        </button>
        <h1 className="text-base md:text-lg font-medium text-[#444746] animate-fadeIn truncate max-w-[150px] md:max-w-none">
          {title}
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Quick Action Button */}
        <button 
          onClick={onNewTask}
          className="hidden sm:flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
        >
          <i className="fas fa-plus"></i>
          New Task
        </button>

        {/* Role switcher simplified for mobile */}
        <div className="hidden lg:flex items-center gap-2 bg-[#e9eef6] rounded-full p-1 border border-transparent hover:border-gray-200 transition-all">
          {Object.values(UserRole).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-4 py-1.5 rounded-full text-xs transition-all font-bold ${
                role === r ? 'bg-white shadow-sm text-indigo-600' : 'text-[#444746] hover:text-gray-900'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onLogout}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[#444746] hover:bg-[#dde3ea] transition-colors"
            title="Sign Out"
          >
            <i className="fas fa-right-from-bracket text-sm md:text-base"></i>
          </button>
          <button 
            onClick={() => setCurrentView('profile')}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white shadow-sm hover:ring-2 hover:ring-indigo-100 transition-all active:scale-90"
          >
            <img 
              src={`https://picsum.photos/seed/${role}/100/100`} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
