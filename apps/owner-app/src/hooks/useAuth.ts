import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

/**
 * Hook to manage authentication state and listen for auth changes.
 * Wraps the auth store with Firebase onAuthStateChanged listener.
 */
export const useAuth = () => {
  const {
    user,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    clearError,
    setUser,
    setLoading,
  } = useAuthStore();

  useEffect(() => {
    // TODO: Set up Firebase onAuthStateChanged listener
    // const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    //   if (firebaseUser) {
    //     // Fetch owner profile from Firestore
    //     const ownerDoc = await getDoc(doc(db, 'owners', firebaseUser.uid));
    //     if (ownerDoc.exists()) {
    //       setUser(ownerDoc.data() as OwnerUser);
    //     }
    //   } else {
    //     setUser(null);
    //   }
    //   setLoading(false);
    // });
    //
    // return () => unsubscribe();

    // Placeholder: mark loading as false until Firebase is integrated
    setLoading(false);
  }, [setUser, setLoading]);

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    clearError,
  };
};
