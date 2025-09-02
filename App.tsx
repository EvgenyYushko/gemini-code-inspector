
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { FeedbackDisplay } from './components/FeedbackDisplay';
import { reviewCode } from './services/geminiService';
import { PROGRAMMING_LANGUAGES } from './constants';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('function greet(name) {\n  return "Hello, " + name;\n}');
  const [language, setLanguage] = useState<string>(PROGRAMMING_LANGUAGES[0].value);
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setFeedback('');
    try {
      const result = await reviewCode(code, language);
      setFeedback(result);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to get code review. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col">
      <Header />
      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 p-4 lg:p-6">
        <CodeInput
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          onReview={handleReview}
          isLoading={isLoading}
        />
        <FeedbackDisplay
          feedback={feedback}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default App;
