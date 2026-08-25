import React, { useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { ThemeTokens } from '@/constants/tokens';

interface OtpInputGroupProps {
  length?: number;
  value: string[];
  onChange: (digits: string[]) => void;
}

export const OtpInputGroup: React.FC<OtpInputGroupProps> = ({
  length = 4,
  value,
  onChange,
}) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChangeText = (text: string, index: number) => {
    const newDigits = [...value];
    const digit = text.slice(-1);
    newDigits[index] = digit;
    onChange(newDigits);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => {
        const isFocused = value[index] !== undefined && value[index] !== '';
        return (
          <TextInput
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            style={[
              styles.input,
              isFocused ? styles.inputFocused : styles.inputUnfocused,
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={value[index] || ''}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            selectTextOnFocus
            textAlign="center"
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: ThemeTokens.spacing.xl,
    gap: ThemeTokens.spacing.sm,
  },
  input: {
    width: 60,
    height: 60,
    borderRadius: 30,
    fontSize: 24,
    fontWeight: '800',
    color: ThemeTokens.colors.primary,
    backgroundColor: ThemeTokens.colors.surfaceContainerLowest,
    borderWidth: 2,
    ...ThemeTokens.shadows.soft,
  },
  inputUnfocused: {
    borderColor: `${ThemeTokens.colors.outlineVariant}60`,
  },
  inputFocused: {
    borderColor: ThemeTokens.colors.primary,
    backgroundColor: '#ffffff',
  },
});
