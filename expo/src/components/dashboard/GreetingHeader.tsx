import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeTokens } from '@/constants/tokens';

interface GreetingHeaderProps {
  userName: string;
}

export const GreetingHeader: React.FC<GreetingHeaderProps> = ({ userName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greetingTitle}>Hello, {userName}!</Text>
      <Text style={styles.greetingSubtitle}>
        Ready for your daily dose of softness?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: ThemeTokens.spacing.md,
  },
  greetingTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    marginBottom: ThemeTokens.spacing.xs,
    letterSpacing: -0.5,
  },
  greetingSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: ThemeTokens.colors.onSurfaceVariant,
    opacity: 0.8,
  },
});
