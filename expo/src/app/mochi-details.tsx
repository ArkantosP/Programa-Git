import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemeTokens } from '@/constants/tokens';
import { DetailHeaderBar } from '@/components/mochi-details/DetailHeaderBar';
import { MochiHeroSection } from '@/components/mochi-details/MochiHeroSection';
import { FlavorProfileSelector } from '@/components/mochi-details/FlavorProfileSelector';
import {
  FeatureBentoGrid,
  BentoFeature,
} from '@/components/mochi-details/FeatureBentoGrid';
import { StoryNarrativeSection } from '@/components/mochi-details/StoryNarrativeSection';
import { AddToCartBar } from '@/components/mochi-details/AddToCartBar';
import { BottomNavBar, TabType } from '@/components/shared/BottomNavBar';

const FLAVOR_OPTIONS = ['Classic Pink', 'White Cream', 'Matcha Infused'];

const BENTO_FEATURES: BentoFeature[] = [
  {
    icon: 'leaf-outline',
    title: '100% Organic',
    description: 'Sourced directly from artisanal farmers in the Shizuoka prefecture.',
    iconBgColor: ThemeTokens.colors.surfaceContainer,
    iconColor: ThemeTokens.colors.primary,
  },
  {
    icon: 'time-outline',
    title: 'Daily Fresh',
    description: 'Pounded and steamed by hand every morning before sunrise.',
    iconBgColor: '#e0f2fe',
    iconColor: '#0284c7',
  },
  {
    icon: 'restaurant-outline',
    title: 'Sweetness Level',
    description: 'Carefully balanced for a subtle, floral sweetness (2/5 stars).',
    iconBgColor: '#fef3c7',
    iconColor: '#d97706',
  },
];

export default function MochiDetailsScreen() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState('Classic Pink');
  const [activeTab, setActiveTab] = useState<TabType>('explore');

  const basePrice = 4.5;
  const totalPrice = basePrice * quantity;

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    Alert.alert(
      'Añadido al carrito',
      `Has agregado ${quantity} x Strawberry Dream Mochi (${selectedFlavor}) por $${totalPrice.toFixed(
        2
      )}.`
    );
  };

  const handleTabPress = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'home') {
      router.replace('/dashboard' as any);
    } else if (tab === 'cart') {
      router.push('/cart' as any);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={ThemeTokens.colors.background} />

      <DetailHeaderBar
        onBackPress={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MochiHeroSection
          name="Strawberry Dream Mochi"
          price={basePrice}
          description="A cloud-like pillow of premium rice dough infused with natural beet juice, enveloping a whole, sun-ripened strawberry and sweet white bean paste."
          imageUri="https://lh3.googleusercontent.com/aida-public/AB6AXuBQF8yZAMaqXaUVW42FAJ8yH0--9nuYdxgZ_4cIAf8Yz6Yls-3DxTVttpgFKUlCNPsGdFgkcGd7qcYMC-OKQxfwXO_VxmD3nq8odhZTHtKSopzLd5TfAS1ZFuIbgxCVQMyXKjaZYTQ7Y1rCfJ5PR85Xc-_SfaxZwzoONf5_KzNrtDIOPNqQm952Xk-_m4CPkrnpegmzwuwH5v137ViSa-9v00xkzoE3pbMdbiviLQI_osv_zWe42_7fKLZctE2-9FUIlpLDAoeECqec"
          isSeasonal={true}
          quantity={quantity}
          onIncrementQuantity={handleIncrement}
          onDecrementQuantity={handleDecrement}
        />

        <FlavorProfileSelector
          options={FLAVOR_OPTIONS}
          selectedOption={selectedFlavor}
          onSelectOption={setSelectedFlavor}
        />

        <FeatureBentoGrid features={BENTO_FEATURES} />

        <StoryNarrativeSection
          title="The Secret of the 'Dream'"
          narrativeText="What makes our Strawberry Dream unique is the texture—the 'Mochi-Mochi' feel. We use traditional Mochitsuki methods, pounding the dough over 1,000 times to achieve a silkiness that melts the moment it touches the palate."
          rating={4.9}
          reviewCountString="2k+"
          processImageUri="https://lh3.googleusercontent.com/aida-public/AB6AXuBSJyS66yry3LNvGKpVlU9ULnpi73oYyNEWFAzkKMDA7ulISZ6kDORWI3iIVas4CXOvw5oTLcYQoJ0T9QpD74sQxvrCqheNIA31lGD4qvyunQtCHWaEVRknSRHKSHRNXildbrSznJoeLBme6sozItnraDyibEB2BMk9K3RtkLUmj4LAgIVzwrK3AOJXaHUmc9xY7Yf04mRJ24r4QswKXNqsPafqV53INpRjJCJcdUnr3cw7QOMxWfhcfkrZxSgsb-KVcYmBX2aU7AAC"
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <AddToCartBar totalPrice={totalPrice} onAddToCart={handleAddToCart} />
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
    paddingBottom: 140,
  },
  bottomSpacer: {
    height: 40,
  },
});
