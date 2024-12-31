export interface User {
  id?: string
  name: string
  email: string
  createdAt: Date
}

export interface Companion {
  id?: string
  name: string
  description: string
  ownerId: string
  createdAt: Date
}

export interface Ranking {
  id?: string
  userId: string
  companionId: string
  score: number
  createdAt: Date
}