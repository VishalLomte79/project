import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Category } from '../api/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface CategorySelectorProps {
    categories: Category[];
    selectedCategoryId: number | null;
    onSelectCategory: (id: number) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
    categories,
    selectedCategoryId,
    onSelectCategory,
}) => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <TouchableOpacity
                    style={[
                        styles.categoryItem,
                        selectedCategoryId === null && styles.selectedCategoryItem,
                    ]}
                    onPress={() => onSelectCategory(0)} // 0 or null for 'All'
                >
                    <Text
                        style={[
                            styles.categoryText,
                            selectedCategoryId === null && styles.selectedCategoryText,
                        ]}
                    >
                        All
                    </Text>
                </TouchableOpacity>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryItem,
                            selectedCategoryId === category.id && styles.selectedCategoryItem,
                        ]}
                        onPress={() => onSelectCategory(category.id)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategoryId === category.id && styles.selectedCategoryText,
                            ]}
                        >
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.md,
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingHorizontal: spacing.md,
        gap: spacing.sm,
    },
    categoryItem: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: 'transparent',
    },
    selectedCategoryItem: {
        backgroundColor: colors.primary,
    },
    categoryText: {
        color: colors.primary,
        fontFamily: typography.fontFamily.body,
        fontSize: typography.size.sm,
        fontWeight: '600',
    },
    selectedCategoryText: {
        color: colors.background, // Contrast text for selected state
    },
});
