'use client';

import { create } from 'zustand';

interface AppState {
  error: Error | null;
  setError: (error: Error | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  error: null,
  setError: (error) => set({ error }),
}));

export default function AppStateProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
