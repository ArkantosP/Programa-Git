import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const loginWithEmailPassword = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim(), password: password.trim() }),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error || 'Credenciales inválidas o error de conexión con el servidor.');
  }

  const { user, tokens } = data.data;

  // Persistir en localStorage para sincronización en la SPA
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('sessionUser', JSON.stringify(user));
  localStorage.setItem('usuarioData', JSON.stringify(user));
  localStorage.setItem('authToken', tokens.accessToken);

  return user;
};

export const registerWithEmailPassword = async (registrationData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registrationData),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    const errorMsg = data.details?.map((d) => d.message).join(', ') || data.error || 'Error al registrar el usuario.';
    throw new Error(errorMsg);
  }

  const { user, tokens } = data.data;

  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('sessionUser', JSON.stringify(user));
  localStorage.setItem('usuarioData', JSON.stringify(user));
  localStorage.setItem('authToken', tokens.accessToken);

  return user;
};

export const loginWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  const idToken = await userCredential.user.getIdToken();

  const response = await fetch(`${API_BASE_URL}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.error || 'Error al autenticar con Google en el servidor.');
  }

  const { user, tokens } = data.data;

  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('sessionUser', JSON.stringify(user));
  localStorage.setItem('usuarioData', JSON.stringify(user));
  localStorage.setItem('authToken', tokens.accessToken);

  return user;
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('sessionUser');
  localStorage.removeItem('usuarioData');
  localStorage.removeItem('authToken');
};

export const logoutFirebase = logout;

