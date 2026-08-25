import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeTokens } from '@/constants/tokens';

interface FlavorProfileSelectorProps {
  options: string[];
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

export const FlavorProfileSelector: React.FC<FlavorProfileSelectorProps> = ({
  options,
  selectedOption,
  onSelectOption,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Select Flavor Profile</Text>
      <View style={styles.chipsRow}>
        {options.map((option) => {
          const isSelected = option === selectedOption;
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.chip,
                isSelected ? styles.chipSelected : styles.chipUnselected,
              ]}
              onPress={() => onSelectOption(option)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected ? styles.chipTextSelected : styles.chipTextUnselected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: ThemeTokens.spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: ThemeTokens.colors.primary,
    marginBottom: ThemeTokens.spacing.md,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ThemeTokens.spacing.sm,
  },
  chip: {
    paddingHorizontal: ThemeTokens.spacing.lg,
    paddingVertical: ThemeTokens.spacing.sm + 2,
    borderRadius: ThemeTokens.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: ThemeTokens.colors.primaryContainer,
    ...ThemeTokens.shadows.soft,
  },
  chipUnselected: {
    backgroundColor: ThemeTokens.colors.surfaceContainer,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#ffffff',
  },
  chipTextUnselected: {
    color: ThemeTokens.colors.primary,
  },
});
