"use client"


import { useContext } from 'react'
import { SoundEffectContext } from '@/lib/providers/sound-effect-provider'

export function useSoundEffects() : any {
  const context = useContext(SoundEffectContext)
  
  if (!context) {
    throw new Error('useSoundEffects must be used within SoundEffectProvider')
  }
  
  return context
}