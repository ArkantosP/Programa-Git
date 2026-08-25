import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { ThemeTokens } from '@/constants/tokens';

export type ButtonVariant = 'primary' | 'google' | 'outline';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}) => {
  const getContainerStyle = () => {
    switch (variant) {
      case 'google':
        return styles.googleContainer;
      case 'outline':
        return styles.outlineContainer;
      case 'primary':
      default:
        return styles.primaryContainer;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'google':
        return styles.googleText;
      case 'outline':
        return styles.outlineText;
      case 'primary':
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.baseContainer,
        getContainerStyle(),
        disabled && styles.disabledContainer,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary'
              ? ThemeTokens.colors.onPrimary
              : ThemeTokens.colors.primary
          }
        />
      ) : (
        <View style={styles.contentRow}>
          {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
          <Text style={[styles.baseText, getTextStyle(), textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: ThemeTokens.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  primaryContainer: {
    backgroundColor: ThemeTokens.colors.primary,
    ...ThemeTokens.shadows.soft,
  },
  googleContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: ThemeTokens.colors.outlineVariant,
    ...ThemeTokens.shadows.soft,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: ThemeTokens.colors.outlineVariant,
  },
  disabledContainer: {
    opacity: 0.6,
  },
  baseText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  primaryText: {
    color: ThemeTokens.colors.onPrimary,
  },
  googleText: {
    color: ThemeTokens.colors.onSurface,
  },
  outlineText: {
    color: ThemeTokens.colors.primary,
  },
});
