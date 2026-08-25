import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';

interface CheckoutActionButtonProps {
  onPress: () => void;
  title?: string;
}

export const CheckoutActionButton: React.FC<CheckoutActionButtonProps> = ({
  onPress,
  title = 'Proceed to Checkout',
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <Text style={styles.buttonText}>{title}</Text>
      <Ionicons name="arrow-forward" size={20} color="#ffffff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ThemeTokens.colors.primaryContainer,
    borderRadius: ThemeTokens.borderRadius.full,
    height: 56,
    paddingHorizontal: ThemeTokens.spacing.xl,
    gap: ThemeTokens.spacing.sm,
    marginBottom: ThemeTokens.spacing.sm,
    ...ThemeTokens.shadows.soft,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
});
