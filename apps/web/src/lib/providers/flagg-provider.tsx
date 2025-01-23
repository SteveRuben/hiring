"use client"

import { FlaggProvider as BaseFlaggProvider } from "flagg/dist/react"
import { type ReactNode } from "react"

interface FlaggProviderProps {
  children: ReactNode
  featureFlags: any
}

export function FlaggProvider({ children, featureFlags }: FlaggProviderProps) {
  return (
    <BaseFlaggProvider featureFlags={featureFlags}>
      {children}
    </BaseFlaggProvider>
  )
}