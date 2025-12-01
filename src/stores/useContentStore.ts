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
  {
    id: 'math',
    title: 'Matemática',
    icon: '📐',
    color: 'bg-red-500',
    modules: [
      { id: 'm1', title: 'Álgebra Básica', description: 'Equações e inequações', exercisesCount: 10, completed: false, locked: false },
      { id: 'm2', title: 'Geometria Plana', description: 'Áreas e perímetros', exercisesCount: 15, completed: false, locked: true },
      { id: 'm3', title: 'Trigonometria', description: 'Seno, cosseno e tangente', exercisesCount: 12, completed: false, locked: true },
    ]
  },
  {
    id: 'port',
    title: 'Português',
    icon: '📚',
    color: 'bg-blue-500',
    modules: [
      { id: 'p1', title: 'Gramática', description: 'Classes de palavras', exercisesCount: 20, completed: false, locked: false },
      { id: 'p2', title: 'Interpretação', description: 'Leitura e compreensão', exercisesCount: 10, completed: false, locked: true },
    ]
  },
  {
    id: 'eng',
    title: 'Inglês',
    icon: '🇬🇧',
    color: 'bg-purple-500',
    modules: [
      { id: 'e1', title: 'Verb To Be', description: 'Basics of English', exercisesCount: 10, completed: false, locked: false },
      { id: 'e2', title: 'Present Simple', description: 'Daily routines', exercisesCount: 15, completed: false, locked: true },
    ]
  },
  {
    id: 'bio',
    title: 'Biologia',
    icon: '🧬',
    color: 'bg-green-500',
    modules: [
      { id: 'b1', title: 'Citologia', description: 'Estudo das células', exercisesCount: 12, completed: false, locked: false },
      { id: 'b2', title: 'Genética', description: 'Hereditariedade', exercisesCount: 18, completed: false, locked: true },
    ]
  },
  {
    id: 'phys',
    title: 'Física',
    icon: '⚡',
    color: 'bg-yellow-500',
    modules: [
      { id: 'f1', title: 'Cinemática', description: 'Movimento e velocidade', exercisesCount: 14, completed: false, locked: false },
      { id: 'f2', title: 'Dinâmica', description: 'Forças e leis de Newton', exercisesCount: 16, completed: false, locked: true },
    ]
  },
  {
    id: 'chem',
    title: 'Química',
    icon: '🧪',
    color: 'bg-pink-500',
    modules: [
      { id: 'q1', title: 'Atomística', description: 'Estrutura do átomo', exercisesCount: 10, completed: false, locked: false },
      { id: 'q2', title: 'Tabela Periódica', description: 'Elementos e propriedades', exercisesCount: 12, completed: false, locked: true },
    ]
  },
  {
    id: 'hist',
    title: 'História',
    icon: '🏛️',
    color: 'bg-orange-500',
    modules: [
      { id: 'h1', title: 'Idade Antiga', description: 'Grécia e Roma', exercisesCount: 15, completed: false, locked: false },
      { id: 'h2', title: 'Idade Média', description: 'Feudalismo', exercisesCount: 15, completed: false, locked: true },
    ]
  },
  {
    id: 'geo',
    title: 'Geografia',
    icon: '🌍',
    color: 'bg-teal-500',
    modules: [
      { id: 'g1', title: 'Cartografia', description: 'Mapas e escalas', exercisesCount: 10, completed: false, locked: false },
      { id: 'g2', title: 'Geomorfologia', description: 'Relevo terrestre', exercisesCount: 12, completed: false, locked: true },
    ]
  }
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
