import { useState, useEffect } from 'react';
import { Trophy, Medal, User } from 'lucide-react';
import { getAllUsers } from '../services/dbService';
import { UserProfile } from '../types/user';
import clsx from 'clsx';

import { useContentStore } from '../stores/useContentStore';

const RankingPage = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const { disciplines } = useContentStore();

  useEffect(() => {
    fetchRanking();
  }, []);

  const fetchRanking = async () => {
    setLoading(true);
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching ranking:", error);
    } finally {
      setLoading(false);
    }
  };

  const getScore = (user: UserProfile) => {
    if (selectedDiscipline === 'all') return user.score || 0;
    return user.disciplineScores?.[selectedDiscipline] || 0;
  };

  const sortedUsers = [...users]
    .sort((a, b) => getScore(b) - getScore(a))
    .slice(0, 50);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">National Ranking</h1>
          <p className="text-gray-500">Top students based on performance!</p>
        </div>
        
        <select
          value={selectedDiscipline}
          onChange={(e) => setSelectedDiscipline(e.target.value)}
          className="w-full md:w-auto p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary min-w-[200px] font-medium text-gray-700"
        >
          <option value="all">Overall (Challenges)</option>
          {disciplines.map(d => (
            <option key={d.id} value={d.id}>{d.title}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
        <div className="p-4 bg-secondary/10 border-b border-gray-100 flex items-center justify-between font-bold text-gray-500 uppercase text-xs md:text-sm tracking-wide">
          <div className="w-8 md:w-12 text-center">#</div>
          <div className="flex-1">Student</div>
          <div className="w-20 md:w-32 text-right">Score</div>
        </div>

        <div className="divide-y divide-gray-100">
          {sortedUsers.length === 0 || sortedUsers.every(u => getScore(u) === 0) ? (
            <div className="p-8 text-center text-gray-500">
              No scores yet for this category. Be the first!
            </div>
          ) : (
            sortedUsers.map((student, index) => {
              const rank = index + 1;
              const isTop3 = rank <= 3;
              const score = getScore(student);
              
              if (score === 0) return null; // Don't show users with 0 score
              
              return (
                <div 
                  key={student.uid} 
                  className={clsx(
                    "flex items-center justify-between p-4 hover:bg-gray-50 transition-colors",
                    isTop3 && "bg-yellow-50/50"
                  )}
                >
                  <div className="w-12 text-center font-bold text-lg flex justify-center">
                    {rank === 1 ? <Trophy className="text-yellow-500" /> :
                     rank === 2 ? <Medal className="text-gray-400" /> :
                     rank === 3 ? <Medal className="text-orange-500" /> :
                     <span className="text-gray-500">{rank}</span>}
                  </div>
                  
                  <div className="flex-1 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                      <User size={20} />
                    </div>
                    <div>
                      <span className={clsx("font-bold", isTop3 ? "text-gray-800" : "text-gray-600")}>
                        {student.displayName}
                      </span>
                      {student.isPremium && <span className="ml-2 text-xs text-yellow-600">⭐</span>}
                      <div className="text-xs text-gray-500">
                        {selectedDiscipline === 'all' 
                          ? `${student.challengesCompleted || 0} challenges`
                          : 'Discipline Score'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-20 md:w-32 text-right">
                    <div className="font-bold text-primary text-base md:text-lg">
                      {score}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
