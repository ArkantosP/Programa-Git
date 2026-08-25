import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeTokens } from '@/constants/tokens';

interface DividerProps {
  label?: string;
}

export const Divider: React.FC<DividerProps> = ({ label }) => {
  if (!label) {
    return <View style={styles.simpleLine} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 24,
  },
  simpleLine: {
    height: 1,
    backgroundColor: ThemeTokens.colors.outlineVariant,
    width: '100%',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: ThemeTokens.colors.outlineVariant,
  },
  label: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: ThemeTokens.colors.onSurfaceVariant,
    fontWeight: '500',
  },
});
