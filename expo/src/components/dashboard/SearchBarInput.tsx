import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/constants/tokens';

interface SearchBarInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBarInput: React.FC<SearchBarInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Find your mochi flavor...',
}) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={20}
        color={ThemeTokens.colors.primary}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={`${ThemeTokens.colors.onSurfaceVariant}80`}
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeTokens.colors.surfaceContainerLow,
    borderRadius: ThemeTokens.borderRadius.full,
    paddingHorizontal: ThemeTokens.spacing.md,
    height: 50,
    marginBottom: ThemeTokens.spacing.md,
  },
  searchIcon: {
    marginRight: ThemeTokens.spacing.sm,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: ThemeTokens.colors.onSurface,
    fontWeight: '400',
  },
});
