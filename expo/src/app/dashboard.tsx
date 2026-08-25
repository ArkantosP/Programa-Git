import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';
import { ThemeTokens } from '@/constants/tokens';
import { TopHeaderBar } from '@/components/dashboard/TopHeaderBar';
import { GreetingHeader } from '@/components/dashboard/GreetingHeader';
import { SearchBarInput } from '@/components/dashboard/SearchBarInput';
import { CategoryFilterChips } from '@/components/dashboard/CategoryFilterChips';
import { FeaturedBentoBanner } from '@/components/dashboard/FeaturedBentoBanner';
import {
  MochiProductCard,
  MochiProduct,
} from '@/components/dashboard/MochiProductCard';
import { BottomNavBar } from '@/components/shared/BottomNavBar';

const CATEGORIES = ['All', 'Matcha', 'Strawberry', 'Chocolate', 'Mango', 'Taro'];

const MOCK_PRODUCTS: MochiProduct[] = [
  {
    id: '1',
    name: 'Velvet Chocolate',
    description: 'Dark cocoa & silky ganache',
    price: 4.5,
    category: 'Chocolate',
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBiD78qobz_pPLKRUc4vBadEbFM6wUOTMjFDy9_U8BjAuaHrDDuh_p4_Zrv61aovu46XhCws2MUaddhiyQ7GKMhyErpuJhGREvNracxPIVs73np8U6Msmvccg85AWvWwrZ5fE2hearqSGe3CA0x2Ove-RTOSQfu9mXEZSkzHX8d9rLGc3uTsEI1-8ajzvba54KE4QcL5qS9dFTzDhWlPYSBvSymzyTD7EyIpGCYPl-cFLQwdUDXPevYV2fBxZH5cy59opDglShGdOX2',
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Blushing Strawberry',
    description: 'Fresh berry & sweet cream',
    price: 4.25,
    category: 'Strawberry',
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCX0sYzC1HNHnpXiGwBD7K1MRvtXaxNFAHvUPOLTdbcj1dUEqk5eeeQOZGuEXrqWCDv13IFcd9HU6PQs5ZvWgOi7_Qne6IvNiTmlKc9zOpOTzXxsntFtcUswAPNjjGTSK5rB0pSigHBFLKcTj6egMIkux5tbRX5czvrMpoA32zLa2UYqefmI67F70DPK1sgTvzcu14aHcvGY1wynJhRYPT53yMIJBl4FUaDKc-7aIWdrHvuj9ngqdj46zpgxaApmF35XZQ0H0hl3u4-',
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Matcha Zen',
    description: 'Uji matcha & red bean',
    price: 4.75,
    category: 'Matcha',
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA5qQ9UPQAl29kHD9eQqozk9YbPV3IKb2PSQKAxLdQXDjkJlwK29-FPLHTCoVyvZKYbQPUcL-o-yuLSSooqpUdN5RbyDXfcCU7Oc1IIr5TsHyZKcDjvKbATUvJW0RbwqfWJ9fkCnC0snNo5CgpvxLaS_sOKr1xntEes90FIS_F_aGCbNojPR768jVWPBA8h8gMlkPEfaPMjxVZ6v1fatZRuf5M0Ry5g9PCLzn6NFnTXaFUBd3rabt4IQZQgHYY3AF90LoRbMl0MbU72',
    isFavorite: false,
  },
  {
    id: '4',
    name: 'Mango Sunshine',
    description: 'Alphonso mango nectar',
    price: 4.5,
    category: 'Mango',
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgD2YFwk2kUINEewhq8Vyp1M46wuIOEa1Y525fY5BZaa1Z35uqQrjsxbQpqSHgGb4qOft0k2_qHn5gNfZZwzy7-DLArnMFVKNE8ApdkmRFNeBM3ONy92vQDXOl5eCOK1ppaQx7Tn26ZAHTd2EdOquknREyjgLB1dxdzgTiEKccZjs5Bz8_3b82d2t8y-YSaHiWuYgKniJeOBlGFZIuZrudgJAJK_RVOAPhcpsYUl1i2vMib2NCQloXev3NAFzTeHJ5Kp7cv-LeA96I',
    isFavorite: false,
  },
];

export default function DashboardScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const userName = typeof user?.fullName === 'string' ? user.fullName : 'Daniel';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState<MochiProduct[]>(MOCK_PRODUCTS);

  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleFavorite = (id: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const handleAddToCart = (product: MochiProduct) => {
    Alert.alert('Agregado al carrito', `Añadiste ${product.name} a tu pedido.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={ThemeTokens.colors.background} />
      <TopHeaderBar />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <GreetingHeader userName={userName} />
        <SearchBarInput value={searchQuery} onChangeText={setSearchQuery} />

        <CategoryFilterChips
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <FeaturedBentoBanner
          title="Sakura Blossom"
          badge="Seasonal Special"
          imageUri="https://lh3.googleusercontent.com/aida-public/AB6AXuD_LrnScbSHYzGZ_7Brn-_q6L9uFwRyA9jtyTeeqS02i73Cz14HCp6LQoORi9dkypiJhi4RkqZUki8-PaWaiHiatbw_iveq8w1g3zortqcCDyllMviC8q2DYAQtRFn6yM60eacPAcmATX8S3l9GlCS0qI0bH5D5hPZE8U9BXZsTmDieGp6-tm22VeiZ--lPo0SlKJp7KRULUFx57DFY9ue-rssl_ZDSAH90kwD1lE0dSMerOqAckvzKp-l8AuA6nowH4J0_LSl9_XAf"
          onOrderPress={() => router.push('/mochi-details' as any)}
        />

        <View style={styles.gridContainer}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={styles.gridItem}>
              <MochiProductCard
                product={product}
                onPress={() => router.push('/mochi-details' as any)}
                onAddToCart={() => handleAddToCart(product)}
                onToggleFavorite={() => handleToggleFavorite(product.id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNavBar
        activeTab="home"
        onTabPress={(tab) => {
          if (tab === 'cart') router.push('/cart' as any);
        }}
      />
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
    paddingBottom: ThemeTokens.spacing.xxl,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -ThemeTokens.spacing.xs,
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: ThemeTokens.spacing.xs,
  },
});
