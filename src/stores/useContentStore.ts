import { create } from 'zustand';

export interface Module {
  id: string;
  title: string;
  description: string;
  exercisesCount: number;
  completed: boolean;
  locked: boolean;
}

export interface Discipline {
  id: string;
  title: string;
  university: 'UEM' | 'UP';
  icon: string; // Emoji or icon name
  color: string; // Tailwind color class
  modules: Module[];
}

interface ContentState {
  disciplines: Discipline[];
  loading: boolean;
  error: string | null;
  fetchDisciplines: () => Promise<void>;
}

// Mock Data
const MOCK_DISCIPLINES: Discipline[] = [
  // UEM Disciplines
  { id: 'uem-bio', title: 'Biologia', university: 'UEM', icon: '🧬', color: 'bg-green-500', modules: [] },
  { id: 'uem-fil', title: 'Filosofia', university: 'UEM', icon: '🤔', color: 'bg-yellow-600', modules: [] },
  { id: 'uem-fis', title: 'Física', university: 'UEM', icon: '⚡', color: 'bg-yellow-500', modules: [] },
  { id: 'uem-fra', title: 'Francês', university: 'UEM', icon: '🇫🇷', color: 'bg-blue-400', modules: [] },
  { id: 'uem-geo', title: 'Geografia', university: 'UEM', icon: '🌍', color: 'bg-teal-500', modules: [] },
  { id: 'uem-his', title: 'História', university: 'UEM', icon: '🏛️', color: 'bg-orange-500', modules: [] },
  { id: 'uem-ing', title: 'Inglês', university: 'UEM', icon: '🇬🇧', color: 'bg-purple-500', modules: [] },
  { id: 'uem-mat', title: 'Matemática', university: 'UEM', icon: '📐', color: 'bg-red-500', modules: [] },
  { id: 'uem-mus', title: 'Música', university: 'UEM', icon: '🎵', color: 'bg-pink-400', modules: [] },
  { id: 'uem-pt1', title: 'Português 1', university: 'UEM', icon: '📚', color: 'bg-blue-600', modules: [] },
  { id: 'uem-pt2', title: 'Português 2', university: 'UEM', icon: '📖', color: 'bg-blue-700', modules: [] },
  { id: 'uem-qui', title: 'Química', university: 'UEM', icon: '🧪', color: 'bg-pink-500', modules: [] },
  { id: 'uem-des1', title: 'Desenho 1', university: 'UEM', icon: '✏️', color: 'bg-gray-500', modules: [] },
  { id: 'uem-des2', title: 'Desenho 2', university: 'UEM', icon: '🎨', color: 'bg-gray-600', modules: [] },
  { id: 'uem-tea', title: 'Teatro', university: 'UEM', icon: '🎭', color: 'bg-red-400', modules: [] },

  // UP Disciplines
  { id: 'up-bio', title: 'Biologia', university: 'UP', icon: '🧬', color: 'bg-green-500', modules: [] },
  { id: 'up-bio-ef', title: 'Biologia (Ed. Física)', university: 'UP', icon: '🏃', color: 'bg-green-600', modules: [] },
  { id: 'up-des', title: 'Desenho', university: 'UP', icon: '✏️', color: 'bg-gray-500', modules: [] },
  { id: 'up-fil', title: 'Filosofia', university: 'UP', icon: '🤔', color: 'bg-yellow-600', modules: [] },
  { id: 'up-fis', title: 'Física', university: 'UP', icon: '⚡', color: 'bg-yellow-500', modules: [] },
  { id: 'up-fra', title: 'Francês', university: 'UP', icon: '🇫🇷', color: 'bg-blue-400', modules: [] },
  { id: 'up-geo', title: 'Geografia', university: 'UP', icon: '🌍', color: 'bg-teal-500', modules: [] },
  { id: 'up-his', title: 'História', university: 'UP', icon: '🏛️', color: 'bg-orange-500', modules: [] },
  { id: 'up-ing', title: 'Inglês', university: 'UP', icon: '🇬🇧', color: 'bg-purple-500', modules: [] },
  { id: 'up-mat', title: 'Matemática', university: 'UP', icon: '📐', color: 'bg-red-500', modules: [] },
  { id: 'up-pt', title: 'Português', university: 'UP', icon: '📚', color: 'bg-blue-600', modules: [] },
  { id: 'up-qui', title: 'Química', university: 'UP', icon: '🧪', color: 'bg-pink-500', modules: [] },
];

export const useContentStore = create<ContentState>((set) => ({
  disciplines: [],
  loading: false,
  error: null,
  fetchDisciplines: async () => {
    set({ loading: true });
    // Simulate API call
    setTimeout(() => {
      set({ disciplines: MOCK_DISCIPLINES, loading: false });
    }, 500);
  }
}));
