"use client"

import { createContext, useContext, useCallback, useRef, useLayoutEffect } from 'react'
import { Howl, SoundSpriteDefinitions } from 'howler'
import { useMediaReadiness } from '@/hooks/use-media-readiness'

export type SoundEffectName = 'join' | 'leave' | 'notification'

interface SoundEffectContextType {
  playSound: (name: SoundEffectName) => void
}

export const SoundEffectContext = createContext<SoundEffectContextType | null>(null)

const SOUND_SPRITES: SoundSpriteDefinitions = {
  join: [0, 5000],
  leave: [5000, 5000],
  notification: [10000, 5000],
} as const

interface SoundEffectProviderProps {
  children: React.ReactNode
  soundUrls?: {
    mp3?: string
    webm?: string
  }
}

export function SoundEffectProvider({
  children,
  soundUrls = {
    mp3: '/sounds/sounds.mp3',
    webm: '/sounds/sounds.webm',
  },
}: SoundEffectProviderProps) {
  // Créer l'instance Howl seulement côté client
  const howlRef = useRef<Howl | null>(null)
  const isReady = useMediaReadiness((state) => state.isReady)
  const isReadyRef = useRef(isReady)

  // Initialiser Howl une seule fois côté client
  useLayoutEffect(() => {
    if (!howlRef.current) {
      howlRef.current = new Howl({
        src: [soundUrls.mp3, soundUrls.webm].filter(Boolean) as string[],
        sprite: SOUND_SPRITES,
        preload: true,
        onload: () => {
          console.log('Sound effects loaded')
        },
        onloaderror: (id, error) => {
          console.error('Error loading sound effects:', error)
        },
      })
    }

    return () => {
      if (howlRef.current) {
        howlRef.current.unload()
      }
    }
  }, [soundUrls.mp3, soundUrls.webm])

  useLayoutEffect(() => {
    isReadyRef.current = isReady
  }, [isReady])

  const playSound = useCallback((name: SoundEffectName) => {
    if (!isReadyRef.current || !howlRef.current) return

    if (process.env.NODE_ENV === 'development') {
      console.log(`Playing sound: ${name}`)
    }

    try {
      howlRef.current.play(name)
    } catch (error) {
      console.error(`Error playing sound ${name}:`, error)
    }
  }, [])

  return (
    <SoundEffectContext.Provider value={{ playSound }}>
      {children}
    </SoundEffectContext.Provider>
  )
}