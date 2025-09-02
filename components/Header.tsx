
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm border-b border-slate-700 p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        <div>
            <h1 className="text-xl font-bold text-slate-100">Gemini Code Inspector</h1>
            <p className="text-sm text-slate-400">Your AI-powered code review assistant</p>
        </div>
      </div>
    </header>
  );
};
