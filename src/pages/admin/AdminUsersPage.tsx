import { useState, useEffect } from 'react';
import { getAllUsers, updateUserProfile } from '../../services/dbService';
import { UserProfile } from '../../types/user';
import { Search, Shield, User, Edit, Trash2 } from 'lucide-react';

const AdminUsersPage = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (uid: string, newRole: 'admin' | 'user') => {
    if (window.confirm(`Tem certeza que deseja alterar o papel deste usuário para ${newRole}?`)) {
      try {
        await updateUserProfile(uid, { role: newRole });
        setUsers(users.map(u => u.uid === uid ? { ...u, role: newRole } : u));
      } catch (error) {
        console.error("Error updating user role:", error);
        alert("Falha ao atualizar papel do usuário");
      }
    }
  };

  const handlePremiumToggle = async (uid: string, currentPremium: boolean) => {
    const action = currentPremium ? 'remover' : 'conceder';
    if (window.confirm(`Tem certeza que deseja ${action} acesso premium para este usuário?`)) {
      try {
        const updates: Partial<UserProfile> = {
          isPremium: !currentPremium
        };
        await updateUserProfile(uid, updates);
        setUsers(users.map(u => u.uid === uid ? { ...u, ...updates } : u));
      } catch (error) {
        console.error("Error updating premium status:", error);
        alert("Falha ao atualizar status premium");
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="p-8 text-center">Carregando usuários...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciar Usuários</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Usuário</th>
              <th className="p-4 font-semibold text-gray-600">Papel</th>
              <th className="p-4 font-semibold text-gray-600">Premium</th>
              <th className="p-4 font-semibold text-gray-600">Estatísticas</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.uid} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4">
                  <div>
                    <p className="font-bold text-gray-800">{user.displayName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    user.isPremium ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {user.isPremium ? '⭐ PREMIUM' : 'GRÁTIS'}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  <p>Level: {user.level}</p>
                  <p>Score: {user.score || 0}</p>
                </td>
                <td className="p-4 text-right">
                  <div className="flex flex-col gap-2 items-end">
                    {user.role === 'user' ? (
                      <button
                        onClick={() => handleRoleChange(user.uid, 'admin')}
                        className="text-purple-600 hover:bg-purple-50 px-3 py-1 rounded-lg text-sm font-bold transition-colors"
                      >
                        Promover a Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(user.uid, 'user')}
                        className="text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-lg text-sm font-bold transition-colors"
                      >
                        Rebaixar a Usuário
                      </button>
                    )}
                    <button
                      onClick={() => handlePremiumToggle(user.uid, user.isPremium)}
                      className={`px-3 py-1 rounded-lg text-sm font-bold transition-colors ${
                        user.isPremium 
                          ? 'text-gray-600 hover:bg-gray-100' 
                          : 'text-yellow-600 hover:bg-yellow-50'
                      }`}
                    >
                      {user.isPremium ? 'Remover Premium' : 'Conceder Premium'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
