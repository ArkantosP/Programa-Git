import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';

export const NewPasswordHeadline: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons
          name="lock-open"
          size={36}
          color={ThemeTokens.colors.primary}
        />
      </View>

      <Text style={styles.titleText}>Nueva contraseña</Text>
      <Text style={styles.subtitleText}>
        Crea una contraseña segura que sea fácil de recordar pero difícil de
        adivinar para proteger tu cuenta de antojos.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: ThemeTokens.spacing.sm,
    marginBottom: ThemeTokens.spacing.lg,
    paddingHorizontal: ThemeTokens.spacing.xs,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: ThemeTokens.colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ThemeTokens.spacing.md,
    ...ThemeTokens.shadows.soft,
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
