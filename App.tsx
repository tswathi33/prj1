
import React, { useState, useEffect } from 'react';
import { UserRole } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Timetable from './components/Timetable';
import Attendance from './components/Attendance';
import Notices from './components/Notices';
import StudyMaterials from './components/StudyMaterials';
import CampusMap from './components/CampusMap';
import AIChatbot from './components/AIChatbot';
import AILab from './components/AILab';
import LoginPage from './components/LoginPage';
import BottomNav from './components/BottomNav';
import MobileDrawer from './components/MobileDrawer';
import ProfileSettings from './components/ProfileSettings';
import Tasks from './components/Tasks';
import JNTUHExplorer from './components/JNTUHExplorer';
import AcademicTools from './components/AcademicTools';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('dashboard');
  };

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) setIsDrawerOpen(true);
    else setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNewTask = () => {
    setCurrentView('tasks');
    setIsDrawerOpen(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard role={role} />;
      case 'ailab': return <AILab />;
      case 'jntuh': return <JNTUHExplorer />;
      case 'tools': return <AcademicTools />;
      case 'timetable': return <Timetable />;
      case 'attendance': return <Attendance />;
      case 'notices': return <Notices />;
      case 'materials': return <StudyMaterials />;
      case 'map': return <CampusMap />;
      case 'profile': return <ProfileSettings role={role} />;
      case 'tasks': return <Tasks />;
      case 'feedback': return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto text-center animate-fadeIn mt-4 md:mt-10">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-comment-dots text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Feedback & Grievance</h2>
          <p className="text-gray-500 mb-8">Submit your feedback or report an issue anonymously.</p>
          <div className="space-y-4 text-left">
            <input type="text" className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 outline-none" placeholder="Subject" />
            <textarea className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 outline-none min-h-[120px]" placeholder="Message"></textarea>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100">Submit</button>
          </div>
        </div>
      );
      default: return <Dashboard role={role} />;
    }
  };

  const getTitle = () => {
    const item = [
      { id: 'dashboard', label: 'Home' },
      { id: 'ailab', label: 'AI Innovation Lab' },
      { id: 'jntuh', label: 'JNTUH Academic Hub' },
      { id: 'tools', label: 'JNTUH Academic Tools' },
      { id: 'timetable', label: 'Academic Timetable' },
      { id: 'attendance', label: 'Attendance Management' },
      { id: 'notices', label: 'Notice Board' },
      { id: 'materials', label: 'Study Resources' },
      { id: 'map', label: 'Campus Map' },
      { id: 'profile', label: 'Profile Settings' },
      { id: 'tasks', label: 'Personal Tasks' },
    ].find(i => i.id === currentView);
    return item ? item.label : 'Companion';
  };

  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="flex h-screen bg-[#f0f4f9] font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} currentView={currentView} setCurrentView={setCurrentView} role={role} onNewTask={handleNewTask} />
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} role={role} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onNewTask={handleNewTask} />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header role={role} setRole={setRole} title={getTitle()} onToggleSidebar={toggleSidebar} onLogout={handleLogout} onNewTask={handleNewTask} setCurrentView={setCurrentView} />
        <div className="flex-1 overflow-y-auto px-4 md:px-12 py-4 md:py-6">
          <div className="max-w-6xl mx-auto pb-32 md:pb-24">
            {renderView()}
          </div>
        </div>
        <BottomNav currentView={currentView} setCurrentView={setCurrentView} role={role} />
      </main>
      <AIChatbot />
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;
