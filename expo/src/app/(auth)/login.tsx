import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeTokens } from '@/constants/tokens';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Divider } from '@/components/ui/Divider';
import { GoogleIcon } from '@/components/ui/GoogleIcon';
import { loginWithEmailPassword } from '@/services/authService';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { signInWithGoogle, loading: googleLoading } = useGoogleAuth();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await loginWithEmailPassword(email.trim(), password);
      setLoading(false);
      router.replace('/dashboard' as any);
    } catch (error: any) {
      setLoading(false);
      let errorMessage = 'No se pudo iniciar sesión. Verifica tus credenciales.';
      if (
        error?.code === 'auth/invalid-credential' ||
        error?.code === 'auth/user-not-found' ||
        error?.code === 'auth/wrong-password'
      ) {
        errorMessage = 'Correo o contraseña incorrectos.';
      } else if (error?.code === 'auth/too-many-requests') {
        errorMessage = 'Demasiados intentos fallidos. Intenta más tarde.';
      }
      Alert.alert('Error de inicio de sesión', errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.replace('/dashboard' as any);
    } catch (error: any) {
      Alert.alert(
        'Google Sign-In',
        error.message || 'No se pudo completar el inicio de sesión con Google.'
      );
    }
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password' as any);
  };

  const handleRegisterNavigation = () => {
    router.push('/(auth)/register' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Encabezado con marca y saludo */}
            <AuthHeader
              title="¡Hola!"
              subtitle="Endulza tu día iniciando sesión."
              showBanner={true}
            />

            {/* Acción Primaria Social: Google Login */}
            <View style={styles.socialContainer}>
              <Button
                title="Continuar con Google"
                variant="google"
                onPress={handleGoogleLogin}
                loading={googleLoading}
                icon={<GoogleIcon size={22} />}
              />
            </View>

            {/* Divisor */}
            <Divider label="o con tu correo" />

            {/* Formulario de Login */}
            <View style={styles.formContainer}>
              <TextField
                label="Correo Electrónico"
                placeholder="ejemplo@michi.com"
                iconName="mail-outline"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.email}
              />

              <TextField
                label="Contraseña"
                placeholder="••••••••"
                iconName="lock-outline"
                isPassword={true}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                error={errors.password}
                rightHeaderAction={{
                  label: '¿Olvidaste tu contraseña?',
                  onPress: handleForgotPassword,
                }}
              />

              <Button
                title="Iniciar Sesión"
                variant="primary"
                onPress={handleLogin}
                loading={loading}
                style={styles.submitButton}
              />
            </View>

            {/* Enlace secundario a registro */}
            <View style={styles.footerLinkContainer}>
              <Text style={styles.footerText}>
                ¿No tienes una cuenta?{' '}
                <Text style={styles.registerLink} onPress={handleRegisterNavigation}>
                  Regístrate ahora
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer de marca / políticas */}
        <View style={styles.brandFooter}>
          <Text style={styles.copyrightText}>© 2026 Michi Mochi Dessert Co.</Text>
          <View style={styles.legalLinksRow}>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.legalLinkText}>Términos de Servicio</Text>
            </TouchableOpacity>
            <Text style={styles.dotSeparator}>•</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.legalLinkText}>Privacidad</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ThemeTokens.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  container: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    alignItems: 'center',
  },
  socialContainer: {
    width: '100%',
    marginBottom: 8,
  },
  formContainer: {
    width: '100%',
  },
  submitButton: {
    marginTop: 12,
  },
  footerLinkContainer: {
    marginTop: 24,
    marginBottom: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 15,
    color: ThemeTokens.colors.onSurfaceVariant,
  },
  registerLink: {
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    textDecorationLine: 'underline',
  },
  brandFooter: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: `${ThemeTokens.colors.outlineVariant}60`,
    width: '100%',
    alignItems: 'center',
    backgroundColor: ThemeTokens.colors.background,
  },
  copyrightText: {
    fontSize: 12,
    color: ThemeTokens.colors.onSurfaceVariant,
    marginBottom: 6,
  },
  legalLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legalLinkText: {
    fontSize: 12,
    color: ThemeTokens.colors.outline,
  },
  dotSeparator: {
    marginHorizontal: 8,
    fontSize: 12,
    color: ThemeTokens.colors.outlineVariant,
  },
});
