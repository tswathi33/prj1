
import React from 'react';
import { UserRole } from '../types';

interface BottomNavProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  role: UserRole;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView, role }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: 'fa-house', roles: [UserRole.STUDENT, UserRole.FACULTY, UserRole.ADMIN] },
    { id: 'ailab', label: 'AI Lab', icon: 'fa-vial', roles: [UserRole.STUDENT, UserRole.FACULTY] },
    { id: 'notices', label: 'Notices', icon: 'fa-bullhorn', roles: [UserRole.STUDENT, UserRole.FACULTY, UserRole.ADMIN] },
    { id: 'map', label: 'Map', icon: 'fa-map-location-dot', roles: [UserRole.STUDENT, UserRole.FACULTY, UserRole.ADMIN] },
    { id: 'timetable', label: 'Plan', icon: 'fa-calendar-days', roles: [UserRole.STUDENT, UserRole.FACULTY] },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(role)).slice(0, 5);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-2 pb-safe pt-2 z-50 flex items-center justify-around shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
      {filteredItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setCurrentView(item.id)}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all duration-300 ${
            currentView === item.id 
              ? 'text-indigo-600' 
              : 'text-gray-400'
          }`}
        >
          <div className={`w-12 h-8 flex items-center justify-center rounded-full transition-colors ${
            currentView === item.id ? 'bg-indigo-50' : 'bg-transparent'
          }`}>
            <i className={`fas ${item.icon} text-lg`}></i>
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${
            currentView === item.id ? 'opacity-100' : 'opacity-60'
          }`}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
