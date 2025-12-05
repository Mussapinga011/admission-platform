import { Timestamp } from 'firebase/firestore';

export interface GroupMember {
  userId: string;
  displayName: string;
  photoURL?: string | null;
  role: 'admin' | 'member';
  joinedAt: Timestamp;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  disciplineId: string; // 'all' ou ID específico
  disciplineName: string;
  createdBy: string; // userId
  createdAt: Timestamp;
  membersCount: number;
  maxMembers: number; // Default 20
  isPrivate: boolean;
  inviteCode?: string;
  members?: string[]; // Array de userIds para busca rápida
}

export interface GroupMessage {
  id: string;
  groupId: string;
  userId: string;
  userName: string;
  userPhotoURL?: string | null;
  text: string;
  createdAt: Timestamp;
  isSystemMessage?: boolean; // Ex: "Fulano entrou no grupo"
}
