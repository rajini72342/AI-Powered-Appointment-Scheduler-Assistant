
import React from 'react';

const EXAMPLES = [
  { label: 'General', text: 'Book dentist next Friday at 3pm' },
  { label: 'Specialist', text: 'Need a cardiologist checkup tomorrow afternoon around 4' },
  { label: 'HR/Meeting', text: 'Schedule annual review with HR for Monday morning at 9' },
  { label: 'Follow-up', text: 'Follow up lab test for Wednesday Nov 12 at 11:30 am' },
];

interface Props {
  onSelect: (text: string) => void;
}

const ExamplePrompts: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Try these:</span>
      {EXAMPLES.map((ex, i) => (
        <button
          key={i}
          onClick={() => onSelect(ex.text)}
          className="text-xs font-semibold px-4 py-2 bg-white border border-slate-200 rounded-full hover:border-indigo-300 hover:text-indigo-600 hover:shadow-sm hover:shadow-indigo-50 transition-all active:scale-95"
        >
          {ex.label}
        </button>
      ))}
    </div>
  );
};

export default ExamplePrompts;
