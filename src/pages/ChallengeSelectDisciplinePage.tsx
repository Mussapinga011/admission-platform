import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContentStore } from '../stores/useContentStore';
import { Zap, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const ChallengeSelectDisciplinePage = () => {
  const { disciplines, fetchDisciplines, loading } = useContentStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDisciplines();
  }, [fetchDisciplines]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-red-100 text-danger rounded-xl">
          <Zap size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Challenge Mode</h1>
          <p className="text-gray-500">Select a discipline to test your knowledge against the clock.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {disciplines.map((discipline) => (
          <button 
            key={discipline.id}
            onClick={() => navigate(`/challenge/select-exam/${discipline.id}`)}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-danger hover:shadow-xl transition-all text-left group"
          >
            <div className={clsx("h-32 flex items-center justify-center text-5xl transition-transform group-hover:scale-110", discipline.color)}>
              {discipline.icon}
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{discipline.title}</h2>
              <div className="flex items-center text-danger font-bold text-sm uppercase tracking-wide">
                Start Challenge <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChallengeSelectDisciplinePage;
