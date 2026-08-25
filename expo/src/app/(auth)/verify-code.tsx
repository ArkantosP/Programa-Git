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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemeTokens } from '@/constants/tokens';
import { VerifyCodeHeaderBar } from '@/components/auth/VerifyCodeHeaderBar';
import { VerifyCodeHeroBanner } from '@/components/auth/VerifyCodeHeroBanner';
import { VerifyCodeHeadline } from '@/components/auth/VerifyCodeHeadline';
import { OtpInputGroup } from '@/components/auth/OtpInputGroup';
import { ResendCodeSection } from '@/components/auth/ResendCodeSection';
import { SupportHelpCard } from '@/components/auth/SupportHelpCard';
import { Button } from '@/components/ui/Button';

export default function VerifyCodeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();
  const userEmail = params.email;
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const otpCode = digits.join('');

  const handleVerify = () => {
    if (otpCode.length < 4) {
      Alert.alert('Código incompleto', 'Por favor ingresa los 4 dígitos del código.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        '¡Código verificado!',
        'Tu código de seguridad es correcto.',
        [
          {
            text: 'Continuar',
            onPress: () => router.replace('/(auth)/new-password' as any),
          },
        ]
      );
    }, 1200);
  };

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      Alert.alert('Código reenviado', 'Te hemos enviado un nuevo código de seguridad.');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={ThemeTokens.colors.background} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <VerifyCodeHeaderBar
          onBackPress={() => router.back()}
          onHelpPress={() =>
            Alert.alert(
              'Ayuda',
              'Ingresa los 4 dígitos recibidos en tu correo electrónico.'
            )
          }
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <VerifyCodeHeroBanner />

            <VerifyCodeHeadline email={userEmail} />

            <OtpInputGroup
              length={4}
              value={digits}
              onChange={setDigits}
            />

            <Button
              title={loading ? 'Verificando...' : 'Verificar'}
              variant="primary"
              onPress={handleVerify}
              loading={loading}
              style={styles.verifyButton}
            />

            <ResendCodeSection
              onResendPress={handleResend}
              loading={resending}
            />

            <SupportHelpCard />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2026 Michi Mochi. La dulzura en cada paso.
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
  verifyButton: {
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
