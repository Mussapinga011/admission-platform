import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContentStore } from '../stores/useContentStore';
import { Zap, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const ChallengeSelectDisciplinePage = () => {
  const { disciplines, fetchDisciplines, loading } = useContentStore();
  const navigate = useNavigate();
  const [selectedUniversity, setSelectedUniversity] = useState<'UEM' | 'UP'>('UEM');

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

  const filteredDisciplines = disciplines.filter(d => d.university === selectedUniversity);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-100 text-danger rounded-xl">
            <Zap size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Challenge Mode</h1>
            <p className="text-gray-500">Select a discipline to test your knowledge.</p>
          </div>
        </div>
        
        {/* University Tabs */}
        <div className="bg-gray-100 p-1 rounded-xl inline-flex">
          <button
            onClick={() => setSelectedUniversity('UEM')}
            className={clsx(
              "px-6 py-2 rounded-lg text-sm font-bold transition-all",
              selectedUniversity === 'UEM' 
                ? "bg-white text-primary shadow-sm" 
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            UEM
          </button>
          <button
            onClick={() => setSelectedUniversity('UP')}
            className={clsx(
              "px-6 py-2 rounded-lg text-sm font-bold transition-all",
              selectedUniversity === 'UP' 
                ? "bg-white text-primary shadow-sm" 
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            UP
          </button>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold text-gray-700 mb-6">
          {selectedUniversity === 'UEM' ? 'Universidade Eduardo Mondlane' : 'Universidade Pedagógica'}
        </h2>

        {filteredDisciplines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDisciplines.map((discipline) => (
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
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No disciplines found for this university.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeSelectDisciplinePage;
