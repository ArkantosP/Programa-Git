import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  children?: React.ReactNode;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onPress,
  children,
  error,
}) => {
  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.container}
      >
        <View
          style={[
            styles.checkbox,
            checked && styles.checkedBox,
            !!error && styles.errorBox,
          ]}
        >
          {checked ? (
            <MaterialIcons
              name="check"
              size={16}
              color={ThemeTokens.colors.onPrimary}
            />
          ) : null}
        </View>

        {children ? <View style={styles.labelContainer}>{children}</View> : null}
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginVertical: 12,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: ThemeTokens.colors.outlineVariant,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
  },
  checkedBox: {
    backgroundColor: ThemeTokens.colors.primary,
    borderColor: ThemeTokens.colors.primary,
  },
  errorBox: {
    borderColor: ThemeTokens.colors.error,
  },
  labelContainer: {
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    color: ThemeTokens.colors.error,
    marginTop: 4,
    marginLeft: 32,
  },
});
