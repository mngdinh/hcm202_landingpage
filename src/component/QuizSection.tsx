// src/components/QuizSection.tsx
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  RefreshCw,
  BookOpen,
  RotateCw,
} from "lucide-react";
import { RevealOnScroll } from "./RevealOnScroll";
import type { QuizQuestion, QuizState } from "../types";

interface QuizSectionProps {
  currentQuestions: QuizQuestion[];
  quizState: QuizState;
  isSubmitted: boolean;
  isLoading?: boolean;
  onOptionSelect: (questionId: number, optionIndex: number) => void;
  onSubmit: () => void;
  onReset: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  currentQuestions,
  quizState,
  isSubmitted,
  isLoading = false,
  onOptionSelect,
  onSubmit,
  onReset,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // HIỆN LOADING ĐẸP KHI ĐANG TẢI
  if (isLoading || currentQuestions.length === 0) {
    return (
      <section id="quiz-section" className="bg-[#FFF8E7] py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block p-12 rounded-full bg-[#8B0000]/10 animate-pulse">
            <BookOpen className="w-20 h-20 text-[#D9A441]" />
          </div>
          <p className="mt-8 text-2xl font-bold text-[#8B0000]">
            Đang chuẩn bị câu hỏi...
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <div className="w-4 h-4 bg-[#D9A441] rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-[#D9A441] rounded-full animate-bounce delay-100"></div>
            <div className="w-4 h-4 bg-[#D9A441] rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </section>
    );
  }
  const currentQ = currentQuestions[currentIndex];
  const selectedOption = quizState[currentQ.id];
  const progress = ((currentIndex + 1) / currentQuestions.length) * 100;

  const goNext = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  const allAnswered = Object.keys(quizState).length === currentQuestions.length;

