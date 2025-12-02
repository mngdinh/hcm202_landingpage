// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

// Import ảnh (đặt trong public/images hoặc src/assets)
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';

interface Slide {
  title: string;
  highlight: string;
  subtitle: string;
  badge?: string;
  bgImage: string;
}

const slides: Slide[] = [
  {
    title: "Vận dụng Tư tưởng Hồ Chí Minh",
    highlight: "Hồ Chí Minh",
    subtitle: "trong thời kỳ mới",
    badge: "Giáo trình Tư tưởng Hồ Chí Minh (2021)",
    bgImage: image1,
  },
  {
    title: "Độc lập dân tộc gắn liền với",
    highlight: "Chủ nghĩa xã hội",
    subtitle: "Hai nhiệm vụ chiến lược có quan hệ biện chứng, bổ sung lẫn nhau",
    bgImage: image2,
  },
  {
    title: "Con đường cách mạng Việt Nam",
    highlight: "là tất yếu lịch sử",
    subtitle: "Chỉ có CNXH mới mang lại độc lập thực sự và hạnh phúc cho nhân dân",
    bgImage: image1,
  },
  {
    title: "Học tập và làm theo tư tưởng,",
    highlight: "đạo đức, phong cách Hồ Chí Minh",
    subtitle: "Xây dựng Đảng trong sạch vững mạnh, cán bộ đảng viên gương mẫu",
    bgImage: image2,
  },
];

interface HeaderProps {
  onScrollToContent: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToContent }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (!isPlaying) return;
    timeoutRef.current = setInterval(nextSlide, 6000);
    return () => clearInterval(timeoutRef.current!);
  }, [isPlaying, currentSlide]);

  return (
    <header
      className="relative h-screen min-h-[600px] overflow-hidden"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        index !== currentSlide && (
          <div
            key={index}
            className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-1500"
          >
            {/* Background + overlay (không cần nội dung vì bị ẩn) */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-black/50 to-red-950/80" />
          </div>
        )
      ))}

      {/* Slide hiện tại - luôn render CUỐI để nằm TRÊN CÙNG */}
      {slides[currentSlide] && (
        <div className="absolute inset-0 opacity-100 pointer-events-auto z-10 transition-all duration-1500">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-12000 ease-linear"
            style={{ backgroundImage: `url(${slides[currentSlide].bgImage})` }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3E2723]/90 via-[#5D4037]/50 to-[#6D4C41]/80" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg ...%3E')] opacity-20" />

          {/* Content - chỉ hiện ở slide hiện tại */}
          <div className="relative h-full flex items-center px-6 z-20">
            <div className="max-w-6xl mx-auto md:text-left">
              <RevealOnScroll delay={200}>
                <div className="space-y-8">
                  {slides[currentSlide].badge && (
                    <div className="inline-flex items-center gap-3 bg-red-950/70 px-6 py-3 rounded-full border border-yellow-500/40 backdrop-blur-md shadow-2xl">
                      <span className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></span>
                      <span className="text-yellow-100 font-semibold tracking-wider uppercase text-sm">
                        {slides[currentSlide].badge}
                      </span>
                    </div>
                  )}

                  <h1 className="text-xl md:text-6xl lg:text-6xl font-extrabold leading-tight">
                    {slides[currentSlide].title}
                    <br />
                    <span className="text-yellow-400 drop-shadow-2xl">{slides[currentSlide].highlight}</span>
                  </h1>

                  <p className="text-lg md:text-xl lg:text-2xl text-yellow-100/90 font-medium max-w-4xl mx-auto md:mx-0 leading-relaxed">
                    {slides[currentSlide].subtitle}
                  </p>

                  <button
                    onClick={onScrollToContent}
                    className="group mt-10 bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold text-lg px-10 py-5 rounded-xl shadow-2xl hover:shadow-yellow-500/60 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto md:mx-0"
                  >
                    Bắt đầu học tập ngay
                    <ChevronRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 transition-all"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-500 ${
              i === currentSlide
                ? 'w-16 h-4 bg-yellow-400 rounded-full shadow-lg'
                : 'w-4 h-4 bg-white/50 rounded-full hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-yellow-400 transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </header>
  );
};