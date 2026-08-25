import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { ThemeTokens } from '@/constants/tokens';
import { QuantityStepper } from './QuantityStepper';

interface MochiHeroSectionProps {
  name: string;
  price: number;
  description: string;
  imageUri: string;
  isSeasonal?: boolean;
  quantity: number;
  onIncrementQuantity: () => void;
  onDecrementQuantity: () => void;
}

export const MochiHeroSection: React.FC<MochiHeroSectionProps> = ({
  name,
  price,
  description,
  imageUri,
  isSeasonal = true,
  quantity,
  onIncrementQuantity,
  onDecrementQuantity,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          contentFit="contain"
          transition={300}
        />
        {isSeasonal && (
          <View style={styles.seasonalBadge}>
            <Text style={styles.badgeSub}>SEASONAL</Text>
            <Text style={styles.badgeMain}>SPECIAL</Text>
          </View>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.productTitle}>{name}</Text>
        <Text style={styles.productPrice}>${price.toFixed(2)}</Text>
        <Text style={styles.productDescription}>{description}</Text>

        <View style={styles.stepperRow}>
          <QuantityStepper
            quantity={quantity}
            onIncrement={onIncrementQuantity}
            onDecrement={onDecrementQuantity}
          />
          <Text style={styles.quantityLabel}>Quantity</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: ThemeTokens.spacing.xl,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1.1,
    backgroundColor: ThemeTokens.colors.surfaceContainerLow,
    borderRadius: ThemeTokens.borderRadius.xl,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: ThemeTokens.spacing.lg,
    position: 'relative',
    marginBottom: ThemeTokens.spacing.lg,
    ...ThemeTokens.shadows.soft,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  seasonalBadge: {
    position: 'absolute',
    bottom: ThemeTokens.spacing.md,
    right: ThemeTokens.spacing.md,
    backgroundColor: ThemeTokens.colors.primaryContainer,
    borderRadius: ThemeTokens.borderRadius.full,
    paddingHorizontal: ThemeTokens.spacing.md,
    paddingVertical: ThemeTokens.spacing.xs + 2,
    alignItems: 'center',
  },
  badgeSub: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  badgeMain: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  infoSection: {
    paddingHorizontal: ThemeTokens.spacing.xs,
  },
  productTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: ThemeTokens.colors.primary,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: '700',
    color: ThemeTokens.colors.secondary,
    marginBottom: ThemeTokens.spacing.sm,
  },
  productDescription: {
    fontSize: 15,
    fontWeight: '400',
    color: ThemeTokens.colors.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: ThemeTokens.spacing.lg,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ThemeTokens.spacing.md,
  },
  quantityLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: ThemeTokens.colors.outline,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
