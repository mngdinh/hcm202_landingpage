import React, { useState, useRef, useEffect } from 'react';
import { CONTENT_SECTIONS, QUIZ_QUESTIONS } from './data/constants';
import type { QuizState, QuizQuestion } from './types';
import { ChevronDown, CheckCircle, XCircle, Star, RefreshCw, BookOpen, Sun, Moon } from 'lucide-react';
import { ChatWidget } from './component/ChatWidget';
import { Header } from './component/Header';
import { RevealOnScroll } from './component/RevealOnScroll';
import { MainContent } from './component/MainContent';
import { QuizSection } from './component/QuizSection';

// --- Utility Component for Scroll Animations ---


const App: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [quizState, setQuizState] = useState<QuizState>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize random questions on mount
  useEffect(() => {
    loadRandomQuestions();
    setIsLoadingQuestions(false);
  }, []);

  const loadRandomQuestions = () => {
    // Shuffle all questions but keep all of them (do not slice)
    const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffled);
    setQuizState({});
    setIsSubmitted(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setQuizState(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    currentQuestions.forEach(q => {
      if (quizState[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    loadRandomQuestions();
    // Scroll back to top of quiz section (optional, but good UX)
    const quizSection = document.getElementById('quiz-section');
    quizSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // Outer wrapper handles the 'dark' class for Tailwind
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans relative">
        
        {/* Chat Widget */}
        <ChatWidget />

        {/* Theme Toggle Button - Fixed */}
        <button
          onClick={toggleTheme}
          className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-yellow-400 hover:scale-110 transition-all duration-300"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>

        <Header onScrollToContent={scrollToContent} />

        {/* Main Content Sections */}
        <MainContent ref={contentRef} />

        {/* Quiz Section */}
        <QuizSection
          currentQuestions={currentQuestions}
          quizState={quizState}
          isSubmitted={isSubmitted}
          isLoading={isLoadingQuestions}
          onOptionSelect={handleOptionSelect}
          onSubmit={() => setIsSubmitted(true)}
          onReset={handleReset}
        />

        {/* Footer */}
        <footer className="bg-slate-950 py-10 px-6 text-center border-t border-slate-800 transition-colors duration-500">
          <p className="text-slate-400 text-sm">
            Nội dung dựa trên <strong className="text-slate-200">Giáo trình Tư tưởng Hồ Chí Minh (2021)</strong>.
          </p>
          <div className="flex justify-center gap-4 mt-4">
             <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
          </div>
          <p className="text-slate-600 text-xs mt-4">
            Designed for educational purposes.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;