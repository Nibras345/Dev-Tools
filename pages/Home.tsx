
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Home: React.FC = () => {
  const tools = [
    {
      title: "JSON Formatter",
      description: "Clean up and validate your messy JSON code with syntax highlighting and deep nesting support.",
      icon: "{}",
      path: "/json-formatter",
      color: "from-blue-500 to-indigo-500",
      delay: "delay-1"
    },
    {
      title: "Password Generator",
      description: "Generate cryptographically secure passwords with custom requirements for length and character sets.",
      icon: "🔑",
      path: "/password-generator",
      color: "from-purple-500 to-pink-500",
      delay: "delay-2"
    }
  ];

  return (
    <div className="space-y-16 py-8">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-block px-4 py-1.5 mb-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-wide animate-scale-in">
          v1.2 Toolkit Lite
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight animate-slide-up">
          Crafting tools for <span className="animate-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500">developers</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-2xl font-light leading-relaxed animate-slide-up delay-1 opacity-0 fill-mode-forwards">
          Minimalist utilities designed for maximum productivity. Purely client-side, purely private.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {tools.map((tool) => (
          <Link key={tool.path} to={tool.path} className={`group animate-scale-in opacity-0 ${tool.delay} fill-mode-forwards`}>
            <Card className="h-full border-2 border-transparent hover:border-indigo-500/20">
              <div className="flex flex-col h-full space-y-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg transform group-hover:rotate-12 transition-transform`}>
                  {tool.icon}
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{tool.title}</h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
                    {tool.description}
                  </p>
                </div>
                <div className="pt-4 mt-auto flex items-center text-sm font-bold text-indigo-500 group-hover:translate-x-2 transition-transform">
                  Explore Tool
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-32 pt-16 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 space-y-4 animate-slide-up delay-3 opacity-0 fill-mode-forwards">
        <div className="flex justify-center space-x-6 opacity-60">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 animate-float" />
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 animate-float delay-1" />
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 animate-float delay-2" />
        </div>
        <p className="text-sm font-medium tracking-widest uppercase">Privacy First. No Servers. Just Code.</p>
        <p className="text-xs opacity-50">© 2024 DevToolkit • Designed with Precision</p>
      </div>
    </div>
  );
};

export default Home;
