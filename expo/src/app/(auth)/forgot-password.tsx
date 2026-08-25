import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemeTokens } from '@/constants/tokens';
import { ForgotPasswordHeaderBar } from '@/components/auth/ForgotPasswordHeaderBar';
import { ForgotPasswordHeadline } from '@/components/auth/ForgotPasswordHeadline';
import { BackToLoginLink } from '@/components/auth/BackToLoginLink';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';
import { resetPasswordEmail } from '@/services/authService';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const validate = () => {
    if (!email.trim()) {
      setError('El correo electrónico es requerido');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Ingresa un correo electrónico válido');
      return false;
    }
    setError(undefined);
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await resetPasswordEmail(email.trim());
      setLoading(false);
      setEmailSent(true);
      Alert.alert(
        'Correo enviado',
        'Hemos enviado un enlace de recuperación a tu dirección de correo electrónico.',
        [
          {
            text: 'Verificar Código',
            onPress: () =>
              router.push({
                pathname: '/(auth)/verify-code' as any,
                params: { email: email.trim() },
              }),
          },
        ]
      );
    } catch (err: any) {
      setLoading(false);
      let errorMsg = 'No se pudo enviar el correo de recuperación.';
      if (err?.code === 'auth/user-not-found') {
        errorMsg = 'No existe una cuenta registrada con este correo.';
      } else if (err?.code === 'auth/invalid-email') {
        errorMsg = 'El formato del correo es inválido.';
      }
      Alert.alert('Error', errorMsg);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ForgotPasswordHeaderBar
          onBackPress={() => router.back()}
          onHelpPress={() =>
            Alert.alert(
              'Ayuda de Recuperación',
              'Ingresa el correo electrónico asociado a tu cuenta para enviarte un enlace de restablecimiento.'
            )
          }
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <ForgotPasswordHeadline />

            <View style={styles.formContainer}>
              <TextField
                label="Correo electrónico"
                placeholder="ejemplo@correo.com"
                iconName="mail-outline"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error) setError(undefined);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={error}
              />

              <Button
                title={
                  emailSent
                    ? 'Instrucciones Enviadas'
                    : loading
                    ? 'Enviando...'
                    : 'Enviar instrucciones'
                }
                variant={emailSent ? 'outline' : 'primary'}
                onPress={handleSubmit}
                loading={loading}
                disabled={emailSent}
                style={styles.submitButton}
              />
            </View>

            <BackToLoginLink
              onPress={() => router.replace('/(auth)/login' as any)}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2026 Michi Mochi. Todos los derechos reservados.
          </Text>
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
    paddingHorizontal: ThemeTokens.spacing.lg,
    paddingTop: 0,
    paddingBottom: ThemeTokens.spacing.md,
  },
  container: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
  },
  formContainer: {
    width: '100%',
  },
  submitButton: {
    marginTop: ThemeTokens.spacing.sm,
  },
  footer: {
    paddingVertical: ThemeTokens.spacing.md,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: ThemeTokens.colors.outline,
  },
});
