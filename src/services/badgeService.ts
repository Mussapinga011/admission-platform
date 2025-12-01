import { UserProfile } from '../types/user';
import { Trophy, Flame, Star, BookOpen, Target, Zap } from 'lucide-react';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any; // Lucide icon component
  color: string;
  condition: (user: UserProfile) => boolean;
}

export const BADGES: Badge[] = [
  {
    id: 'first_win',
    name: 'First Victory',
    description: 'Complete your first challenge',
    icon: Trophy,
    color: 'text-yellow-500',
    condition: (user) => (user.challengesCompleted || 0) >= 1
  },
  {
    id: 'streak_master',
    name: 'Streak Master',
    description: 'Reach a 7-day study streak',
    icon: Flame,
    color: 'text-orange-500',
    condition: (user) => (user.streak || 0) >= 7
  },
  {
    id: 'dedicated_learner',
    name: 'Dedicated Learner',
    description: 'Reach Level 5',
    icon: BookOpen,
    color: 'text-blue-500',
    condition: (user) => (user.level || 1) >= 5
  },
  {
    id: 'xp_hunter',
    name: 'XP Hunter',
    description: 'Earn 1000 total XP',
    icon: Star,
    color: 'text-purple-500',
    condition: (user) => (user.xp || 0) >= 1000
  },
  {
    id: 'exam_ready',
    name: 'Exam Ready',
    description: 'Complete 5 full exams',
    icon: Target,
    color: 'text-red-500',
    condition: (user) => (user.examsCompleted || 0) >= 5
  },
  {
    id: 'fast_learner',
    name: 'Fast Learner',
    description: 'Complete 50 daily exercises',
    icon: Zap,
    color: 'text-green-500',
    condition: (user) => (user.dailyExercisesCount || 0) >= 50
  }
];

export const checkNewBadges = (user: UserProfile): string[] => {
  const currentBadges = user.badges || [];
  const newBadges: string[] = [];

  BADGES.forEach(badge => {
    if (!currentBadges.includes(badge.id) && badge.condition(user)) {
      newBadges.push(badge.id);
    }
  });

  return newBadges;
};

export const getBadgeById = (id: string): Badge | undefined => {
  return BADGES.find(b => b.id === id);
};
