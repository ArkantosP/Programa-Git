import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';
import { ProfileMenuModal } from '@/components/shared/ProfileMenuModal';

interface BasketHeaderBarProps {
  onBackPress?: () => void;
  onProfilePress?: () => void;
}

export const BasketHeaderBar: React.FC<BasketHeaderBarProps> = ({
  onBackPress,
  onProfilePress,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onBackPress}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={ThemeTokens.colors.primary} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Michi Mochi</Text>
          <Text style={styles.logoEmoji}>🍡</Text>
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setMenuVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="person-circle-outline" size={28} color={ThemeTokens.colors.primary} />
        </TouchableOpacity>
      </View>
      <ProfileMenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ThemeTokens.spacing.md,
    paddingVertical: ThemeTokens.spacing.sm,
    backgroundColor: ThemeTokens.colors.background,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    letterSpacing: -0.5,
  },
  logoEmoji: {
    fontSize: 18,
  },
});
