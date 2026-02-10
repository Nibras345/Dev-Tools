
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, title, className = "" }) => {
  return (
    <div className={`group bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800/80 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:border-slate-700 hover:-translate-y-2 ${className}`}>
      {title && (
        <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40">
          <h3 className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] text-[10px]">{title}</h3>
        </div>
      )}
      <div className="p-8">
        {children}
      </div>
    </div>
  );
};

export default Card;
