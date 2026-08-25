import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeTokens } from '@/constants/tokens';

export const BasketHeadline: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.badgeText}>YOUR SELECTION</Text>
      <Text style={styles.titleText}>The Sweet Basket</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: ThemeTokens.spacing.lg,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: ThemeTokens.colors.secondary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: ThemeTokens.spacing.xs,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '800',
    color: ThemeTokens.colors.primary,
    letterSpacing: -0.5,
  },
});
