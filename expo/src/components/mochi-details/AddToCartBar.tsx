import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeTokens } from '@/constants/tokens';

interface AddToCartBarProps {
  totalPrice: number;
  onAddToCart: () => void;
}

export const AddToCartBar: React.FC<AddToCartBarProps> = ({
  totalPrice,
  onAddToCart,
}) => {
  return (
    <View style={styles.outerContainer} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.cartButton}
        onPress={onAddToCart}
        activeOpacity={0.9}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
        <Text style={styles.priceText}>— ${totalPrice.toFixed(2)}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    paddingHorizontal: ThemeTokens.spacing.md,
    alignItems: 'center',
    zIndex: 90,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
    height: 56,
    backgroundColor: ThemeTokens.colors.primaryContainer,
    borderRadius: ThemeTokens.borderRadius.full,
    paddingHorizontal: ThemeTokens.spacing.xl,
    ...ThemeTokens.shadows.soft,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  priceText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
