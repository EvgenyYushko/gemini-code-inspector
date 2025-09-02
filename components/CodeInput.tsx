
import React from 'react';
import { PROGRAMMING_LANGUAGES } from '../constants';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  onReview: () => void;
  isLoading: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, language, setLanguage, onReview, isLoading }) => {
  return (
    <div className="flex flex-col bg-slate-800 rounded-lg border border-slate-700 overflow-hidden h-[calc(100vh-100px)] md:h-auto">
      <div className="flex items-center justify-between p-3 bg-slate-800 border-b border-slate-700">
        <span className="text-sm font-semibold text-slate-300">Your Code</span>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-slate-700 text-slate-200 text-sm rounded-md border-slate-600 focus:ring-cyan-500 focus:border-cyan-500 py-1 px-2"
        >
          {PROGRAMMING_LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        className="flex-grow w-full p-4 bg-[#1e293b] text-slate-200 font-mono text-sm resize-none focus:outline-none placeholder-slate-500"
        spellCheck="false"
      />
      <div className="p-3 bg-slate-800 border-t border-slate-700">
        <button
          onClick={onReview}
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Review Code'
          )}
        </button>
      </div>
    </div>
  );
};
