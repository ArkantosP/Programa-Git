import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';

export type TabType = 'home' | 'explore' | 'cart' | 'profile';

interface BottomNavBarProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  const tabs: Array<{ id: TabType; label: string; icon: keyof typeof Ionicons.glyphMap; iconActive: keyof typeof Ionicons.glyphMap }> = [
    { id: 'home', label: 'Home', icon: 'home-outline', iconActive: 'home' },
    { id: 'explore', label: 'Explore', icon: 'compass-outline', iconActive: 'compass' },
    { id: 'cart', label: 'Cart', icon: 'cart-outline', iconActive: 'cart' },
    { id: 'profile', label: 'Profile', icon: 'person-outline', iconActive: 'person' },
  ];

  return (
    <View style={styles.outerContainer} pointerEvents="box-none">
      <View style={styles.navBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabItem}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isActive ? tab.iconActive : tab.icon}
                size={22}
                color={
                  isActive
                    ? ThemeTokens.colors.primary
                    : `${ThemeTokens.colors.outline}90`
                }
              />
              <Text
                style={[
                  styles.tabLabel,
                  isActive ? styles.tabLabelActive : styles.tabLabelInactive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: ThemeTokens.borderRadius.full,
    paddingVertical: ThemeTokens.spacing.sm,
    paddingHorizontal: ThemeTokens.spacing.md,
    borderWidth: 1,
    borderColor: `${ThemeTokens.colors.primary}15`,
    ...ThemeTokens.shadows.soft,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ThemeTokens.spacing.sm,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tabLabelActive: {
    color: ThemeTokens.colors.primary,
  },
  tabLabelInactive: {
    color: `${ThemeTokens.colors.outline}90`,
  },
});
