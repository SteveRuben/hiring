'use client';

import { create } from 'zustand';

type MediaReadinessState = {
  isReady: boolean;
  setReady: (ready: boolean) => void;
};

export const useMediaReadiness = create<MediaReadinessState>((set) => ({
  isReady: false,
  setReady: (ready) => set({ isReady: ready }),
}));
