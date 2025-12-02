// src/components/RevealOnScroll.tsx
import React, { useState, useRef, useEffect } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  threshold?: number; // Cho phép tùy chỉnh độ nhạy (mặc định 0.15)
  once?: boolean;     // Chỉ animate 1 lần (mặc định true)
  className?: string;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  delay = 0,
  threshold = 0.15,
  once = true,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentElement = ref.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(currentElement); // Ngắt kết nối sau khi hiện 1 lần
          }
        } else if (!once) {
          setIsVisible(false); // Cho phép ẩn lại nếu scroll ngược (nếu muốn hiệu ứng lặp)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger sớm hơn một chút
      }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform will-change-transform
        ${isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-12 scale-95'
        } ${className}`}
    >
      {children}
    </div>
  );
};