import type { User, Companion, Ranking } from '~/types/firestore'
import { useFirestore } from '~/composables/useFirestore'

export const useFirestoreService = () => {
  const { getDocument, addDocument } = useFirestore()

  const getUser = async (userId: string): Promise<User | null> => {
    return await getDocument<User>('users', userId)
  }

  const addUser = async (user: Omit<User, 'id' | 'createdAt'>): Promise<string> => {
    const newUser: User = {
      ...user,
      createdAt: new Date()
    }
    return await addDocument<User>('users', newUser)
  }

  const getCompanion = async (companionId: string): Promise<Companion | null> => {
    return await getDocument<Companion>('companions', companionId)
  }

  const addCompanion = async (companion: Omit<Companion, 'id' | 'createdAt'>): Promise<string> => {
    const newCompanion: Companion = {
      ...companion,
      createdAt: new Date()
    }
    return await addDocument<Companion>('companions', newCompanion)
  }

  const getRanking = async (rankingId: string): Promise<Ranking | null> => {
    return await getDocument<Ranking>('rankings', rankingId)
  }

  const addRanking = async (ranking: Omit<Ranking, 'id' | 'createdAt'>): Promise<string> => {
    const newRanking: Ranking = {
      ...ranking,
      createdAt: new Date()
    }
    return await addDocument<Ranking>('rankings', newRanking)
  }

  return {
    getUser,
    addUser,
    getCompanion,
    addCompanion,
    getRanking,
    addRanking
  }
}