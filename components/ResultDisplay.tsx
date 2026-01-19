
import React from 'react';
import { PipelineResponse } from '../types';

interface Props {
  data: PipelineResponse;
}

const ResultDisplay: React.FC<Props> = ({ data }) => {
  const isOk = data.step4_final.status === 'ok';
  const appointment = data.step4_final.appointment;
  
  const copyData = () => {
    const textToCopy = isOk 
      ? JSON.stringify(appointment, null, 2)
      : data.step4_final.message;
    navigator.clipboard.writeText(textToCopy || '');
    alert('Appointment details copied.');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Step 1: Input Recognition */}
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">01. Neural OCR Recognition</h3>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">PASSED</span>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-slate-600 italic leading-relaxed shadow-inner">
          "{data.step1_ocr.raw_text}"
        </div>
      </div>

      {/* Step 2 & 3: Visual Analytics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Extracted Department</p>
           <p className="text-sm font-bold text-slate-800">{data.step2_entities.department || 'General'}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Temporal Confidence</p>
           <div className="flex items-center gap-2">
             <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: `${data.step3_normalization.confidence * 100}%` }}></div>
             </div>
             <span className="text-[10px] font-bold text-indigo-600">{(data.step3_normalization.confidence * 100).toFixed(0)}%</span>
           </div>
        </div>
      </div>

      {/* Step 4: THE REAL APPOINTMENT SLIP */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">04. Appointment Confirmation</h3>
          <button onClick={copyData} className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
             </svg>
             COPY SLIP
          </button>
        </div>

        {isOk && appointment ? (
          <div className="relative bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-indigo-100/50 overflow-hidden animate-in zoom-in-95 duration-700">
            {/* Ticket Header */}
            <div className="bg-indigo-600 px-8 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Verified Booking</span>
              </div>
              <span className="text-[10px] font-bold text-indigo-200">REF: #{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
            </div>

            {/* Ticket Body */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Service Type</label>
                  <p className="text-lg font-black text-slate-900 tracking-tight">{appointment.department}</p>
                </div>
                <div className="text-right">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Location</label>
                  <p className="text-sm font-bold text-slate-700">Main Facility, Sector 4</p>
                </div>
              </div>

              {/* Perforated Line Effect */}
              <div className="relative py-2">
                <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 w-4 h-8 bg-[#fcfcfd] border-r border-slate-200 rounded-r-full"></div>
                <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-4 h-8 bg-[#fcfcfd] border-l border-slate-200 rounded-l-full"></div>
                <div className="w-full border-t border-dashed border-slate-200"></div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Scheduled Date</label>
                    <p className="text-base font-black text-slate-900">{new Date(appointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Time Slot</label>
                    <p className="text-base font-black text-slate-900">{appointment.time} <span className="text-[10px] text-slate-400 font-bold ml-1">IST</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Footer */}
            <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                ))}
                <div className="text-[10px] font-bold text-slate-400 ml-4 flex items-center">+ Authorized Personnel Only</div>
              </div>
              <div className="bg-white p-1 rounded-md border border-slate-200">
                <svg className="w-8 h-8 opacity-40" viewBox="0 0 24 24">
                   <rect x="2" y="2" width="4" height="4" fill="currentColor"/>
                   <rect x="8" y="2" width="4" height="4" fill="currentColor"/>
                   <rect x="2" y="8" width="4" height="4" fill="currentColor"/>
                   <rect x="8" y="8" width="4" height="4" fill="currentColor"/>
                   <rect x="5" y="5" width="4" height="4" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 border-2 border-dashed border-amber-200 rounded-[32px] p-10 flex flex-col items-center text-center">
             <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
             </div>
             <h4 className="text-lg font-black text-amber-900 mb-2">Ambiguity Detected</h4>
             <p className="text-sm font-medium text-amber-800 leading-relaxed mb-6">
                {data.step4_final.message || "We couldn't finalize this slip because some temporal details were missing."}
             </p>
             <div className="flex gap-2">
                {['Date', 'Time', 'Specialist'].map(tag => (
                  <span key={tag} className="text-[10px] font-black px-3 py-1 bg-white rounded-full border border-amber-200 text-amber-600">
                    {tag}
                  </span>
                ))}
             </div>
          </div>
        )}

        {isOk && (
           <div className="flex gap-4">
             <button className="flex-1 h-14 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all">
               Confirm & Sync
             </button>
             <button className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
               </svg>
             </button>
           </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;
