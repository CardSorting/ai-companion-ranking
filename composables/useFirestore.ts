import { Firestore, doc, getDoc, collection, addDoc } from 'firebase/firestore'

export const useFirestore = () => {
  const { $firestore } = useNuxtApp()
  
  const getDocument = async <T extends Record<string, any>>(collectionPath: string, id: string): Promise<T | null> => {
    try {
      const docRef = doc($firestore as Firestore, collectionPath, id)
      const docSnap = await getDoc(docRef)
      return docSnap.exists() ? docSnap.data() as T : null
    } catch (error) {
      console.error('Error getting document:', error)
      throw error
    }
  }

  const addDocument = async <T extends Record<string, any>>(collectionPath: string, data: T): Promise<string> => {
    try {
      const colRef = collection($firestore as Firestore, collectionPath)
      const docRef = await addDoc(colRef, data)
      return docRef.id
    } catch (error) {
      console.error('Error adding document:', error)
      throw error
    }
  }

  return {
    getDocument,
    addDocument
  }
}