import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemeTokens } from '@/constants/tokens';
import { BasketHeaderBar } from '@/components/cart/BasketHeaderBar';
import { BasketHeadline } from '@/components/cart/BasketHeadline';
import { CartItemCard, CartItem } from '@/components/cart/CartItemCard';
import { OrderSummaryCard } from '@/components/cart/OrderSummaryCard';
import { CheckoutActionButton } from '@/components/cart/CheckoutActionButton';
import { BottomNavBar, TabType } from '@/components/shared/BottomNavBar';

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: '1',
    name: 'Matcha Mochi',
    variant: 'Ceremonial Grade Matcha',
    price: 6.25,
    quantity: 2,
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1J9RXyp8johTzdFVH2pbsC2tJnlsqyp7kvg9Z5NDU5T0yLc_7IgdirZ9DRl7VdgnWl0M9moVtTf0TNo8kSbmwDKBF7oJLcKQy-cULw99LrCATBqgTpqrfRUhTfXm7hyRfAy1KvHITMqeI4DpmnSUFzmjCKAdIsMlBGLG4LXUbUBJ9Q1r9AibrkPGg9WwOzv74IQEVJvYdB8GzRrnXYC4bU52QRjNTgBEkYHzzKQM6w-SpNOBx8GiOz7mOCcqFPpou0W5AyPUndRUv',
  },
  {
    id: '2',
    name: 'Strawberry Mochi',
    variant: 'Sweet Amaou Berry',
    price: 6.25,
    quantity: 1,
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDi2pcQDgLURCmHERfkG8iAKJ1csZZ0b5FVzH4HXNSNDztU-BVUZmO5fh6dyvzj36Nq3tD4gPAQ_ZU6uMJ3EK6_gwWBlbfOOhcEhoHAsoUVFptiuVh2FOhZhaM8UYi8OeMgelSgF89Rl15_oImbfFyBS3zsHKza9TrqW1MM9JZYqKtTAuJMZ5NraPWWHnXs3ErWSDi7AJtNsKHkI49373udtTonDVbuoczLWElu567rccsRZAhoZtaZS7lkeWWIq0nhez0nNhm8vbHg',
  },
];

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [activeTab, setActiveTab] = useState<TabType>('cart');

  const deliveryFee = 2.0;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = cartItems.length > 0 ? subtotal + deliveryFee : 0;

  const handleIncrement = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cesta vacía', 'Agrega algún mochi a tu cesta antes de pagar.');
      return;
    }
    Alert.alert(
      'Proceder al Pago',
      `Iniciando pago por un total de $${total.toFixed(2)}.`
    );
  };

  const handleTabPress = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'home') {
      router.replace('/dashboard' as any);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={ThemeTokens.colors.background} />

      <BasketHeaderBar
        onBackPress={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <BasketHeadline />

        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onIncrement={() => handleIncrement(item.id)}
              onDecrement={() => handleDecrement(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Tu cesta está vacía 🍡</Text>
            <Text style={styles.emptySubtitle}>
              Explora nuestros sabores artesanales y agrega tus favoritos.
            </Text>
          </View>
        )}

        {cartItems.length > 0 && (
          <>
            <OrderSummaryCard
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
            />

            <CheckoutActionButton onPress={handleCheckout} />

            <Text style={styles.minimumOrderHint}>
              Minimum order for free delivery: $25.00
            </Text>
          </>
        )}
      </ScrollView>

      <BottomNavBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ThemeTokens.colors.background,
  },
  scrollContent: {
    paddingHorizontal: ThemeTokens.spacing.md,
    paddingBottom: 110,
  },
  emptyContainer: {
    paddingVertical: ThemeTokens.spacing.xxl,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    marginBottom: ThemeTokens.spacing.xs,
  },
  emptySubtitle: {
    fontSize: 14,
    color: ThemeTokens.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  minimumOrderHint: {
    fontSize: 12,
    color: ThemeTokens.colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: ThemeTokens.spacing.sm,
    marginBottom: ThemeTokens.spacing.lg,
    opacity: 0.7,
  },
});
