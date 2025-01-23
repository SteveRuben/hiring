import { AnalyticsEvent, EventName } from './types'
import { useRefParam } from './use-ref-param'

const ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true'

export class Analytics {
  static async trackEvent(
    eventName: EventName,
    value?: unknown,
    eventProperties?: Record<string, unknown>
  ) {
    if (!ENABLED) return

    const event: AnalyticsEvent = {
      key: eventName,
      value: value ?? '',
      meta: {
        roomId: null, // TODO: Get from your auth/room context
        ref: useRefParam(), // Using the imported useRefParam hook instead of undefined useRefStore
        ...eventProperties
      }
    }

    try {
      const response = await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })

      if (!response.ok) {
        throw new Error('Failed to track event')
      }
    } catch (err) {
      console.error('Error tracking event:', err)
    }
  }

  static async trackWidgetUpdate(
    roomId: string | null, 
    widgetState: { showIframe?: boolean }
  ) {
    if (!ENABLED) return

    if ('showIframe' in widgetState) {
      const eventName = widgetState.showIframe 
        ? 'expand_link_widget'
        : 'collapse_link_widget'
        
      await this.trackEvent(eventName, null, { roomId })
    }
  }
}