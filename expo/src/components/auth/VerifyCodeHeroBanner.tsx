import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { ThemeTokens } from '@/constants/tokens';

interface VerifyCodeHeroBannerProps {
  imageSource?: any;
}

export const VerifyCodeHeroBanner: React.FC<VerifyCodeHeroBannerProps> = ({
  imageSource = require('@/assets/images/verify-code-banner.png'),
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={imageSource}
        style={styles.image}
        contentFit="contain"
        transition={300}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ThemeTokens.spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
