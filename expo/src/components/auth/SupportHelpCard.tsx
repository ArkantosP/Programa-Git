import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';

export const SupportHelpCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="help-circle"
        size={22}
        color={ThemeTokens.colors.secondary}
        style={styles.icon}
      />
      <Text style={styles.text}>
        Si tienes problemas con el acceso, recuerda revisar tu carpeta de correo no
        deseado o contacta a nuestro equipo de dulzura.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: ThemeTokens.colors.surfaceContainerLow,
    borderRadius: ThemeTokens.borderRadius.lg,
    padding: ThemeTokens.spacing.md,
    borderWidth: 1,
    borderColor: `${ThemeTokens.colors.outlineVariant}30`,
    marginTop: ThemeTokens.spacing.md,
    gap: ThemeTokens.spacing.sm,
  },
  icon: {
    marginTop: 2,
  },
  text: {
    flex: 1,
    fontSize: 13,
    color: ThemeTokens.colors.onSurfaceVariant,
    lineHeight: 19,
  },
});
