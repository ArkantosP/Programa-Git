import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeTokens } from '@/constants/tokens';

interface ResendCodeSectionProps {
  onResendPress: () => void;
  loading?: boolean;
}

export const ResendCodeSection: React.FC<ResendCodeSectionProps> = ({
  onResendPress,
  loading = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>¿No recibiste el código?</Text>
      <TouchableOpacity
        onPress={onResendPress}
        disabled={loading}
        activeOpacity={0.7}
      >
        <Text style={styles.linkText}>
          {loading ? 'Reenviando...' : 'Reenviar código'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: ThemeTokens.spacing.md,
    marginBottom: ThemeTokens.spacing.lg,
  },
  questionText: {
    fontSize: 14,
    color: ThemeTokens.colors.onSurfaceVariant,
    marginBottom: 4,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    textDecorationLine: 'underline',
  },
});
