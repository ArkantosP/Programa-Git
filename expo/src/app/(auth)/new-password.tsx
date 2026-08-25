import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemeTokens } from '@/constants/tokens';
import { NewPasswordHeaderBar } from '@/components/auth/NewPasswordHeaderBar';
import { NewPasswordHeadline } from '@/components/auth/NewPasswordHeadline';
import { PasswordRequirementsChecklist } from '@/components/auth/PasswordRequirementsChecklist';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';

export default function NewPasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const newErrors: { newPassword?: string; confirmPassword?: string } = {};

    if (!newPassword) {
      newErrors.newPassword = 'La nueva contraseña es requerida';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Debe contener al menos 8 caracteres';
    }

    if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = () => {
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Contraseña restablecida',
        'Tu contraseña ha sido actualizada con éxito. Ahora puedes iniciar sesión con tus nuevas credenciales.',
        [
          {
            text: 'Iniciar Sesión',
            onPress: () => router.replace('/(auth)/login' as any),
          },
        ]
      );
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={ThemeTokens.colors.background} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <NewPasswordHeaderBar
          onBackPress={() => router.back()}
          onHelpPress={() =>
            Alert.alert(
              'Ayuda',
              'Ingresa tu nueva contraseña cumpliendo los requisitos indicados.'
            )
          }
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <NewPasswordHeadline />

            <View style={styles.formContainer}>
              <TextField
                label="Nueva contraseña"
                placeholder="Mínimo 8 caracteres"
                iconName="lock-outline"
                isPassword={true}
                value={newPassword}
                onChangeText={(text) => {
                  setNewPassword(text);
                  if (errors.newPassword) {
                    setErrors((prev) => ({ ...prev, newPassword: undefined }));
                  }
                }}
                error={errors.newPassword}
              />

              <TextField
                label="Confirmar contraseña"
                placeholder="Repite tu contraseña"
                iconName="lock-outline"
                isPassword={true}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword) {
                    setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }
                }}
                error={errors.confirmPassword}
              />

              <PasswordRequirementsChecklist passwordText={newPassword} />

              <Button
                title={loading ? 'Restableciendo...' : 'Restablecer contraseña'}
                variant="primary"
                onPress={handleResetPassword}
                loading={loading}
                style={styles.submitButton}
              />
            </View>
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
    marginTop: ThemeTokens.spacing.xs,
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
