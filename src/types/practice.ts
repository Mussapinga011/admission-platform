import { Timestamp } from 'firebase/firestore';

export interface PracticeDiscipline {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  createdAt: Timestamp;
}

export interface PracticeSection {
  id: string;
  disciplineId: string;
  title: string;
  description: string;
  order: number;
  isPremium?: boolean;
}

export interface PracticeSession {
  id: string;
  disciplineId: string;
  sectionId?: string; // New field for grouping
  title: string;
  order: number;
  level: number;
  description: string;
  quizIds: string[]; // Reference to questions
  xpReward: number;
  createdAt: Timestamp;
  type?: 'quiz' | 'review' | 'challenge';
}

export interface PracticeQuestion {
  id: string;
  sessionId: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  type: 'multiple_choice' | 'boolean';
  xp: number;
  createdAt: Timestamp;
}

export interface UserSessionProgress {
  sessionId: string;
  disciplineId: string;
  sectionId?: string; // Helpful for tracking completion of sections
  completed: boolean;
  score: number;
  xpEarned: number;
  streak: number;
  lastActive: Timestamp;
}
