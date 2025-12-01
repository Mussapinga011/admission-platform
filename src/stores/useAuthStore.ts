import { create } from 'zustand';
import { AuthState, UserProfile } from '../types/user';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserProfile } from '../services/dbService';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  setUser: (user: UserProfile | null) => set({ user }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  updateUser: (updates: Partial<UserProfile>) => 
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null
    })),
  initAuth: () => {
    onAuthStateChanged(auth, async (firebaseUser: any) => {
      if (firebaseUser) {
        try {
          const userProfile = await getUserProfile(firebaseUser.uid);
          if (userProfile) {
            set({ user: userProfile, loading: false });
          } else {
            // Handle case where auth exists but profile doesn't (shouldn't happen in normal flow)
            set({ user: null, loading: false });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          set({ error: "Failed to fetch user profile", loading: false });
        }
      } else {
        set({ user: null, loading: false });
      }
    });
  }
}));
