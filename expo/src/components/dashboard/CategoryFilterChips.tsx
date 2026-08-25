import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemeTokens } from '@/constants/tokens';

interface CategoryFilterChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilterChips: React.FC<CategoryFilterChipsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => {
        const isSelected = category === selectedCategory;
        return (
          <TouchableOpacity
            key={category}
            style={[
              styles.chip,
              isSelected ? styles.chipSelected : styles.chipUnselected,
            ]}
            onPress={() => onSelectCategory(category)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.chipText,
                isSelected ? styles.chipTextSelected : styles.chipTextUnselected,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ThemeTokens.spacing.sm,
    gap: ThemeTokens.spacing.sm,
    marginBottom: ThemeTokens.spacing.lg,
  },
  chip: {
    paddingHorizontal: ThemeTokens.spacing.lg,
    paddingVertical: ThemeTokens.spacing.sm,
    borderRadius: ThemeTokens.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: ThemeTokens.colors.primaryContainer,
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
