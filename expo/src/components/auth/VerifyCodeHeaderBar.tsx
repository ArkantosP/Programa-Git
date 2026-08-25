import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';

interface VerifyCodeHeaderBarProps {
  onBackPress?: () => void;
  onHelpPress?: () => void;
}

export const VerifyCodeHeaderBar: React.FC<VerifyCodeHeaderBarProps> = ({
  onBackPress,
  onHelpPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onBackPress}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color={ThemeTokens.colors.primary} />
      </TouchableOpacity>

      <Text style={styles.titleText}>Michi Mochi</Text>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={onHelpPress}
        activeOpacity={0.7}
      >
        <Ionicons
          name="help-circle-outline"
          size={24}
          color={ThemeTokens.colors.primary}
        />
      </TouchableOpacity>
    </View>
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
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    letterSpacing: -0.5,
  },
});
