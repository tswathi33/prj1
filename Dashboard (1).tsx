
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { UserRole } from '../types';
import { MOCK_ATTENDANCE } from '../constants';

const attendanceData = [
  { name: 'Mon', hours: 4 },
  { name: 'Tue', hours: 6 },
  { name: 'Wed', hours: 3 },
  { name: 'Thu', hours: 5 },
  { name: 'Fri', hours: 2 },
];

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

const Dashboard: React.FC<{ role: UserRole }> = ({ role }) => {
  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-normal text-[#1f1f1f] mb-1 md:mb-2">
            Hello, <span className="text-indigo-600 font-medium">Alex</span>
          </h2>
          <p className="text-[#444746] text-sm md:text-lg">Your academic summary is ready.</p>
        </div>
        <div className="bg-indigo-600 text-white p-4 rounded-3xl flex items-center gap-4 shadow-xl shadow-indigo-100">
           <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
             <i className="fas fa-clock"></i>
           </div>
           <div>
             <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Next Class</p>
             <p className="text-sm font-bold">Data Structures • 10:00 AM</p>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { icon: 'fa-percentage', label: 'Attendance', value: '84.5%', color: 'indigo', trend: '+2%' },
          { icon: 'fa-book', label: 'Materials', value: '12 Files', color: 'emerald', trend: '3 New' },
          { icon: 'fa-bell', label: 'Notices', value: '5 Today', color: 'amber', trend: null },
          { icon: 'fa-tasks', label: 'Pending', value: '4 Items', color: 'rose', trend: 'Due' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 md:p-6 rounded-3xl hover:bg-[#f8fafd] transition-all cursor-default group active:scale-95 touch-manipulation">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className={`p-2 md:p-3 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl md:rounded-2xl`}>
                <i className={`fas ${stat.icon} text-sm md:text-lg`}></i>
              </div>
              {stat.trend && <span className="text-[8px] md:text-[10px] font-bold bg-gray-50 text-gray-500 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full uppercase tracking-tighter">{stat.trend}</span>}
            </div>
            <h3 className="text-[#444746] text-[10px] md:text-sm font-medium">{stat.label}</h3>
            <p className="text-lg md:text-2xl font-semibold text-[#1f1f1f] mt-0.5 md:mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* JNTUH Quick Links Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-indigo-600 transition-all">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                 <i className="fas fa-external-link-alt"></i>
               </div>
               <div>
                 <h4 className="font-bold text-gray-900">Official Result Portal</h4>
                 <p className="text-xs text-gray-400 font-medium">results.jntuh.ac.in</p>
               </div>
            </div>
            <i className="fas fa-arrow-right text-gray-300 group-hover:text-indigo-600 transition-colors"></i>
         </div>
         <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-amber-600 transition-all">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                 <i className="fas fa-file-invoice"></i>
               </div>
               <div>
                 <h4 className="font-bold text-gray-900">Exam Fee Payment</h4>
                 <p className="text-xs text-gray-400 font-medium">JNTUH Student Service</p>
               </div>
            </div>
            <i className="fas fa-arrow-right text-gray-300 group-hover:text-amber-600 transition-colors"></i>
         </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[32px] overflow-hidden">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h3 className="font-bold text-[#1f1f1f] text-sm md:text-base">Weekly Engagement</h3>
            <div className="text-[10px] font-bold text-gray-400 uppercase">Mon - Fri</div>
          </div>
          <div className="h-56 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#4f46e5" fillOpacity={1} fill="url(#colorHours)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[32px] flex flex-col">
          <h3 className="font-bold text-[#1f1f1f] mb-4 md:mb-6 text-sm md:text-base">Attendance Mix</h3>
          <div className="flex-1 min-h-[180px] md:min-h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_ATTENDANCE}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={8}
                  dataKey="percentage"
                >
                  {MOCK_ATTENDANCE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl md:text-2xl font-bold text-[#1f1f1f]">78%</span>
              <span className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase">Average</span>
            </div>
          </div>
          <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
            {MOCK_ATTENDANCE.slice(0, 3).map((item, idx) => (
              <div key={item.subject} className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                  <span className="text-[10px] md:text-xs font-medium text-[#444746] truncate">{item.subject}</span>
                </div>
                <span className="text-[10px] md:text-xs font-bold text-[#1f1f1f]">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
