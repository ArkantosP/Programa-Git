import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';

export interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  imageUri: string;
}

interface CartItemCardProps {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.imageUri }}
          style={styles.image}
          contentFit="cover"
          transition={250}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.headerRow}>
          <View style={styles.titleColumn}>
            <Text style={styles.itemName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.itemVariant} numberOfLines={1}>
              {item.variant}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={onRemove}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={18} color={ThemeTokens.colors.outline} />
          </TouchableOpacity>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.itemPrice}>
            ${(item.price * item.quantity).toFixed(2)}
          </Text>

          <View style={styles.stepperContainer}>
            <TouchableOpacity
              style={styles.stepButtonMinus}
              onPress={onDecrement}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={14} color={ThemeTokens.colors.primary} />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.stepButtonPlus}
              onPress={onIncrement}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={14} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeTokens.colors.surfaceContainerLowest,
    borderRadius: ThemeTokens.borderRadius.lg,
    padding: ThemeTokens.spacing.md,
    marginBottom: ThemeTokens.spacing.md,
    ...ThemeTokens.shadows.soft,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: ThemeTokens.borderRadius.md,
    overflow: 'hidden',
    backgroundColor: ThemeTokens.colors.surfaceContainerLow,
    marginRight: ThemeTokens.spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: 80,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleColumn: {
    flex: 1,
    marginRight: ThemeTokens.spacing.xs,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
  },
  itemVariant: {
    fontSize: 12,
    fontWeight: '500',
    color: ThemeTokens.colors.onSurfaceVariant,
    opacity: 0.8,
  },
  removeButton: {
    padding: 2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: ThemeTokens.colors.secondary,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeTokens.colors.surfaceContainerLow,
    borderRadius: ThemeTokens.borderRadius.full,
    paddingHorizontal: 4,
    paddingVertical: 2,
    gap: 8,
  },
  stepButtonMinus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepButtonPlus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: ThemeTokens.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 13,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    minWidth: 14,
    textAlign: 'center',
  },
});
