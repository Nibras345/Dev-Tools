
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JSONFormatter from './pages/JSONFormatter';
import PasswordGenerator from './pages/PasswordGenerator';
import { Theme } from './types';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('devtoolkit-theme');
    return (saved as Theme) || 'light';
  });

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('devtoolkit-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
        <Navbar />
        <main className="container mx-auto px-4 py-12 max-w-5xl overflow-hidden">
          {/* Polished entrance animation keyed by pathname */}
          <div key={location.pathname} className="animate-slide-up opacity-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/json-formatter" element={<JSONFormatter />} />
              <Route path="/password-generator" element={<PasswordGenerator />} />
            </Routes>
          </div>
        </main>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
