import { useState, useEffect } from 'react';
import { Platform, NativeModules } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { loginWithGoogleFirebase } from '@/services/authService';

WebBrowser.maybeCompleteAuthSession();

let GoogleSigninModule: any = null;
if (Platform.OS !== 'web' && NativeModules.RNGoogleSignin) {
  try {
    GoogleSigninModule = require('@react-native-google-signin/google-signin').GoogleSignin;
  } catch (e) {
    console.warn('RNGoogleSignin no está vinculado en el binario nativo:', e);
  }
}

export function useGoogleAuth() {
  const [loading, setLoading] = useState(false);

  // Generar Redirect URI seguro mediante Proxy de Expo para evitar error 404 de exp:// en Google OAuth
  const redirectUri = makeRedirectUri({
    scheme: 'michimochi',
    path: 'oauthredirect',
  });

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '1044600548905-m385b4jnpr6h0taldjq7hjriht9nuejc.apps.googleusercontent.com',
    webClientId: '1044600548905-m385b4jnpr6h0taldjq7hjriht9nuejc.apps.googleusercontent.com',
    redirectUri,
  });

  useEffect(() => {
    if (GoogleSigninModule) {
      try {
        GoogleSigninModule.configure({
          webClientId: '1044600548905-m385b4jnpr6h0taldjq7hjriht9nuejc.apps.googleusercontent.com',
          offlineAccess: false,
        });
      } catch (err) {
        console.warn('Error al configurar GoogleSigninModule:', err);
      }
    }
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token, idToken } = response.params || {};
      const token = id_token || idToken || response.authentication?.idToken;

      if (token) {
        setLoading(true);
        loginWithGoogleFirebase(token)
          .catch((err) => {
            console.error('Error al verificar token en Firebase:', err);
          })
          .finally(() => setLoading(false));
      }
    }
  }, [response]);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      if (Platform.OS === 'web') {
        // En navegador Web
        await loginWithGoogleFirebase();
      } else if (GoogleSigninModule) {
        // En dispositivo físico o emulador compilado nativamente (Dev Build / APK)
        await GoogleSigninModule.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const userInfo = await GoogleSigninModule.signIn();
        const idToken = userInfo.data?.idToken || (userInfo as any).idToken;

        if (!idToken) {
          throw new Error('No se obtuvo idToken del modal nativo de Google');
        }

        await loginWithGoogleFirebase(idToken);
      } else {
        // En cliente de desarrollo Expo Go
        if (request) {
          await promptAsync();
        } else {
          throw new Error('Cargando autenticación de Google... Intenta de nuevo en unos segundos.');
        }
      }
    } catch (error: any) {
      console.error('Error en Google Sign-In:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithGoogle,
    loading: loading || (Platform.OS !== 'web' && !GoogleSigninModule && !request),
  };
}
