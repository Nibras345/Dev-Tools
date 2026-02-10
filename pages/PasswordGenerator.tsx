
import React, { useState, useCallback, useEffect } from 'react';
import Card from '../components/Card';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState({ label: 'Strong', color: 'bg-green-500', shadow: 'shadow-green-500/40' });
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePassword = useCallback(() => {
    setIsGenerating(true);
    const sets = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    };

    let allowedChars = '';
    if (options.uppercase) allowedChars += sets.uppercase;
    if (options.lowercase) allowedChars += sets.lowercase;
    if (options.numbers) allowedChars += sets.numbers;
    if (options.symbols) allowedChars += sets.symbols;

    if (!allowedChars) {
      setPassword('Select at least one option');
      setIsGenerating(false);
      return;
    }

    let generated = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      generated += allowedChars.charAt(array[i] % allowedChars.length);
    }

    // Small delay to feel the "generation" work
    setTimeout(() => {
      setPassword(generated);
      setIsGenerating(false);
    }, 100);
  }, [length, options]);

  useEffect(() => {
    generatePassword();
  }, [length, options, generatePassword]);

  useEffect(() => {
    const enabledCount = Object.values(options).filter(Boolean).length;
    if (length < 8 || enabledCount < 2) {
      setStrength({ label: 'Weak', color: 'bg-red-500', shadow: 'shadow-red-500/40' });
    } else if (length < 12 || enabledCount < 3) {
      setStrength({ label: 'Medium', color: 'bg-yellow-500', shadow: 'shadow-yellow-500/40' });
    } else {
      setStrength({ label: 'Strong', color: 'bg-green-500', shadow: 'shadow-green-500/40' });
    }
  }, [length, options]);

  const copyToClipboard = () => {
    if (!password || password.startsWith('Select')) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggle = (key: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-xl mx-auto space-y-12 py-4">
      <div className="space-y-3">
        <h1 className="text-4xl font-extrabold flex items-center gap-4 group">
          <span className="text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 w-12 h-12 flex items-center justify-center rounded-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform">🔑</span>
          Password Lab
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Generate ultra-secure, random entropy for your accounts.</p>
      </div>

      <Card className="relative overflow-visible !p-10 border-2 border-indigo-500/5">
        <div className="space-y-10">
          {/* Output with pulse effect */}
          <div className="relative group">
            <div className={`w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] p-8 pr-16 min-h-[100px] flex items-center overflow-x-auto shadow-inner transition-all duration-300 ${isGenerating ? 'blur-[2px] scale-[0.99] opacity-70' : ''}`}>
              <span className={`font-mono text-2xl tracking-wider break-all leading-relaxed transition-all ${password.startsWith('Select') ? 'text-slate-300 italic text-lg' : 'text-slate-900 dark:text-slate-100'}`}>
                {password}
              </span>
            </div>
            
            <button
              onClick={copyToClipboard}
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-3.5 rounded-2xl transition-all shadow-xl hover:scale-110 active:scale-90 ${
                copied 
                  ? 'bg-green-500 text-white rotate-0' 
                  : 'bg-white dark:bg-slate-800 text-slate-500 hover:text-indigo-500 border border-slate-100 dark:border-slate-700'
              }`}
            >
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2" /></svg>
              )}
            </button>
            
            {copied && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-2 bg-green-500 text-white text-xs font-bold rounded-xl shadow-lg animate-bounce">
                COPIED!
              </div>
            )}
          </div>

          {/* Detailed Strength Bar */}
          <div className="space-y-4">
            <div className="flex justify-between items-end px-1">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Entropy Level</span>
                <div className={`text-xl font-black ${strength.label === 'Strong' ? 'text-green-500' : strength.label === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                  {strength.label}
                </div>
              </div>
              <div className="text-xs font-bold text-slate-300">EST. TIME TO CRACK: <span className="text-slate-600 dark:text-slate-400">CENTURIES</span></div>
            </div>
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full p-1 shadow-inner">
              <div 
                className={`h-full rounded-full transition-all duration-700 ease-out shadow-lg ${strength.color} ${strength.shadow}`} 
                style={{ width: strength.label === 'Strong' ? '100%' : strength.label === 'Medium' ? '60%' : '25%' }}
              />
            </div>
          </div>

          {/* Configuration */}
          <div className="grid grid-cols-1 gap-10">
            {/* Length Controls */}
            <div className="space-y-6">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Character Count</label>
                <span className="text-3xl font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-5 py-2 rounded-2xl animate-scale-in">
                  {length}
                </span>
              </div>
              <div className="relative h-2 flex items-center group">
                <input
                  type="range"
                  min="4"
                  max="64"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 transition-all hover:scale-y-125 focus:ring-0"
                />
              </div>
            </div>

            {/* Set Toggles */}
            <div className="grid grid-cols-2 gap-4">
              {(Object.keys(options) as Array<keyof typeof options>).map((key) => (
                <button
                  key={key}
                  onClick={() => handleToggle(key)}
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all group ${
                    options[key] 
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 scale-[1.02] shadow-lg shadow-indigo-500/5' 
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span className={`text-sm font-black capitalize transition-colors ${options[key] ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                      {key}
                    </span>
                    <span className="text-[10px] text-slate-400 group-hover:text-slate-500 transition-colors uppercase font-bold tracking-tighter">Include Set</span>
                  </div>
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${options[key] ? 'bg-indigo-500 border-indigo-500 scale-110' : 'border-slate-200 dark:border-slate-700'}`}>
                    {options[key] && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generatePassword}
            className={`w-full py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black text-lg rounded-[1.5rem] shadow-2xl shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-3 ${isGenerating ? 'animate-pulse' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isGenerating ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            REGENERATE ENTROPY
          </button>
        </div>
      </Card>

      <div className="bg-slate-50 dark:bg-slate-900/40 p-10 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800/50 flex flex-col md:flex-row items-center gap-8 animate-slide-up opacity-0 fill-mode-forwards delay-3">
        <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-xl shrink-0 group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500 group-hover:animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622l-1.382-3.016z" />
          </svg>
        </div>
        <div className="space-y-2 text-center md:text-left">
          <h4 className="text-xl font-black text-slate-800 dark:text-slate-200">Military-Grade Randomness</h4>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Powered by Web Crypto API. Your secrets are generated locally and never transmitted across the network. Private, secure, and fast.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
