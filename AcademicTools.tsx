
import React, { useState } from 'react';
import { JNTUH_REGULATIONS, JNTUH_GRADE_POINTS } from '../services/jntuhData';

const AcademicTools: React.FC = () => {
  const [tool, setTool] = useState<'gpa' | 'promotion'>('gpa');
  const [credits, setCredits] = useState<number>(0);
  const [selectedReg, setSelectedReg] = useState(JNTUH_REGULATIONS[0]);
  const [targetYear, setTargetYear] = useState<2 | 3 | 4>(2);

  const [gpaEntries, setGpaEntries] = useState([{ subject: '', credits: 3, grade: 'A' }]);

  const addGpaEntry = () => setGpaEntries([...gpaEntries, { subject: '', credits: 3, grade: 'A' }]);
  
  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    gpaEntries.forEach(e => {
      totalPoints += (JNTUH_GRADE_POINTS[e.grade] * e.credits);
      totalCredits += e.credits;
    });
    return (totalPoints / totalCredits).toFixed(2);
  };

  const checkPromotion = () => {
    // Basic logic based on R18/R22 credit requirements
    if (selectedReg.code === 'R18') {
      if (targetYear === 2) return credits >= 18 ? 'Eligible' : 'Not Eligible (Need 18)';
      if (targetYear === 3) return credits >= 47 ? 'Eligible' : 'Not Eligible (Need 47)';
      if (targetYear === 4) return credits >= 73 ? 'Eligible' : 'Not Eligible (Need 73)';
    } else {
      if (targetYear === 2) return credits >= 20 ? 'Eligible' : 'Not Eligible (Need 20)';
      if (targetYear === 3) return credits >= 48 ? 'Eligible' : 'Not Eligible (Need 48)';
      if (targetYear === 4) return credits >= 72 ? 'Eligible' : 'Not Eligible (Need 72)';
    }
    return 'Unknown';
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="flex gap-3 mb-8">
        <button 
          onClick={() => setTool('gpa')}
          className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${tool === 'gpa' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-400'}`}
        >
          GPA Calculator
        </button>
        <button 
          onClick={() => setTool('promotion')}
          className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${tool === 'promotion' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-400'}`}
        >
          Promotion Predictor
        </button>
      </div>

      {tool === 'gpa' ? (
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black text-gray-900">SGPA Calculator</h2>
              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">JNTUH Grade Point System</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase">Your SGPA</p>
              <p className="text-4xl font-black text-indigo-600">{calculateGPA()}</p>
            </div>
          </div>

          <div className="space-y-3">
            {gpaEntries.map((entry, idx) => (
              <div key={idx} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Subject Code</label>
                  <input 
                    type="text" 
                    placeholder="E.g. CS301PC"
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 outline-none"
                    value={entry.subject}
                    onChange={(e) => {
                      const newEntries = [...gpaEntries];
                      newEntries[idx].subject = e.target.value;
                      setGpaEntries(newEntries);
                    }}
                  />
                </div>
                <div className="w-24">
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Credits</label>
                  <select 
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 outline-none"
                    value={entry.credits}
                    onChange={(e) => {
                      const newEntries = [...gpaEntries];
                      newEntries[idx].credits = Number(e.target.value);
                      setGpaEntries(newEntries);
                    }}
                  >
                    {[1, 1.5, 2, 3, 4].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="w-24">
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Grade</label>
                  <select 
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 outline-none"
                    value={entry.grade}
                    onChange={(e) => {
                      const newEntries = [...gpaEntries];
                      newEntries[idx].grade = e.target.value;
                      setGpaEntries(newEntries);
                    }}
                  >
                    {Object.keys(JNTUH_GRADE_POINTS).map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={addGpaEntry}
            className="w-full border-2 border-dashed border-gray-100 text-gray-400 py-4 rounded-2xl font-bold text-sm hover:border-indigo-200 hover:text-indigo-500 transition-all"
          >
            <i className="fas fa-plus mr-2"></i> Add Subject
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Promotion Eligibility</h2>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">Check your credit progression</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">Regulation</label>
                <div className="flex gap-2">
                  {JNTUH_REGULATIONS.map(reg => (
                    <button 
                      key={reg.code}
                      onClick={() => setSelectedReg(reg)}
                      className={`flex-1 py-3 rounded-xl font-bold text-xs ${selectedReg.code === reg.code ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-50 text-gray-400'}`}
                    >
                      {reg.code}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">Target Year</label>
                <div className="flex gap-2">
                  {[2, 3, 4].map(y => (
                    <button 
                      key={y}
                      onClick={() => setTargetYear(y as any)}
                      className={`flex-1 py-3 rounded-xl font-bold text-xs ${targetYear === y ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-50 text-gray-400'}`}
                    >
                      Year {y}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">Total Credits Earned</label>
                <input 
                  type="number" 
                  value={credits}
                  onChange={(e) => setCredits(Number(e.target.value))}
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-4 outline-none font-bold text-lg"
                  placeholder="0"
                />
              </div>
            </div>

            <div className={`flex flex-col items-center justify-center p-8 rounded-[32px] text-center ${checkPromotion().includes('Not') ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                <i className={`fas ${checkPromotion().includes('Not') ? 'fa-triangle-exclamation text-rose-500' : 'fa-check-circle text-emerald-500'} text-2xl`}></i>
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-1">Status</h3>
              <p className="text-2xl font-black">{checkPromotion()}</p>
              <p className="text-[10px] mt-4 opacity-70 font-bold max-w-[200px]">
                {selectedReg.promotionRules[`toYear${targetYear}` as keyof typeof selectedReg.promotionRules]}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicTools;
