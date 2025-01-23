import { EventNames } from './constants'

export type EventName = `${EventNames}` | (string & {})

export interface AnalyticsEvent {
  key: EventName
  value?: unknown
  meta?: Record<string, unknown>
}

export interface LocalAnalyticsData {
  [key: string]: unknown
}