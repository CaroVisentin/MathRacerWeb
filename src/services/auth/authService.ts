import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../network/firebase';
import { api, setAuthToken } from '../network/api';

class AuthService {

  async loginWithEmail(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      setAuthToken(idToken);
      // 2. Login en el backend
      const response = await api.post('/player/login', {
        email,
        password
      });
      return response.data;
    } catch (error) {
      console.error('Error en login:', error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-credential':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            throw new Error('Email o contraseña incorrectos');
          case 'auth/invalid-email':
            throw new Error('Email inválido');
          case 'auth/user-disabled':
            throw new Error('Esta cuenta ha sido deshabilitada');
          case 'auth/too-many-requests':
            throw new Error('Demasiados intentos fallidos. Por favor, intenta más tarde');
          default:
            console.error('Código de error de Firebase:', error.code);
            throw new Error('Error en el inicio de sesión');
        }
      }
      throw error;
    }
  }

  async registerWithEmail(email: string, password: string, username: string) {
    let userCredential = null;
    try {
      // 1. Crear usuario en Firebase
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      setAuthToken(idToken);
      const uid = userCredential.user.uid;
      // 2. Crear el usuario en el backend con todos los datos requeridos
      const response = await api.post('/player/register', {
        username,
        email,
        uid
      });
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error);
      
      // Si el usuario de Firebase se creó pero falló el backend, eliminarlo
      if (userCredential?.user) {
        try {
          await userCredential.user.delete();
          setAuthToken(null);
        } catch (deleteError) {
          console.error('Error al eliminar usuario de Firebase:', deleteError);
        }
      }
      
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            throw new Error('Este email ya está registrado');
          case 'auth/invalid-email':
            throw new Error('Email inválido');
          case 'auth/weak-password':
            throw new Error('La contraseña es muy débil');
          default:
            throw new Error('Error en el registro');
        }
      }
      throw error;
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();
      setAuthToken(idToken);

      const username = userCredential.user.displayName || userCredential.user.email?.split('@')[0] || 'user';
      const email = userCredential.user.email;
      // Login/registro en el backend
      const response = await api.post('/player/google', {
        username,
        email
      });
      return response.data;
    } catch (error) {
      console.error('Error en login con Google:', error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            throw new Error('Inicio de sesión con Google cancelado');
          case 'auth/popup-blocked':
            throw new Error('El popup fue bloqueado. Por favor, habilita las ventanas emergentes');
          default:
            throw new Error('Error en el inicio de sesión con Google');
        }
      }
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(auth);
      setAuthToken(null); // Eliminar el token al cerrar sesión
    } catch (error) {
      console.error('Error en logout:', error);
      if (error instanceof FirebaseError) {
        throw new Error('Error al cerrar sesión');
      }
      throw error;
    }
  }
}

export const authService = new AuthService();