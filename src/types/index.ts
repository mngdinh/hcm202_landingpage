import type { LucideIcon } from 'lucide-react';

export interface ContentSection {
  id: number;
  title: string;
  subtitle: string;
  points: string[];
  highlight: string;
  icon: LucideIcon;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

export interface QuizState {
  [questionId: number]: number; // Maps question ID to selected option index
}