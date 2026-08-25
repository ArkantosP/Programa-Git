import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onIncrement,
  onDecrement,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.stepButton}
        onPress={onDecrement}
        activeOpacity={0.7}
      >
        <Ionicons name="remove" size={20} color={ThemeTokens.colors.primary} />
      </TouchableOpacity>

      <Text style={styles.quantityText}>{quantity}</Text>

      <TouchableOpacity
        style={styles.stepButton}
        onPress={onIncrement}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={20} color={ThemeTokens.colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeTokens.colors.surfaceContainer,
    borderRadius: ThemeTokens.borderRadius.full,
    padding: 4,
    borderWidth: 1,
    borderColor: `${ThemeTokens.colors.outlineVariant}30`,
  },
  stepButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    ...ThemeTokens.shadows.soft,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    paddingHorizontal: ThemeTokens.spacing.md,
  },
});
