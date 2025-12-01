import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { saveStudyPlan } from '../services/dbService';
import { StudyPlan } from '../types/user';
import { Timestamp } from 'firebase/firestore';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const questions = [
  {
    id: 'daysPerWeek',
    question: 'Quantos dias por semana você pode estudar?',
    options: ['1-2 dias', '3-4 dias', '5-6 dias', 'Todos os dias']
  },
  {
    id: 'timePerDay',
    question: 'Quanto tempo por dia você tem disponível?',
    options: ['30 minutos', '1 hora', '2 horas', 'Mais de 2 horas']
  },
  {
    id: 'goal',
    question: 'Qual é o seu principal objetivo?',
    options: ['Passar no Exame de Admissão', 'Melhorar notas escolares', 'Aprender por curiosidade', 'Desafio pessoal']
  },
  {
    id: 'weakSubject',
    question: 'Qual disciplina você considera mais difícil?',
    options: ['Matemática', 'Física', 'Português', 'Inglês', 'História', 'Geografia', 'Biologia', 'Química']
  },
  {
    id: 'strongSubject',
    question: 'Qual disciplina você considera mais fácil?',
    options: ['Matemática', 'Física', 'Português', 'Inglês', 'História', 'Geografia', 'Biologia', 'Química']
  },
  {
    id: 'learningStyle',
    question: 'Como você prefere aprender?',
    options: ['Lendo teoria', 'Resolvendo exercícios', 'Vídeos explicativos', 'Mistura de tudo']
  },
  {
    id: 'examDate',
    question: 'Quando será o seu exame?',
    options: ['Em menos de 1 mês', 'Em 1-3 meses', 'Em 3-6 meses', 'Mais de 6 meses']
  },
  {
    id: 'currentLevel',
    question: 'Como você avalia seu conhecimento atual?',
    options: ['Iniciante', 'Intermediário', 'Avançado']
  },
  {
    id: 'reminders',
    question: 'Você gostaria de receber lembretes diários?',
    options: ['Sim, por favor', 'Não, obrigado']
  },
  {
    id: 'commitment',
    question: 'Você está pronto para se comprometer com este plano?',
    options: ['Sim, estou pronto!', 'Vou tentar meu melhor']
  }
];

const StudyPlanSetupPage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: answer });
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generatePlan({ ...answers, [questions[currentStep].id]: answer });
    }
  };

  const generatePlan = async (finalAnswers: Record<string, string>) => {
    setLoading(true);
    
    // 1. Calculate Daily Goal based on Time Available vs Exam Date
    const timeOption = finalAnswers['timePerDay'];
    const examDateOption = finalAnswers['examDate'];
    
    let baseDailyGoal = 10;
    if (timeOption === '1 hora') baseDailyGoal = 20;
    if (timeOption === '2 horas') baseDailyGoal = 35;
    if (timeOption === 'Mais de 2 horas') baseDailyGoal = 50;

    // Adjust based on urgency
    let urgencyMultiplier = 1;
    if (examDateOption === 'Em menos de 1 mês') urgencyMultiplier = 1.5;
    if (examDateOption === 'Em 1-3 meses') urgencyMultiplier = 1.2;
    
    const dailyGoal = Math.round(baseDailyGoal * urgencyMultiplier);

    // 2. Create Smart Schedule
    const daysOption = finalAnswers['daysPerWeek'];
    const weakSubject = finalAnswers['weakSubject'];
    const strongSubject = finalAnswers['strongSubject'];
    
    let availableDays: string[] = [];
    if (daysOption === '1-2 dias') availableDays = ['Sábado', 'Domingo'];
    else if (daysOption === '3-4 dias') availableDays = ['Segunda', 'Quarta', 'Sexta', 'Domingo'];
    else if (daysOption === '5-6 dias') availableDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    else availableDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

    // Distribute subjects (Mock logic for now, could be more complex)
    // Ensure weak subject appears more often
    
    const newPlan: StudyPlan = {
      weeklySchedule: availableDays,
      weakTopics: [weakSubject, 'Revisão Geral', strongSubject], // Track key focus areas
      dailyGoal: dailyGoal,
      createdAt: Timestamp.now()
    };

    try {
      if (user) {
        await saveStudyPlan(user.uid, newPlan);
        // Update local state
        updateUser({ studyPlan: newPlan });
        navigate('/profile');
      }
    } catch (error) {
      console.error("Error saving plan:", error);
      alert("Erro ao salvar plano. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-100">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-8">
          <div className="mb-8">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">
              Passo {currentStep + 1} de {questions.length}
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              {questions[currentStep].question}
            </h2>
          </div>

          <div className="space-y-3">
            {questions[currentStep].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-primary hover:bg-primary/5 transition-all group flex items-center justify-between"
              >
                <span className="font-medium text-gray-700 group-hover:text-primary">
                  {option}
                </span>
                <ArrowRight className="opacity-0 group-hover:opacity-100 text-primary transition-opacity" size={20} />
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            {currentStep > 0 && (
              <button 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-gray-400 hover:text-gray-600 flex items-center gap-2 text-sm font-medium"
              >
                <ArrowLeft size={16} />
                Voltar
              </button>
            )}
            {loading && (
              <span className="text-sm text-gray-500 ml-auto">Gerando seu plano...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanSetupPage;
