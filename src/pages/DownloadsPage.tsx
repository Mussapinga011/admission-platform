import { FileText, Lock, Download } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';
import clsx from 'clsx';

// Mock Downloads
const MOCK_DOWNLOADS = [
  { id: '1', title: 'Exame de Admissão UEM 2024 - Matemática', type: 'exam', size: '2.4 MB', free: true },
  { id: '2', title: 'Exame de Admissão UEM 2023 - Matemática', type: 'exam', size: '2.1 MB', free: true },
  { id: '3', title: 'Guia Definitivo de Álgebra', type: 'guide', size: '5.6 MB', free: false },
  { id: '4', title: 'Resumo de História de Moçambique', type: 'guide', size: '3.2 MB', free: false },
  { id: '5', title: 'Exame de Admissão UP 2024 - Português', type: 'exam', size: '1.8 MB', free: true },
  { id: '6', title: 'Tabela Periódica Comentada', type: 'guide', size: '4.5 MB', free: false },
];

const DownloadsPage = () => {
  const { user } = useAuthStore();

  const handleDownload = (item: typeof MOCK_DOWNLOADS[0]) => {
    if (!item.free && !user?.isPremium) {
      alert("This content is for Premium members only. Upgrade now!");
      return;
    }
    // Simulate download
    alert(`Downloading ${item.title}...`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Study Resources</h1>
        <p className="text-gray-500">Download past exams and exclusive study guides.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_DOWNLOADS.map((item) => (
          <div 
            key={item.id}
            className="bg-white p-4 rounded-xl border-2 border-gray-100 flex items-center justify-between hover:border-gray-200 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={clsx(
                "w-12 h-12 rounded-lg flex items-center justify-center",
                item.type === 'exam' ? "bg-blue-100 text-secondary" : "bg-purple-100 text-purple-500"
              )}>
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm md:text-base line-clamp-1">{item.title}</h3>
                <p className="text-xs text-gray-400">{item.size} • {item.type === 'exam' ? 'Past Exam' : 'Study Guide'}</p>
              </div>
            </div>

            <button
              onClick={() => handleDownload(item)}
              className={clsx(
                "p-3 rounded-lg font-bold transition-all",
                !item.free && !user?.isPremium
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-600 hover:bg-secondary hover:text-white"
              )}
            >
              {!item.free && !user?.isPremium ? <Lock size={20} /> : <Download size={20} />}
            </button>
          </div>
        ))}
      </div>

      {!user?.isPremium && (
        <div className="bg-gradient-to-r from-secondary to-blue-400 rounded-2xl p-8 text-white text-center space-y-4 shadow-lg mt-8">
          <h2 className="text-2xl font-bold">Unlock All Study Guides</h2>
          <p className="max-w-md mx-auto opacity-90">
            Get access to exclusive summaries, explained solutions, and advanced statistics with Premium.
          </p>
          <button className="bg-white text-secondary font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-gray-50 transition-colors uppercase tracking-wide">
            Go Premium
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadsPage;
