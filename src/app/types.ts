export type Quarter = {
  start: Date
  end: Date
}

export type Indicator = {
  textNode: string
  emoji: string
  explanation: string
  color: string
}

export type Metric = {
  id: number
  created_at: string
  owner: string
  repo: string
  metrics: string
  summary?: string | null
}

export type Contributor = {
  total: number
  author: {
    login: string
    avatar_url: string
    html_url: string
  }
}

export type AdditionsAndDeletionsStats = {
  rating: number
  data: {
    additions: {
      start: number
      end: number
    }
    deletions: {
      start: number
      end: number
    }
  }
}

export type MetricOject = {
  comparedTimeRanges: {
    beginning: {
      start: string
      end: string
    }
    end: {
      start: string
      end: string
    }
  }
  additionsAndDeletionsStats: AdditionsAndDeletionsStats | null
  commitsStats: {
    rating: number
    data: {
      start: number
      end: number
    }
  }
  contirbutors: Contributor[]
}
