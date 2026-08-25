import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { ThemeTokens } from '@/constants/tokens';

interface FeaturedBentoBannerProps {
  title: string;
  badge: string;
  imageUri: string;
  onOrderPress?: () => void;
}

export const FeaturedBentoBanner: React.FC<FeaturedBentoBannerProps> = ({
  title,
  badge,
  imageUri,
  onOrderPress,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUri }}
        style={styles.backgroundImage}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.badgeText}>{badge}</Text>
        <Text style={styles.titleText}>{title}</Text>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={onOrderPress}
          activeOpacity={0.85}
        >
          <Text style={styles.orderButtonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderRadius: ThemeTokens.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: ThemeTokens.spacing.xl,
    position: 'relative',
    ...ThemeTokens.shadows.soft,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFill,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(65, 40, 23, 0.45)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: ThemeTokens.spacing.lg,
  },
  badgeText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  titleText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: ThemeTokens.spacing.md,
  },
  orderButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: ThemeTokens.borderRadius.full,
    paddingHorizontal: ThemeTokens.spacing.md,
    paddingVertical: ThemeTokens.spacing.xs + 2,
  },
  orderButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});
