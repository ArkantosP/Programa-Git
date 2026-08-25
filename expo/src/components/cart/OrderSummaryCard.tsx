import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeTokens } from '@/constants/tokens';

interface OrderSummaryCardProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  subtotal,
  deliveryFee,
  total,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>Order Summary</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Delivery Fee</Text>
        <Text style={styles.value}>${deliveryFee.toFixed(2)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeTokens.colors.surfaceContainerLow,
    borderRadius: ThemeTokens.borderRadius.lg,
    padding: ThemeTokens.spacing.lg,
    marginTop: ThemeTokens.spacing.md,
    marginBottom: ThemeTokens.spacing.lg,
    ...ThemeTokens.shadows.soft,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    marginBottom: ThemeTokens.spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ThemeTokens.spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: ThemeTokens.colors.onSurfaceVariant,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: ThemeTokens.colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: `${ThemeTokens.colors.outlineVariant}40`,
    marginVertical: ThemeTokens.spacing.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: ThemeTokens.spacing.xs,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: ThemeTokens.colors.primary,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '900',
    color: ThemeTokens.colors.secondary,
  },
});
