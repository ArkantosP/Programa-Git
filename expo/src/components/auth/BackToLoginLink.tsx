import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';

interface BackToLoginLinkProps {
  onPress: () => void;
}

export const BackToLoginLink: React.FC<BackToLoginLinkProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name="arrow-back" size={18} color={ThemeTokens.colors.primary} />
      <Text style={styles.linkText}>Volver al inicio de sesión</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ThemeTokens.spacing.xs,
    marginTop: ThemeTokens.spacing.md,
    paddingVertical: ThemeTokens.spacing.sm,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    textDecorationLine: 'underline',
  },
});
