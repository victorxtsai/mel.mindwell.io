// src/hooks/useFirebaseAuth.ts
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    OAuthProvider,
    sendEmailVerification,
    User,
  } from 'firebase/auth';
  import { auth } from '@/src/firebaseConfig';
  
  const fetchCustomToken = async (idToken: string) => {
    const response = await fetch('https://us-central1-mindwell-world.cloudfunctions.net/api/mintCustomToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });
  
    const data = await response.json();
    return data.customToken;
  };
  
  const redirectWithCustomToken = async (user: User, redirectUrl: string = '/') => {
    const idToken = await user.getIdToken(true);
    const customToken = await fetchCustomToken(idToken);
  
    const url = new URL(redirectUrl, window.location.origin);
    url.searchParams.append('token', customToken);
    url.searchParams.append('uid', user.uid);
  
    window.location.href = url.toString();
  };
  
  export function useFirebaseAuth() {
    const login = async (email: string, password: string, redirectUrl: string = '/') => {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await redirectWithCustomToken(userCredential.user, redirectUrl);
    };
  
    const register = async (email: string, password: string, redirectUrl: string = '/') => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      await redirectWithCustomToken(userCredential.user, redirectUrl);
    };
  
    const loginWithGoogle = async (redirectUrl: string = '/') => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await redirectWithCustomToken(result.user, redirectUrl);
    };
  
    const loginWithApple = async (redirectUrl: string = '/') => {
      const provider = new OAuthProvider('apple.com');
      const result = await signInWithPopup(auth, provider);
      await redirectWithCustomToken(result.user, redirectUrl);
    };
  
    return {
      login,
      register,
      loginWithGoogle,
      loginWithApple,
    };
  }
  