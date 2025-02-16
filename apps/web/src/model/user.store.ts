import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '.';

// Store
export interface UserStore {
    users: User[];
    activeUserIndex: number;
    setUsers: (users: User[]) => void;
    setActiveUserIndex: (index: number) => void;
  }
  
export const useUserStore = create<UserStore>()(
    persist(
      (set) => ({
        users: [],
        activeUserIndex: 0,
        setUsers: (users) => set({ users }),
        setActiveUserIndex: (index) => set({ activeUserIndex: index }),
      }),
      {
        name: 'user-storage',
      }
    )
  );