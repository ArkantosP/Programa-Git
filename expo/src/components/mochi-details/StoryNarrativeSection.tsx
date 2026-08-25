import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';

interface StoryNarrativeSectionProps {
  title: string;
  narrativeText: string;
  rating: number;
  reviewCountString: string;
  processImageUri: string;
}

export const StoryNarrativeSection: React.FC<StoryNarrativeSectionProps> = ({
  title,
  narrativeText,
  rating,
  reviewCountString,
  processImageUri,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.narrativeBody}>{narrativeText}</Text>

      <View style={styles.ratingRow}>
        <Ionicons name="star" size={18} color="#f4a261" />
        <Text style={styles.ratingText}>
          {rating.toFixed(1)}/5 from {reviewCountString} sweet tooths
        </Text>
      </View>

      <View style={styles.processImageWrapper}>
        <Image
          source={{ uri: processImageUri }}
          style={styles.processImage}
          contentFit="cover"
          transition={300}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: ThemeTokens.spacing.xxl,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: ThemeTokens.colors.primary,
    marginBottom: ThemeTokens.spacing.sm,
    letterSpacing: -0.5,
  },
  narrativeBody: {
    fontSize: 15,
    fontWeight: '400',
    color: ThemeTokens.colors.onSurfaceVariant,
    lineHeight: 24,
    marginBottom: ThemeTokens.spacing.md,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ThemeTokens.spacing.xs,
    marginBottom: ThemeTokens.spacing.lg,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: ThemeTokens.colors.secondary,
  },
  processImageWrapper: {
    width: '100%',
    aspectRatio: 1.4,
    borderRadius: ThemeTokens.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: ThemeTokens.colors.surfaceContainerLow,
    ...ThemeTokens.shadows.soft,
  },
  processImage: {
    width: '100%',
    height: '100%',
  },
});
