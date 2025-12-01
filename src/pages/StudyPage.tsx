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
    <div className="max-w-2xl mx-auto h-[calc(100vh-100px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(`/disciplines/${exam.disciplineId}/exams`)} 
          className="text-gray-400 hover:text-gray-600"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-gray-600 font-bold">
          {currentQuestionIndex + 1} / {questions.length}
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center pb-24 md:pb-0">
        <RichTextRenderer 
          content={currentQuestion.statement}
          className="text-xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center px-2"
        />

        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => status === 'idle' && setSelectedOption(option)}
              disabled={status !== 'idle'}
              className={clsx(
                "p-3 md:p-4 rounded-xl border-2 text-base md:text-lg font-bold transition-all text-left",
                selectedOption === option
                  ? "border-secondary bg-blue-50 text-secondary"
                  : "border-gray-200 hover:bg-gray-50 text-gray-700",
                status === 'correct' && option === currentQuestion.correctOption && "bg-green-100 border-primary text-primary",
                status === 'incorrect' && option === selectedOption && "bg-red-100 border-danger text-danger"
              )}
            >
              <RichTextRenderer content={option} />
            </button>
          ))}
        </div>
      </div>

      {/* Footer / Feedback */}
      <div className={clsx(
        "fixed bottom-0 left-0 right-0 p-4 md:p-8 border-t-2 z-10",
        status === 'idle' ? "bg-white border-gray-200" :
        status === 'correct' ? "bg-green-100 border-green-200" :
        "bg-red-100 border-red-200"
      )}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
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
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={clsx(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  status === 'correct' ? "bg-white text-primary" : "bg-white text-danger"
                )}>
                  {status === 'correct' ? <Check size={32} /> : <X size={32} />}
                </div>
                <div>
                  <h3 className={clsx("text-xl font-bold", status === 'correct' ? "text-primary-shade" : "text-danger-shade")}>
                    {status === 'correct' ? 'Excellent!' : 'Incorrect'}
                  </h3>
                  {status === 'incorrect' && (
                    <div className="text-danger-shade">
                      <span>Correct answer: </span>
                      <RichTextRenderer content={currentQuestion.correctOption} />
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={handleNext}
                className={clsx(
                  "py-3 px-8 rounded-xl font-bold text-white uppercase tracking-wide transition-all shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-[4px]",
                  status === 'correct' ? "bg-primary hover:bg-primary-hover shadow-primary-shade" : "bg-danger hover:bg-danger-hover shadow-danger-shade"
                )}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPage;

