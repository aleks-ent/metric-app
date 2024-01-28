import type { Indicator } from './types'

export const METRICS_INDICATORS: Array<Indicator> = [
  {
    textNode: 'Inactive',
    emoji: '🧊',
    explanation: 'Significant drop in contribution activity',
    color: '#FF0000',
  },
  {
    textNode: 'Barely warm',
    emoji: '〽️',
    explanation: 'Contribution activity is decreasing',
    color: '#FFA500',
  },
  {
    textNode: 'Stable',
    emoji: '✅',
    explanation: 'Constant contribution activity',
    color: '#FFFF00',
  },
  {
    textNode: 'Evolving',
    emoji: '✨',
    explanation: 'Contribution activity is growing',
    color: '#90EE90',
  },
  {
    textNode: 'Active',
    emoji: '🚀',
    explanation: 'Active contributions',
    color: '#008000',
  },
]
