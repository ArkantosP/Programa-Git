import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';

interface TextFieldProps extends TextInputProps {
  label: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  isPassword?: boolean;
  error?: string;
  rightHeaderAction?: {
    label: string;
    onPress: () => void;
  };
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  iconName,
  isPassword = false,
  error,
  rightHeaderAction,
  style,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>{label}</Text>
        {rightHeaderAction ? (
          <TouchableOpacity activeOpacity={0.7} onPress={rightHeaderAction.onPress}>
            <Text style={styles.rightHeaderActionText}>{rightHeaderAction.label}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.focusedInputWrapper,
          !!error && styles.errorInputWrapper,
        ]}
      >
        {iconName ? (
          <MaterialIcons
            name={iconName}
            size={20}
            color={ThemeTokens.colors.outline}
            style={styles.leftIcon}
          />
        ) : null}

        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={`${ThemeTokens.colors.outline}80`}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {isPassword ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.rightIconContainer}
          >
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color={ThemeTokens.colors.outline}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: ThemeTokens.colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  rightHeaderActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: ThemeTokens.colors.outlineVariant,
    borderRadius: ThemeTokens.borderRadius.full,
    paddingHorizontal: 16,
    height: 52,
  },
  focusedInputWrapper: {
    borderColor: ThemeTokens.colors.primary,
    borderWidth: 1.5,
  },
  errorInputWrapper: {
    borderColor: ThemeTokens.colors.error,
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: ThemeTokens.colors.onSurface,
    height: '100%',
  },
  rightIconContainer: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: ThemeTokens.colors.error,
    marginTop: 4,
    marginLeft: 16,
  },
});
