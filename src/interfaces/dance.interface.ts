export interface DanceInfo {
  id: string

  title: string

  subtitle: string

  heroClass: string

  data: string
}

export interface DanceVariation {
  id: string

  name: string

  desc: string

  tech: string

  err: string

  tip: string

  video?: string
}

export interface DanceMove {
  id: string

  name: string

  desc: string

  tech: string

  err: string

  tip: string

  video?: string

  variations?: DanceVariation[]
}

export interface DanceLevel {
  title: string

  description: string

  items: DanceMove[]
}

export type DanceLevelKey = 'foundation' | 'beginner' | 'improver' | 'intermediate' | 'advanced'

export type DanceData = Partial<Record<DanceLevelKey, DanceLevel>>
