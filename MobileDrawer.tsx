
import React from 'react';
import { UserRole } from '../types';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  role: UserRole;
  onNewTask?: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, currentView, setCurrentView, role, onNewTask }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line', roles: [UserRole.STUDENT, UserRole.FACULTY, UserRole.ADMIN] },
    { id: 'ailab', label: 'AI Innovation Lab', icon: 'fa-vial', roles: [UserRole.STUDENT, UserRole.FACULTY] },
    { id: 'timetable', label: 'Timetable', icon: 'fa-calendar-alt', roles: [UserRole.STUDENT, UserRole.FACULTY] },
    { id: 'tasks', label: 'Personal Tasks', icon: 'fa-clipboard-list', roles: [UserRole.STUDENT, UserRole.FACULTY] },
    { id: 'attendance', label: 'Attendance', icon: 'fa-user-check', roles: [UserRole.STUDENT, UserRole.FACULTY] },
    { id: 'notices', label: 'Notices', icon: 'fa-bullhorn', roles: [UserRole.STUDENT, UserRole.FACULTY, UserRole.ADMIN] },
    { id: 'materials', label: 'Study Resources', icon: 'fa-book-open', roles: [UserRole.STUDENT, UserRole.FACULTY] },
    { id: 'map', label: 'Campus Map', icon: 'fa-map-marked-alt', roles: [UserRole.STUDENT, UserRole.FACULTY, UserRole.ADMIN] },
    { id: 'profile', label: 'Settings', icon: 'fa-cog', roles: [UserRole.STUDENT, UserRole.FACULTY, UserRole.ADMIN] },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 left-0 bottom-0 w-[280px] bg-[#f8fafd] z-[101] transition-transform duration-300 ease-out flex flex-col shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 pt-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <span className="font-black text-xl text-indigo-900 tracking-tighter">Companion</span>
        </div>

        <div className="px-4 mb-4">
          <button 
            onClick={onNewTask}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
          >
            <i className="fas fa-plus"></i>
            Quick Task
          </button>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navItems
            .filter(item => item.roles.includes(role))
            .map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                  currentView === item.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 font-bold' 
                    : 'text-gray-500 hover:bg-white hover:text-indigo-600'
                }`}
              >
                <i className={`fas ${item.icon} text-lg w-6`}></i>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
        </nav>

        <div className="p-6 border-t border-gray-100">
          <div 
            onClick={() => { setCurrentView('profile'); onClose(); }}
            className="bg-white p-4 rounded-[24px] border border-gray-50 flex items-center gap-3 active:scale-95 transition-transform"
          >
             <div className="w-10 h-10 rounded-full overflow-hidden border border-indigo-100">
               <img 
                src={`https://picsum.photos/seed/${role}/100/100`} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
             </div>
             <div className="overflow-hidden">
               <p className="text-xs font-black text-gray-900 truncate">Alex Thompson</p>
               <p className="text-[10px] text-gray-400 font-bold uppercase">{role} Account</p>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
