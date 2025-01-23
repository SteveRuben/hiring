import { LocalAnalyticsData } from './types'

const LOCAL_STORAGE_KEY = 'analytics_data'

export class AnalyticsStorage {
  static getData(key: string): unknown {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (!stored) return null
      
      const data = JSON.parse(stored) as LocalAnalyticsData
      return data[key]
    } catch (err) {
      console.warn('Error reading analytics data:', err)
      return null
    }
  }

  static setData(key: string, value: unknown): void {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
      const data: LocalAnalyticsData = stored ? JSON.parse(stored) : {}
      
      data[key] = value
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
    } catch (err) {
      console.warn('Error saving analytics data:', err)
    }
  }

  static removeData(key: string): void {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (!stored) return
      
      const data = JSON.parse(stored) as LocalAnalyticsData
      delete data[key]
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
    } catch (err) {
      console.warn('Error removing analytics data:', err)
    }
  }
}