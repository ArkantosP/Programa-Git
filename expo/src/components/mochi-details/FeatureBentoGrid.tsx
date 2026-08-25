import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';

export interface BentoFeature {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

interface FeatureBentoGridProps {
  features: BentoFeature[];
}

export const FeatureBentoGrid: React.FC<FeatureBentoGridProps> = ({ features }) => {
  return (
    <View style={styles.gridContainer}>
      {features.map((feature, index) => (
        <View key={index} style={styles.card}>
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: feature.iconBgColor },
            ]}
          >
            <Ionicons name={feature.icon} size={22} color={feature.iconColor} />
          </View>
          <Text style={styles.title}>{feature.title}</Text>
          <Text style={styles.description}>{feature.description}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    gap: ThemeTokens.spacing.md,
    marginBottom: ThemeTokens.spacing.xl,
  },
  card: {
    backgroundColor: ThemeTokens.colors.surfaceContainerLowest,
    padding: ThemeTokens.spacing.lg,
    borderRadius: ThemeTokens.borderRadius.lg,
    borderWidth: 1,
    borderColor: `${ThemeTokens.colors.outlineVariant}20`,
    ...ThemeTokens.shadows.soft,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ThemeTokens.spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: ThemeTokens.colors.onSurfaceVariant,
    lineHeight: 18,
  },
});
