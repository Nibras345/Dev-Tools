
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../App';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'JSON Formatter', path: '/json-formatter' },
    { name: 'Password Gen', path: '/password-generator' },
  ];

  const activeClass = "text-indigo-600 dark:text-indigo-400 font-semibold scale-105";
  const inactiveClass = "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all";

  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo with animation */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 group-hover:rotate-6 group-hover:scale-110 transition-transform">
              D
            </div>
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 group-hover:tracking-wider transition-all">
              DevToolkit
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `relative px-1 py-2 ${isActive ? activeClass : inactiveClass}`}
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full animate-scale-in" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:ring-2 hover:ring-indigo-500 hover:bg-white dark:hover:bg-slate-700 hover:scale-110 transition-all active:scale-90"
              aria-label="Toggle Theme"
            >
              <div className="transition-transform duration-500 rotate-0 dark:rotate-[360deg]">
                {theme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                )}
              </div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 active:scale-90 transition-transform"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {isOpen ? <path d="M18 6 6 18M6 6l12 12"/> : <path d="M4 12h16M4 6h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown with animation */}
      <div className={`md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-64 py-4' : 'max-h-0 py-0 opacity-0'}`}>
        <div className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `block px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
