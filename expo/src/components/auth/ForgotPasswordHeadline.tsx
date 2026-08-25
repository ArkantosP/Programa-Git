import { ThemeTokens } from '@/constants/tokens';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const ForgotPasswordHeadline: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Image
          source={require('@/assets/images/forgot-password-icon.png')}
          style={styles.iconImage}
          contentFit="contain"
          transition={300}
        />
      </View>
      <Text style={styles.titleText}>Recuperar Contraseña</Text>
      <Text style={styles.subtitleText}>
        Ingresa tu correo electrónico para recibir un enlace de recuperación.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: ThemeTokens.spacing.lg,
    paddingHorizontal: ThemeTokens.spacing.md,
  },
  iconWrapper: {
    width: 220,
    height: 220,
    marginBottom: ThemeTokens.spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
  },
  titleText: {
    fontSize: 28,
    fontWeight: '800',
    color: ThemeTokens.colors.primary,
    textAlign: 'center',
    marginBottom: ThemeTokens.spacing.sm,
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
