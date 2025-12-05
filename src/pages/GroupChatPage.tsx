import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { GroupMessage, StudyGroup } from '../types/group';
import { subscribeToMessages, sendMessage, leaveGroup } from '../services/groupService';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Send, ArrowLeft, MoreVertical, LogOut, Users } from 'lucide-react';
import clsx from 'clsx';

const GroupChatPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const [group, setGroup] = useState<StudyGroup | null>(null);
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!groupId || !user) return;

    // Carregar dados do grupo
    const loadGroup = async () => {
      try {
        const docRef = doc(db, 'groups', groupId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setGroup({ id: docSnap.id, ...docSnap.data() } as StudyGroup);
        } else {
          alert('Grupo não encontrado');
          navigate('/groups');
        }
      } catch (error) {
        console.error('Error loading group:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGroup();

    // Inscrever nas mensagens
    const unsubscribe = subscribeToMessages(groupId, (msgs) => {
      setMessages(msgs);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [groupId, user, navigate]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !groupId) return;

    setSending(true);
    try {
      await sendMessage(groupId, user, newMessage);
      setNewMessage('');
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Erro ao enviar mensagem');
    } finally {
      setSending(false);
    }
  };

  const handleLeaveGroup = async () => {
    if (!user || !groupId || !group) return;
    if (confirm('Tem certeza que deseja sair deste grupo?')) {
      try {
        await leaveGroup(groupId, user.uid, user.displayName);
        navigate('/groups');
      } catch (error) {
        console.error('Error leaving group:', error);
        alert('Erro ao sair do grupo');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (!group) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] max-w-4xl mx-auto bg-white md:rounded-2xl shadow-sm overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/groups')} className="md:hidden text-gray-500">
            <ArrowLeft size={24} />
          </button>
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Users size={20} />
          </div>
          <div>
            <h1 className="font-bold text-gray-800 leading-tight">{group.name}</h1>
            <p className="text-xs text-gray-500">{group.membersCount} membros • {group.disciplineName}</p>
          </div>
        </div>
        
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <MoreVertical size={20} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-scale-in">
              <button 
                onClick={handleLeaveGroup}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 text-sm font-medium"
              >
                <LogOut size={16} />
                Sair do Grupo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p>Nenhuma mensagem ainda. Comece a conversa!</p>
          </div>
        )}
        
        {messages.map((msg) => {
          const isMe = msg.userId === user?.uid;
          const isSystem = msg.isSystemMessage;

          if (isSystem) {
            return (
              <div key={msg.id} className="flex justify-center my-4">
                <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                  {msg.text}
                </span>
              </div>
            );
          }

          return (
            <div key={msg.id} className={clsx("flex gap-3 max-w-[85%]", isMe ? "ml-auto flex-row-reverse" : "")}>
              {!isMe && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                  {msg.userPhotoURL ? (
                    <img src={msg.userPhotoURL} alt={msg.userName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-600">
                      {msg.userName.charAt(0)}
                    </div>
                  )}
                </div>
              )}
              
              <div className={clsx(
                "p-3 rounded-2xl shadow-sm text-sm",
                isMe 
                  ? "bg-primary text-white rounded-tr-none" 
                  : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
              )}>
                {!isMe && <p className="text-xs font-bold text-primary mb-1">{msg.userName}</p>}
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                <p className={clsx("text-[10px] mt-1 text-right opacity-70", isMe ? "text-blue-100" : "text-gray-400")}>
                  {msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="bg-white p-3 border-t border-gray-200 flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-gray-100 text-gray-800 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          disabled={sending}
        />
        <button 
          type="submit" 
          disabled={!newMessage.trim() || sending}
          className="bg-primary text-white p-3 rounded-full hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default GroupChatPage;
