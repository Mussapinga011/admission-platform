import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { getExam, getQuestionsByExam, updateUserProfile, updateUserScore, addUserActivity, updateUserDisciplineScore } from '../services/dbService';
import { Exam, Question } from '../types/exam';
import { ArrowLeft, Check, X } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import clsx from 'clsx';
import RichTextRenderer from '../components/RichTextRenderer';

const StudyPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();
  
  const [exam, setExam] = useState<Exam | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [limitReached, setLimitReached] = useState(false);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (examId && user) {
      checkDailyLimit();
      fetchData(examId);
    }
  }, [examId, user]);

  const checkDailyLimit = () => {
    if (!user) return;
    
    // Premium users bypass limits
    if (user.isPremium) return;
    
    // Check if user already took an exam today
    if (user.lastExamDate) {
      const lastExamDate = user.lastExamDate.toDate();
      const today = new Date();
      
      if (
        lastExamDate.getDate() === today.getDate() &&
        lastExamDate.getMonth() === today.getMonth() &&
        lastExamDate.getFullYear() === today.getFullYear()
      ) {
        setLimitReached(true);
      }
    }
  };

  const fetchData = async (id: string) => {
    setLoading(true);
    try {
      const examData = await getExam(id);
      const questionsData = await getQuestionsByExam(id);
      setExam(examData);
      setQuestions(questionsData);
    } catch (error) {
      console.error("Error fetching study data:", error);
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleCheck = () => {
    if (!selectedOption || !currentQuestion) return;

    if (selectedOption === currentQuestion.correctOption) {
      setStatus('correct');
      setCorrectCount(prev => prev + 1);
    } else {
      setStatus('incorrect');
    }
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setStatus('idle');
    } else {
      // Exam Completed
      if (user) {
        const grade = Math.round((correctCount / questions.length) * 100);
        const newExamsCompleted = (user.examsCompleted || 0) + 1;
        const newAverageGrade = user.examsCompleted 
          ? ((user.averageGrade * user.examsCompleted) + grade) / newExamsCompleted
          : grade;

        const updates = {
          xp: (user.xp || 0) + 50,
          dailyExercisesCount: (user.dailyExercisesCount || 0) + questions.length,
          lastExamDate: Timestamp.now(),
          examsCompleted: newExamsCompleted,
          averageGrade: Math.round(newAverageGrade)
        };

        await updateUserProfile(user.uid, updates);
        await updateUserScore(user.uid);
        
        // Record Activity
        await addUserActivity(user.uid, {
          type: 'exam',
          title: `Completed Exam: ${exam?.name || 'Exam'}`,
          timestamp: Timestamp.now(),
          score: grade,
          xpEarned: 50
        });

        // Update Discipline Score
        if (exam?.disciplineId) {
          await updateUserDisciplineScore(user.uid, exam.disciplineId, grade);
        }

        updateUser(updates);
      }
      // Navigate back to the exam list for this discipline
      if (exam) {
        navigate(`/disciplines/${exam.disciplineId}/exams`);
      } else {
        navigate('/disciplines');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (limitReached) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
          <div className="text-6xl">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800">Daily Limit Reached</h2>
          <p className="text-gray-600">
            You've already completed an exam today. Come back tomorrow or upgrade to Premium for unlimited access!
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/disciplines')}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
            >
              Back to Disciplines
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="px-6 py-3 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition-colors"
            >
              ⭐ Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!exam || questions.length === 0) {
    return <div className="p-8 text-center">Exam not found or has no questions.</div>;
  }

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/disciplines/${exam.disciplineId}/exams`)} 
            className="text-gray-400 hover:text-gray-600"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="font-bold text-gray-800 truncate max-w-[200px] md:max-w-md">{exam.name}</h1>
            <p className="text-xs text-gray-500">Questão {currentQuestionIndex + 1} de {questions.length}</p>
          </div>
        </div>
        <div className="text-sm font-bold text-gray-500">
          Modo Estudo
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm font-bold">
                  Questão {currentQuestionIndex + 1}
                </span>
              </div>
              
              <div className="text-lg md:text-xl font-medium text-gray-800 mb-8">
                <RichTextRenderer content={currentQuestion.statement} />
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => status === 'idle' && setSelectedOption(option)}
                    disabled={status !== 'idle'}
                    className={clsx(
                      "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3",
                      selectedOption === option
                        ? "border-secondary bg-blue-50 text-secondary"
                        : "border-gray-100 hover:border-gray-300 text-gray-700",
                      status === 'correct' && option === currentQuestion.correctOption && "bg-green-100 border-primary text-primary",
                      status === 'incorrect' && option === selectedOption && "bg-red-100 border-danger text-danger"
                    )}
                  >
                    <div className={clsx(
                      "w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold",
                      // Logic for circle color
                      status === 'correct' && option === currentQuestion.correctOption ? "border-primary bg-primary text-white" :
                      status === 'incorrect' && option === selectedOption ? "border-danger bg-danger text-white" :
                      selectedOption === option ? "border-secondary bg-secondary text-white" :
                      "border-gray-300 text-gray-400"
                    )}>
                      {/* Option Letter (A, B, C...) could be added here if we had index, but option is string. 
                          We can map index in the loop above if needed, but for now just showing check/x or empty */}
                       {status === 'correct' && option === currentQuestion.correctOption ? <Check size={16} /> :
                        status === 'incorrect' && option === selectedOption ? <X size={16} /> :
                        null}
                    </div>
                    <div className="flex-1">
                      <RichTextRenderer content={option} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

             {/* Feedback Section (Only visible when answered) */}
             {status !== 'idle' && (
              <div className={clsx(
                "p-6 rounded-2xl border-2 flex items-start gap-4",
                status === 'correct' ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
              )}>
                <div className={clsx(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                  status === 'correct' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                )}>
                  {status === 'correct' ? <Check size={24} /> : <X size={24} />}
                </div>
                <div>
                  <h3 className={clsx("font-bold text-lg mb-1", status === 'correct' ? "text-green-800" : "text-red-800")}>
                    {status === 'correct' ? 'Excellent!' : 'Incorrect'}
                  </h3>
                  {status === 'incorrect' && (
                    <div className="text-red-600 mb-2">
                      <span className="font-bold">Correct answer: </span>
                      <RichTextRenderer content={currentQuestion.correctOption} />
                    </div>
                  )}
                  {currentQuestion.explanation && (
                    <div className="text-gray-600 text-sm bg-white/50 p-3 rounded-lg mt-2">
                      <span className="font-bold block mb-1">Explanation:</span>
                      <RichTextRenderer content={currentQuestion.explanation} />
                    </div>
                  )}
                </div>
                <button
                  onClick={handleNext}
                  className={clsx(
                    "ml-auto px-6 py-2 rounded-xl font-bold text-white uppercase tracking-wide transition-all shadow-sm active:translate-y-1",
                    status === 'correct' ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                  )}
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar (Desktop) */}
        <div className="hidden md:flex w-72 bg-gray-50 border-l flex-col p-4">
          <h3 className="font-bold text-gray-700 mb-4">Navegação</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentQuestionIndex(idx);
                  setStatus('idle');
                  setSelectedOption(null);
                }}
                className={clsx(
                  "aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-colors relative",
                  currentQuestionIndex === idx ? "ring-2 ring-primary ring-offset-2" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-100"
                  // Add logic here if we want to show answered state in grid for study mode
                )}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          
          {/* Check Button in Sidebar for Desktop */}
          <div className="mt-auto">
             {status === 'idle' && (
              <button
                onClick={handleCheck}
                disabled={!selectedOption}
                className={clsx(
                  "w-full py-3 rounded-xl font-bold text-white uppercase tracking-wide transition-all shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[4px]",
                  selectedOption ? "bg-primary hover:bg-primary-hover shadow-primary-shade" : "bg-gray-300 cursor-not-allowed"
                )}
              >
                Check
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-20">
         {status === 'idle' ? (
            <button
              onClick={handleCheck}
              disabled={!selectedOption}
              className={clsx(
                "w-full py-3 rounded-xl font-bold text-white uppercase tracking-wide transition-all shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[4px]",
                selectedOption ? "bg-primary hover:bg-primary-hover shadow-primary-shade" : "bg-gray-300 cursor-not-allowed"
              )}
            >
              Check
            </button>
          ) : (
             <button
                onClick={handleNext}
                className={clsx(
                  "w-full py-3 rounded-xl font-bold text-white uppercase tracking-wide transition-all shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[4px]",
                  status === 'correct' ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                )}
              >
                Continue
              </button>
          )}
      </div>
    </div>
  );
};

export default StudyPage;

