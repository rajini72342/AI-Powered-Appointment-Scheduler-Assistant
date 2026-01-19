
import React, { useState, useRef } from 'react';

interface Props {
  onTextSubmit: (text: string) => void;
  onImageSubmit: (file: File) => void;
  isLoading: boolean;
  previewImage: string | null;
}

const InputSection: React.FC<Props> = ({ onTextSubmit, onImageSubmit, isLoading, previewImage }) => {
  const [text, setText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onTextSubmit(text);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageSubmit(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSubmit(file);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative group">
          <textarea
            className="w-full h-36 p-5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none text-sm font-medium leading-relaxed placeholder:text-slate-300"
            placeholder="Describe the appointment: 'Book heart specialist for next Monday morning 10am'..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-3">
            {text.length > 0 && (
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                {text.length} chars
              </span>
            )}
            <button
              type="submit"
              disabled={isLoading || !text.trim()}
              className="bg-indigo-600 text-white h-10 px-6 rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0 disabled:bg-slate-200 disabled:shadow-none disabled:translate-y-0 transition-all flex items-center gap-2"
            >
              {isLoading ? (
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : 'Process'}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </form>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-slate-100"></div>
        <span className="text-[10px] font-black text-slate-300 tracking-[0.3em]">IMAGE ANALYTICS</span>
        <div className="flex-1 h-px bg-slate-100"></div>
      </div>

      <div 
        onClick={() => !isLoading && fileInputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
          relative cursor-pointer group min-h-[140px] rounded-2xl border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center p-4
          ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200'}
          ${isLoading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        {previewImage ? (
          <div className="absolute inset-0 z-0">
            <img src={previewImage} alt="Preview" className="w-full h-full object-cover opacity-20 blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
          </div>
        ) : null}

        <div className="relative z-10 flex flex-col items-center gap-2 text-center">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${previewImage ? 'bg-white/20 text-white' : 'bg-white shadow-sm text-slate-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className={previewImage ? 'text-white' : 'text-slate-500'}>
            <p className="text-sm font-bold">{previewImage ? 'Replace Image' : 'Drop note image here'}</p>
            <p className="text-[10px] font-medium opacity-60">Handwritten, Printed, or Scanned</p>
          </div>
        </div>

        {isLoading && previewImage && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div className="h-full bg-indigo-400 animate-[loading_1.5s_infinite]"></div>
          </div>
        )}
      </div>
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default InputSection;
