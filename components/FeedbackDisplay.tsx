
import React, { useEffect, useRef } from 'react';

// These are loaded from CDN in index.html
declare var marked: { parse: (markdown: string) => string; };
declare var DOMPurify: { sanitize: (html: string) => string; };


interface FeedbackDisplayProps {
  feedback: string;
  isLoading: boolean;
  error: string | null;
}

const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-slate-400">
    <svg className="animate-spin h-10 w-10 text-cyan-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="text-lg font-medium">Analyzing your code...</p>
    <p className="text-sm">Gemini is thinking. This might take a moment.</p>
  </div>
);

const WelcomeMessage: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h2 className="text-2xl font-bold text-slate-300">Code Review Feedback</h2>
        <p className="mt-2 max-w-md">
            Enter your code on the left, select the language, and click "Review Code" to get instant AI-powered feedback.
        </p>
    </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full text-center text-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 className="text-2xl font-bold text-red-300">An Error Occurred</h2>
        <p className="mt-2 max-w-md">{message}</p>
    </div>
);


export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback, isLoading, error }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && feedback && !isLoading) {
      const unsafeHtml = marked.parse(feedback);
      const safeHtml = DOMPurify.sanitize(unsafeHtml);
      contentRef.current.innerHTML = safeHtml;
    }
  }, [feedback, isLoading]);

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-y-auto p-4 lg:p-6 h-[calc(100vh-100px)] md:h-auto">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : feedback ? (
        <div 
          ref={contentRef}
          className="prose prose-sm prose-invert max-w-none prose-pre:bg-[#1e293b] prose-pre:border prose-pre:border-slate-600 prose-headings:text-slate-200 prose-a:text-cyan-400 prose-strong:text-slate-200"
        >
        </div>
      ) : (
        <WelcomeMessage />
      )}
    </div>
  );
};
