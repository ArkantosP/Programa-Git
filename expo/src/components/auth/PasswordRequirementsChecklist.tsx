import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';

interface PasswordRequirementsChecklistProps {
  passwordText: string;
}

export const PasswordRequirementsChecklist: React.FC<PasswordRequirementsChecklistProps> = ({
  passwordText,
}) => {
  const requirements = [
    { label: '8+ caracteres', valid: passwordText.length >= 8 },
    { label: 'Un número', valid: /\d/.test(passwordText) },
    { label: 'Una mayúscula', valid: /[A-Z]/.test(passwordText) },
    { label: 'Símbolo ($#%)', valid: /[^A-Za-z0-9]/.test(passwordText) },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerLabel}>TU CONTRASEÑA DEBE TENER:</Text>
      <View style={styles.gridRow}>
        {requirements.map((req, index) => (
          <View key={index} style={styles.checkItem}>
            <Ionicons
              name={req.valid ? 'checkmark-circle' : 'ellipse-outline'}
              size={16}
              color={
                req.valid
                  ? ThemeTokens.colors.primary
                  : ThemeTokens.colors.outline
              }
            />
            <Text
              style={[
                styles.itemText,
                req.valid ? styles.itemTextValid : styles.itemTextInvalid,
              ]}
            >
              {req.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeTokens.colors.surfaceContainerLow,
    borderRadius: ThemeTokens.borderRadius.lg,
    padding: ThemeTokens.spacing.md,
    borderWidth: 1,
    borderColor: `${ThemeTokens.colors.outlineVariant}30`,
    marginTop: ThemeTokens.spacing.sm,
    marginBottom: ThemeTokens.spacing.md,
  },
  headerLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: ThemeTokens.colors.outline,
    letterSpacing: 1,
    marginBottom: ThemeTokens.spacing.sm,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ThemeTokens.spacing.sm,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '46%',
    gap: 6,
  },
  itemText: {
    fontSize: 13,
  },
  itemTextValid: {
    color: ThemeTokens.colors.primary,
    fontWeight: '700',
  },
  itemTextInvalid: {
    color: ThemeTokens.colors.onSurfaceVariant,
    opacity: 0.7,
  },
});
