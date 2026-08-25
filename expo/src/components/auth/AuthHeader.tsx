import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { ThemeTokens } from '@/constants/tokens';

const BRAND_BANNER_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD-pjJFq7hqoCWc4NySG6hrnFNIFYQ72-jmbEu6iA7UkQiiXoV3e5O5ejwMoZLfn-9u2A3r3-TFzHY2x7KomhkzQtRM-SMw9pNi8qyBFBl3v5RJnwKVlFpxCmxEbY1aYachiGpspP2GuFDhnVNQ84NakT1SZjXP4oqfUOPjL0TtwOQI-r9ccDt2Fm-sOQavCT5rvWXkTZAxx7iqiGNd8s1gylcSbyPshFz98tTR9mbKpqRqEYl6G68t2BjgrKmJyGUc6_2ENnxk_LhfJQ8';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  showBanner?: boolean;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  showBanner = true,
}) => {
  return (
    <View style={styles.container}>
      {showBanner ? (
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: BRAND_BANNER_URL }}
            style={styles.bannerImage}
            contentFit="contain"
          />
        </View>
      ) : null}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 32,
  },
  bannerContainer: {
    width: 240,
    height: 80,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: ThemeTokens.colors.onSurfaceVariant,
    textAlign: 'center',
  },
});
