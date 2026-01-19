
import React, { useState } from 'react';
import { processAppointmentRequest, encodeFileToBase64 } from './services/geminiService';
import { PipelineResponse, StepStatus } from './types';
import InputSection from './components/InputSection';
import PipelineVisualizer from './components/PipelineVisualizer';
import ResultDisplay from './components/ResultDisplay';
import ExamplePrompts from './components/ExamplePrompts';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [pipelineData, setPipelineData] = useState<PipelineResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const resetDashboard = () => {
    setPipelineData(null);
    setError(null);
    setPreviewImage(null);
  };

  const handleProcessText = async (text: string) => {
    setLoading(true);
    setError(null);
    setPreviewImage(null);
    try {
      const now = new Date().toISOString().split('T')[0];
      const result = await processAppointmentRequest(text, now);
      setPipelineData(result);
    } catch (err) {
      console.error(err);
      setError('AI Processing failed. Ensure your prompt contains scheduling details.');
    } finally {
      setLoading(false);
    }
  };

  const handleProcessImage = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const base64 = await encodeFileToBase64(file);
      setPreviewImage(`data:${file.type};base64,${base64}`);
      const now = new Date().toISOString().split('T')[0];
      const result = await processAppointmentRequest({ base64, mimeType: file.type }, now);
      setPipelineData(result);
    } catch (err) {
      console.error(err);
      setError('Neural OCR failed to resolve text. Try a clearer image of your note.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 font-sans">
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-2.5 rounded-2xl shadow-lg shadow-indigo-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-slate-900">Scheduler<span className="text-indigo-600">AI</span></h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Neural Extraction v3.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {pipelineData && (
              <button 
                onClick={resetDashboard}
                className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors px-4 py-2"
              >
                New Scan
              </button>
            )}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
              <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping"></span>
              <span className="text-[10px] font-black uppercase tracking-wider">Neural Engine Live</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-8 pb-16">
        <div className="mb-10 text-center lg:text-left">
           <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Appointment Scheduler</h2>
           <ExamplePrompts onSelect={handleProcessText} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                <h2 className="text-xs font-black text-slate-800 uppercase tracking-[0.1em] flex items-center gap-3">
                  <span className="w-6 h-6 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-[10px] font-bold">01</span>
                  Input Terminal
                </h2>
              </div>
              <div className="p-8">
                <InputSection 
                  onTextSubmit={handleProcessText} 
                  onImageSubmit={handleProcessImage} 
                  isLoading={loading} 
                  previewImage={previewImage}
                />
              </div>
            </div>

            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/30">
                <h2 className="text-xs font-black text-slate-800 uppercase tracking-[0.1em] flex items-center gap-3">
                  <span className="w-6 h-6 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-[10px] font-bold">02</span>
                  Process Monitoring
                </h2>
              </div>
              <div className="p-8">
                <PipelineVisualizer 
                  data={pipelineData} 
                  status={loading ? StepStatus.PROCESSING : (pipelineData ? StepStatus.COMPLETED : StepStatus.IDLE)} 
                />
              </div>
            </div>

            {error && (
              <div className="p-6 bg-rose-50 border border-rose-100 text-rose-700 rounded-3xl text-sm font-bold flex gap-4 items-center animate-in slide-in-from-top duration-500">
                <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                {error}
              </div>
            )}
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 h-full flex flex-col min-h-[700px]">
              <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Structured Output</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Verification Ready</p>
                </div>
                {pipelineData && (
                   <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pipeline Health</span>
                     <span className="text-sm font-black text-indigo-600">STABLE</span>
                   </div>
                )}
              </div>
              
              <div className="flex-1 p-10">
                {pipelineData ? (
                  <ResultDisplay data={pipelineData} />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                    <div className="w-32 h-32 bg-slate-100 rounded-[40px] flex items-center justify-center mb-8 rotate-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-2">Awaiting Analysis</h3>
                    <p className="text-sm font-medium text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Submit a request to generate a verified appointment slip.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
