import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';
import { ProfileMenuModal } from '@/components/shared/ProfileMenuModal';

interface TopHeaderBarProps {
  onProfilePress?: () => void;
}

export const TopHeaderBar: React.FC<TopHeaderBarProps> = ({ onProfilePress }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handlePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      setMenuVisible(true);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.sideSpacer} />
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Michi Mochi</Text>
          <Text style={styles.logoSubtext}>🍡</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => setMenuVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="person-circle-outline" size={32} color={ThemeTokens.colors.primary} />
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
  sideSpacer: {
    width: 32,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ThemeTokens.spacing.xs,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    letterSpacing: -0.5,
  },
  logoSubtext: {
    fontSize: 20,
  },
  profileButton: {
    width: 32,
    alignItems: 'flex-end',
  },
});
