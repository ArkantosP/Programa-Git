import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeTokens } from '@/constants/tokens';

interface VerifyCodeHeadlineProps {
  email?: string;
}

export const VerifyCodeHeadline: React.FC<VerifyCodeHeadlineProps> = ({ email }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Verificar código</Text>
      <Text style={styles.subtitleText}>
        Hemos enviado un código de seguridad a tu correo electrónico
        {email ? ` (${email})` : ''}. Por favor, ingrésalo a continuación para continuar.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: ThemeTokens.spacing.lg,
    paddingHorizontal: ThemeTokens.spacing.xs,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '800',
    color: ThemeTokens.colors.primary,
    textAlign: 'center',
    marginBottom: ThemeTokens.spacing.xs,
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 15,
    fontWeight: '400',
    color: ThemeTokens.colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
  },
});
