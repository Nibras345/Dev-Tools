
import React, { useState } from 'react';
import Card from '../components/Card';

const JSONFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    setError(null);
    if (!input.trim()) {
      setOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (err: any) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
    }
  };

  const minifyJSON = () => {
    setError(null);
    if (!input.trim()) {
      setOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (err: any) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto py-4">
      <div className="space-y-3">
        <h1 className="text-4xl font-extrabold flex items-center gap-4 group">
          <span className="text-blue-500 bg-blue-50 dark:bg-blue-900/20 w-12 h-12 flex items-center justify-center rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform">{"{ }"}</span>
          JSON Formatter
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Instant validation and beautification for your data structures.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="!p-0 border-none shadow-none bg-transparent dark:bg-transparent">
          <div className="space-y-6">
            <div className="group relative">
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1 group-focus-within:text-blue-500 transition-colors">Input Raw Source</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-64 p-6 font-mono text-sm bg-white dark:bg-slate-900/80 border-2 border-slate-100 dark:border-slate-800 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none dark:text-slate-100 transition-all resize-none shadow-sm"
                placeholder="Paste your raw JSON payload here..."
              />
              <div className="absolute right-4 bottom-4 opacity-0 group-focus-within:opacity-100 transition-opacity text-[10px] font-bold text-slate-400">ESC to Blur</div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={formatJSON}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.05] active:scale-95 transition-all"
              >
                Format Prettify
              </button>
              <button
                onClick={minifyJSON}
                className="px-8 py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-2xl hover:scale-[1.05] active:scale-95 transition-all"
              >
                Minify Output
              </button>
              {output && (
                <button
                  onClick={copyToClipboard}
                  className={`px-8 py-3 font-bold rounded-2xl transition-all transform hover:scale-[1.05] active:scale-95 flex items-center gap-3 ${
                    copied 
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                      : 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/30'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${copied ? 'animate-bounce' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  {copied ? 'Copied to Clipboard' : 'Copy Formatted JSON'}
                </button>
              )}
              <button
                onClick={clear}
                className="px-8 py-3 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all font-bold rounded-2xl active:scale-95"
              >
                Clear All
              </button>
            </div>
          </div>
        </Card>

        {error && (
          <div className="p-5 bg-red-50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-900/30 rounded-3xl text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-4 animate-scale-in">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span>{error}</span>
          </div>
        )}

        <div className={`space-y-4 transition-all duration-500 ${output ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <div className="flex items-center justify-between px-2">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Formatted Output</label>
            <div className="h-[2px] grow mx-4 bg-slate-100 dark:bg-slate-800 rounded-full" />
            <div className="text-[10px] font-black text-indigo-500 uppercase tracking-tighter">Read Only</div>
          </div>
          <div className="relative group overflow-hidden rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 shadow-2xl shadow-indigo-500/5">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-blue-500/5 pointer-events-none" />
            <pre className="w-full min-h-[300px] p-8 font-mono text-sm bg-slate-50/50 dark:bg-slate-900/40 overflow-auto whitespace-pre-wrap dark:text-slate-100 shadow-inner scroll-smooth">
              {output}
            </pre>
            {output && (
              <button
                onClick={copyToClipboard}
                className="absolute top-4 right-4 p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 text-slate-500 hover:text-indigo-500 hover:scale-110 active:scale-90 transition-all"
                title="Copy Result"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONFormatter;
