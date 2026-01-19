
import React from 'react';
import { PipelineResponse, StepStatus } from '../types';

interface Props {
  data: PipelineResponse | null;
  status: StepStatus;
}

const PipelineVisualizer: React.FC<Props> = ({ data, status }) => {
  const steps = [
    { id: 1, name: 'OCR', desc: 'Scan Input' },
    { id: 2, name: 'Entities', desc: 'Named Extr.' },
    { id: 3, name: 'Normalize', desc: 'ISO Mapper' },
    { id: 4, name: 'Validate', desc: 'Guardrails' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start relative px-4">
        {/* Dynamic Connecting Line */}
        <div className="absolute top-[22px] left-12 right-12 h-0.5 bg-slate-100 -z-0"></div>
        {status !== StepStatus.IDLE && (
          <div 
            className={`absolute top-[22px] left-12 h-0.5 bg-indigo-500 -z-0 transition-all duration-700 ease-out`}
            style={{ width: status === StepStatus.PROCESSING ? '25%' : 'calc(100% - 96px)' }}
          ></div>
        )}

        {steps.map((step, idx) => {
          const isDone = !!data;
          const isCurrent = status === StepStatus.PROCESSING && idx === 0; // Simplified for visual flow
          
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div className={`
                w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500
                ${isDone 
                  ? 'bg-indigo-600 shadow-lg shadow-indigo-100 text-white' 
                  : (isCurrent 
                      ? 'bg-white border-2 border-indigo-500 text-indigo-600 animate-pulse shadow-md' 
                      : 'bg-white border border-slate-200 text-slate-300')}
              `}>
                {isDone ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-xs font-black">{step.id}</span>
                )}
              </div>
              <div className="mt-3 text-center">
                <p className={`text-[11px] font-black leading-none uppercase tracking-tighter ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>{step.name}</p>
                <p className="text-[9px] text-slate-400 font-bold mt-1 tracking-tight">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">System Status</p>
           <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${status === StepStatus.PROCESSING ? 'bg-amber-400 animate-pulse' : (data ? 'bg-green-500' : 'bg-slate-300')}`}></div>
              <span className="text-xs font-bold text-slate-700">{status === StepStatus.PROCESSING ? 'Extracting...' : (data ? 'Success' : 'Ready')}</span>
           </div>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Reliability</p>
           <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">{data ? `${(data.step1_ocr.confidence * 100).toFixed(0)}%` : '--'}</span>
              <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: data ? `${data.step1_ocr.confidence * 100}%` : '0%' }}></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineVisualizer;