  return (
    <section
      id="quiz-section"
      className="bg-[#FFF8E7] py-24 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B0000]/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D9A441]/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <div className="inline-block p-4 rounded-full bg-[#8B0000]/30 mb-4">
              <BookOpen className="w-12 h-12 text-[#D9A441]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#8B0000]">
              Trắc Nghiệm Flashcard
            </h2>
          </div>
        </RevealOnScroll>
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between text-sm text-[#3E2B28] mb-2">
            <span>
              Câu {currentIndex + 1} / {currentQuestions.length}
            </span>
            <span>{Object.keys(quizState).length} đã trả lời</span>
          </div>
          <div className="w-full bg-[#F3E8DC] rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-[#D9A441] transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {/* Kết quả nổi bật sau khi nộp bài */}
        {isSubmitted && (
          <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
            <div className="inline-flex items-center gap-4 px-8 py-5 bg-white rounded-full shadow-2xl border-4 border-[#D9A441]">
              <div className="text-left">
                <p className="text-sm text-[#3E2B28] opacity-70">
                  Kết quả của bạn
                </p>
                <p className="text-4xl font-extrabold text-[#8B0000]">
                  {
                    currentQuestions.filter(
                      (q) => quizState[q.id] === q.correctAnswer
                    ).length
                  }
                  <span className="text-2xl text-[#3E2B28]">
                    {" "}
                    / {currentQuestions.length}
                  </span>
                </p>
              </div>
              <div className="text-6xl">
                {(() => {
                  const correctCount = currentQuestions.filter(
                    (q) => quizState[q.id] === q.correctAnswer
                  ).length;
                  const total = currentQuestions.length;
                  const ratio = (correctCount / total) * 100;

                  if (ratio === 100) {
                    return (
                      <span role="img" aria-label="excellent">
                        Excellent
                      </span>
                    );
                  } else if (ratio >= 70) {
                    return (
                      <span role="img" aria-label="perfect">
                        Perfect
                      </span>
                    );
                  } else if (ratio >= 50) {
                    return (
                      <span role="img" aria-label="great">
                        Great
                      </span>
                    );
                  } else if (ratio >= 30) {
                    return (
                      <span role="img" aria-label="good">
                        Good
                      </span>
                    );
                  } else {
                    return (
                      <span role="img" aria-label="bad">
                        Bad
                      </span>
                    );
                  }
                })()}
              </div>
            </div>
          </div>
        )}
        {/* Flashcard */}
        {/* Flashcard - ĐÃ FIX TRÀN CHỮ */}
        <RevealOnScroll delay={100}>
          <div className="relative w-full max-w-4xl mx-auto mb-12">
            {/* Container 3D */}
            <div
              className={`relative w-full h-[520px] md:h-[560px] preserve-3d transition-transform duration-700 ${
                isSubmitted ? "cursor-pointer" : "cursor-default"
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
              // Chỉ cho phép flip khi đã submit
              onClick={() => isSubmitted && setFlipped(!flipped)}
            >
              {/* Front - Question */}
              <div
                className="absolute inset-0 bg-white rounded-3xl shadow-2xl border-4 border-[#8B0000] flex flex-col p-6 md:p-10 overflow-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                {/* Số câu */}
                <div className="text-center mb-4 flex-shrink-0">
                  <span className="inline-block bg-[#8B0000] text-[#FFF7E6] px-6 py-3 rounded-full text-lg font-bold">
                    Câu {currentIndex + 1}
                  </span>
                </div>

                {/* Câu hỏi */}
                <div className="flex-shrink-0 mb-6">
                  <h3 className="text-xl md:text-xl lg:text-xl font-extrabold text-[#8B0000] text-center leading-snug md:leading-tight break-words hyphens-auto px-4">
                    {currentQ.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="flex-1 overflow-y-auto space-y-4">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect =
                      isSubmitted && idx === currentQ.correctAnswer;
                    const isWrong =
                      isSubmitted &&
                      isSelected &&
                      idx !== currentQ.correctAnswer;

                    return (
                      <div className="w-full">
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isSubmitted) onOptionSelect(currentQ.id, idx);
                          }}
                          disabled={isSubmitted}
                          className={`w-full p-3 rounded-xl box-border justify-center text-left text-base md:text-lg font-medium transition-all border-2
      ${
        isSelected
          ? "bg-[#8B0000] border-[#D9A441] text-white shadow-lg"
          : "bg-[#FFF7E6] border-[#D9A441]/50 text-[#8B0000]"
      }
      ${
        isSubmitted && isCorrect
          ? "border-green-500"
          : isSubmitted && isWrong
          ? "border-red-500"
          : ""
      }
    `}
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span className="flex-1 text-left break-words">
                              {option}
                            </span>

                            {/* Icon hiển thị khi nộp bài */}
                            {isSubmitted && isCorrect && (
                              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                            )}

                            {isSubmitted && isWrong && (
                              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                            )}

                            {/* Icon tick khi chọn nhưng chưa submit */}
                            {isSelected && !isSubmitted && (
                              <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
                            )}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Hint */}
                {!isSubmitted && (
                  <div className="text-center mt-4 flex-shrink-0">
                    <p className="text-sm text-[#8B0000]/70">
                      Vui lòng chọn đáp án và nhấn “Nộp bài” để xem giải thích
                    </p>
                  </div>
                )}
              </div>

              {/* Back - Explanation */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#8B0000] to-[#A52A2A] rounded-3xl shadow-2xl flex flex-col p-6 md:p-10 text-white overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                {/* Header */}
                <div className="text-center mb-4 flex-shrink-0">
                  <div className="inline-flex items-center gap-3">
                    {selectedOption === currentQ.correctAnswer ? (
                      <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-400" />
                    ) : (
                      <XCircle className="w-10 h-10 md:w-12 md:h-12 text-red-400" />
                    )}
                    <span className="text-xl md:text-2xl font-bold">
                      {selectedOption === currentQ.correctAnswer
                        ? "Đúng rồi!"
                        : "Chưa chính xác!"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-2">
                  <p className="text-lg md:text-xl font-semibold mb-4 text-yellow-300">
                    Đáp án đúng:
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl mb-6 bg-white/20 backdrop-blur-sm rounded-2xl p-5 text-center break-words">
                    {currentQ.options[currentQ.correctAnswer]}
                  </p>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 md:p-6">
                    <p className="text-base md:text-lg leading-relaxed text-balance">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-4 flex-shrink-0">
                  <p className="text-xs md:text-sm opacity-80">
                    Nhấn lại để quay về
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center max-w-3xl mx-auto">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-3 px-8 py-4 bg-[#8B0000] text-white rounded-full font-semibold hover:bg-[#6E0000] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
            Câu trước
          </button>

          {currentIndex === currentQuestions.length - 1 ? (
            <button
              onClick={onSubmit}
              disabled={!allAnswered}
              className="flex items-center gap-3 px-12 py-5 bg-[#D9A441] hover:bg-[#C9A030] text-[#8B0000] rounded-full font-bold text-xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              <CheckCircle className="w-7 h-7" />
              Nộp bài & Xem kết quả
            </button>
          ) : (
            <button
              onClick={goNext}
              className="flex items-center gap-3 px-8 py-4 bg-[#8B0000] text-white rounded-full font-semibold hover:bg-[#6E0000] transition-all"
            >
              Câu tiếp theo
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
        {/* Result (after submit) */}{" "}
        {isSubmitted && (
          <div className="mt-16 text-center">
            {" "}
            <div className="inline-block p-10 bg-white rounded-3xl shadow-2xl border-4 border-[#D9A441]">
              {" "}
              <h3 className="text-4xl font-bold text-[#8B0000] mb-4">
                {" "}
                Hoàn thành!{" "}
              </h3>{" "}
              <button
                onClick={onReset}
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#8B0000] hover:bg-[#6E0000] text-white font-bold rounded-full text-lg transition-all hover:scale-105"
              >
                {" "}
                <RefreshCw className="w-6 h-6" /> Làm lại từ đầu{" "}
              </button>{" "}
            </div>{" "}
          </div>
        )}
      </div>
    </section>
  );
};
