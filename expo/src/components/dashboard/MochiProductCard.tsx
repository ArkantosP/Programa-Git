import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';

export interface MochiProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUri: string;
  category: string;
  isFavorite?: boolean;
}

interface MochiProductCardProps {
  product: MochiProduct;
  onPress?: () => void;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
}

export const MochiProductCard: React.FC<MochiProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  onToggleFavorite,
}) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: product.imageUri }}
          style={styles.image}
          contentFit="cover"
          transition={250}
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onToggleFavorite}
          activeOpacity={0.7}
        >
          <Ionicons
            name={product.isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={product.isFavorite ? '#e63946' : ThemeTokens.colors.outline}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {product.description}
        </Text>

        <View style={styles.footerRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={onAddToCart}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: ThemeTokens.colors.surfaceContainerLowest,
    borderRadius: ThemeTokens.borderRadius.lg,
    padding: ThemeTokens.spacing.sm,
    marginBottom: ThemeTokens.spacing.md,
    ...ThemeTokens.shadows.soft,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: ThemeTokens.borderRadius.md,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: ThemeTokens.colors.surfaceContainerLow,
    marginBottom: ThemeTokens.spacing.xs,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: ThemeTokens.spacing.xs,
    right: ThemeTokens.spacing.xs,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    paddingHorizontal: ThemeTokens.spacing.xs,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    color: ThemeTokens.colors.onSurfaceVariant,
    opacity: 0.7,
    marginBottom: ThemeTokens.spacing.xs,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: ThemeTokens.spacing.xs,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: ThemeTokens.colors.secondary,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: ThemeTokens.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
