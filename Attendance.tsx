
import React from 'react';
import { MOCK_ATTENDANCE } from '../constants';

const Attendance: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Attendance Tracker</h2>
            <p className="text-gray-500 text-sm">Target: Maintain &gt; 75% for exam eligibility</p>
          </div>
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl border border-green-100 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <i className="fas fa-check-circle"></i>
            </div>
            <span className="font-bold">Eligible for Exams</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_ATTENDANCE.map(item => (
            <div key={item.subject} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-indigo-200 transition-colors">
              <h3 className="font-bold text-gray-800 mb-3 truncate">{item.subject}</h3>
              <div className="flex items-end justify-between mb-4">
                <span className="text-3xl font-black text-indigo-600">{item.percentage}%</span>
                <span className="text-xs text-gray-400 font-medium">{item.attended}/{item.total} lectures</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    item.percentage >= 75 ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-800">Detailed Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Subject</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Period</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">May {10-i}, 2024</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">Advanced Mathematics</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Period {i}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Present</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
