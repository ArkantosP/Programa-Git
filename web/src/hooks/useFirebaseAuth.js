import { useState } from 'react';
import { loginWithGoogle, logoutFirebase } from '../services/authService';

export function useFirebaseAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signInWithGoogle = async (onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      const user = await loginWithGoogle();
      if (onSuccess) {
        onSuccess(user);
      }
      return { ok: true, user };
    } catch (err) {
      let errorMessage = 'Ocurrió un error al iniciar sesión con Google.';
      if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'La ventana de inicio de sesión de Google fue cerrada.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Error de red al conectar con los servidores de autenticación.';
      } else if (err.code === 'auth/unauthorized-domain') {
        errorMessage = 'El dominio no está autorizado en Firebase Console.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      return { ok: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithGoogle,
    logout: logoutFirebase,
    loading,
    error,
    setError,
  };
}
