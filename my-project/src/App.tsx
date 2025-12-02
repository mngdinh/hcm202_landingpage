import React, { useState, useRef, useEffect } from 'react';
import { CONTENT_SECTIONS, QUIZ_QUESTIONS } from './data/constants';
import type { QuizState, QuizQuestion } from './types';
import { ChevronDown, CheckCircle, XCircle, Star, RefreshCw, BookOpen, Sun, Moon } from 'lucide-react';
import { ChatWidget } from './component/ChatWidget';

// --- Utility Component for Scroll Animations ---
const RevealOnScroll = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 } // Trigger when 15% of element is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [quizState, setQuizState] = useState<QuizState>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize random questions on mount
  useEffect(() => {
    loadRandomQuestions();
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

        {/* Hero Section */}
        <header className="relative bg-gradient-to-br from-red-800 to-red-900 dark:from-red-950 dark:to-slate-950 text-white py-24 px-6 md:px-12 overflow-hidden transition-colors duration-500">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <Star className="absolute top-10 left-10 w-24 h-24 text-yellow-400 animate-pulse-soft" />
            <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-20"></div>
          </div>

          <div className="max-w-5xl mx-auto relative z-10 text-center md:text-left">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 bg-red-950/30 px-4 py-2 rounded-full border border-red-400/30 mb-6 backdrop-blur-sm shadow-sm">
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                <span className="text-sm font-medium text-yellow-100 uppercase tracking-wide">Giáo trình Tư tưởng Hồ Chí Minh (2021)</span>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={100}>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-md">
                Vận dụng Tư tưởng <br/>
                <span className="text-yellow-400">Hồ Chí Minh</span>
              </h1>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200}>
              <p className="text-xl md:text-2xl text-red-100 mb-10 max-w-2xl font-light leading-relaxed">
                Độc lập dân tộc gắn liền với chủ nghĩa xã hội trong sự nghiệp cách mạng Việt Nam giai đoạn hiện nay.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <button 
                onClick={scrollToContent}
                className="group bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-2 mx-auto md:mx-0 active:scale-95 duration-200"
              >
                Bắt đầu tìm hiểu
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
              </button>
            </RevealOnScroll>
          </div>
        </header>

        {/* Main Content Sections */}
        <main ref={contentRef} className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealOnScroll>
              <div className="text-center mb-20">
                <h2 className="text-3xl font-bold text-red-800 dark:text-red-500 uppercase tracking-wider mb-3">4 Nội Dung Cốt Lõi</h2>
                <div className="w-24 h-1 bg-yellow-500 mx-auto rounded"></div>
              </div>
            </RevealOnScroll>

            <div className="space-y-32">
              {CONTENT_SECTIONS.map((section, index) => {
                const Icon = section.icon;
                const isEven = index % 2 === 0;

                return (
                  <RevealOnScroll key={section.id}>
                    <div className={`flex flex-col md:flex-row gap-12 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
                      {/* Icon/Visual Side */}
                      <div className="w-full md:w-1/2 flex justify-center">
                        <div className="relative group perspective-1000">
                          <div className="absolute inset-0 bg-red-200 dark:bg-red-900/30 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                          <div className="relative bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-300 transform group-hover:-translate-y-2">
                            <Icon className="w-24 h-24 text-red-700 dark:text-red-500 transition-colors duration-300" strokeWidth={1.5} />
                          </div>
                          {/* Badge */}
                          <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-red-900 font-bold px-4 py-2 rounded-lg shadow-md text-sm transform transition-transform group-hover:scale-110 duration-300">
                            Mục {section.id}
                          </div>
                        </div>
                      </div>

                      {/* Text Side */}
                      <div className="w-full md:w-1/2 md:px-2">
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-300">{section.title}</h3>
                        <p className="text-red-700 dark:text-red-400 font-medium mb-6 italic text-lg transition-colors duration-300">{section.subtitle}</p>
                        
                        <ul className="space-y-5">
                          {section.points.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-4 group">
                              <div className="mt-2 min-w-[8px] h-[8px] rounded-full bg-red-500 dark:bg-red-400 group-hover:scale-125 transition-transform duration-300"></div>
                              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg transition-colors duration-300">{point}</p>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8 inline-block bg-white dark:bg-slate-800 px-6 py-4 rounded-xl border-l-4 border-red-600 shadow-sm transition-colors duration-300">
                          <span className="font-semibold text-red-800 dark:text-red-400">Từ khóa: </span>
                          <span className="text-slate-700 dark:text-slate-200">{section.highlight}</span>
                        </div>
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </main>

        {/* Quiz Section */}
        <section id="quiz-section" className="bg-slate-900 dark:bg-black/40 py-24 text-white relative overflow-hidden transition-colors duration-500">
          {/* Abstract bg shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <div className="inline-block p-4 rounded-full bg-slate-800/50 mb-4">
                  <BookOpen className="w-10 h-10 text-yellow-500" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Trắc Nghiệm Kiến Thức</h2>
                <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                  Kiểm tra mức độ hiểu biết của bạn.
                  <br/>
                  <span className="text-yellow-400 text-sm">(Tổng hợp tất cả các câu hỏi)</span>
                </p>
              </div>
            </RevealOnScroll>

            <div className="space-y-10">
              {currentQuestions.map((q, index) => {
                const selectedOption = quizState[q.id];
                const isCorrect = isSubmitted && selectedOption === q.correctAnswer;
                const isWrong = isSubmitted && selectedOption !== undefined && selectedOption !== q.correctAnswer;

                return (
                  <RevealOnScroll key={q.id} delay={index * 50}>
                    <div 
                      className={`bg-slate-800/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 transition-all duration-300 transform hover:shadow-2xl ${
                        isSubmitted 
                          ? (isCorrect ? 'border-green-500 ring-1 ring-green-500/50' : isWrong ? 'border-red-500 ring-1 ring-red-500/50' : 'border-slate-700')
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <h4 className="text-xl font-semibold mb-8 flex gap-4">
                        <span className="bg-slate-700 text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        {q.question}
                      </h4>

                      <div className="space-y-3 pl-0 md:pl-12">
                        {q.options.map((option, optIndex) => {
                          // Determine styling based on state
                          let optionClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group relative overflow-hidden ";
                          
                          if (isSubmitted) {
                            if (optIndex === q.correctAnswer) {
                              optionClass += "border-green-500 bg-green-900/30 text-green-200 font-medium";
                            } else if (selectedOption === optIndex) {
                              optionClass += "border-red-500 bg-red-900/30 text-red-200";
                            } else {
                              optionClass += "border-transparent bg-slate-900/50 text-slate-500 opacity-50";
                            }
                          } else {
                            optionClass += selectedOption === optIndex 
                              ? "bg-red-700 border-red-600 text-white shadow-lg scale-[1.01]" 
                              : "bg-slate-700/30 border-transparent hover:bg-slate-700 hover:border-slate-600 text-slate-300 hover:text-white";
                          }

                          return (
                            <button
                              key={optIndex}
                              onClick={() => handleOptionSelect(q.id, optIndex)}
                              disabled={isSubmitted}
                              className={optionClass}
                            >
                              <span className="relative z-10">{option}</span>
                              {isSubmitted && optIndex === q.correctAnswer && <CheckCircle className="w-5 h-5 text-green-400 relative z-10 animate-fade-in" />}
                              {isSubmitted && selectedOption === optIndex && optIndex !== q.correctAnswer && <XCircle className="w-5 h-5 text-red-400 relative z-10 animate-fade-in" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Block with animation */}
                      {isSubmitted && (
                        <div className={`mt-6 ml-0 md:ml-12 p-5 rounded-xl text-sm border-l-4 animate-fade-in ${isCorrect ? 'bg-green-900/20 text-green-300 border-green-500' : 'bg-red-900/20 text-red-200 border-red-500'}`}>
                          <div className="flex items-start gap-2">
                             <div className="mt-0.5"><BookOpen className="w-4 h-4" /></div>
                             <div>
                               <span className="font-bold uppercase tracking-wider text-xs block mb-1 opacity-70">Giải thích</span>
                               {q.explanation}
                             </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>

            <div className="mt-16 text-center">
              {!isSubmitted ? (
                <button 
                  onClick={() => setIsSubmitted(true)}
                  disabled={Object.keys(quizState).length < currentQuestions.length}
                  className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-red-900 font-bold py-4 px-12 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-yellow-500/20 text-lg flex items-center gap-2 mx-auto"
                >
                  <CheckCircle className="w-5 h-5" />
                  Hoàn thành & Xem kết quả
                </button>
              ) : (
                <div className="animate-fade-in p-8 bg-slate-800/50 backdrop-blur-md rounded-3xl border border-slate-700 inline-block shadow-2xl">
                  <p className="text-xl text-slate-300 mb-2">Kết quả của bạn</p>
                  <p className="text-4xl md:text-5xl font-bold mb-8 text-white">
                     <span className={calculateScore() === currentQuestions.length ? "text-green-400" : "text-yellow-400"}>{calculateScore()}</span>
                     <span className="text-slate-500 text-3xl"> / {currentQuestions.length}</span>
                  </p>
                  <button 
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-8 rounded-full transition-all hover:ring-2 hover:ring-slate-500"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Làm lại bài thi (Sắp xếp lại)
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

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