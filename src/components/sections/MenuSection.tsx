import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchCategories, fetchMenu } from '../../api/api';
import { Category, MenuItem } from '../../api/types';
import { CategorySelector } from '../CategorySelector';
import { MenuItemCard } from '../MenuItemCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { RootStackParamList } from '../../navigation/AppNavigator';

type MenuSectionNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MenuSection = () => {
    const navigation = useNavigation<MenuSectionNavigationProp>();
    const { width } = useWindowDimensions();
    const isLargeScreen = width > 768;

    const [categories, setCategories] = useState<Category[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCategories();
        loadMenu();
    }, []);

    useEffect(() => {
        loadMenu(selectedCategoryId);
    }, [selectedCategoryId]);

    const loadCategories = async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch (error) {
            console.error('Failed to load categories', error);
        }
    };

    const loadMenu = async (categoryId?: number | null) => {
        setLoading(true);
        try {
            // If categoryId is 0 or null, we fetch all (pass undefined to api)
            const data = await fetchMenu(categoryId === 0 ? undefined : categoryId || undefined);
            setMenuItems(data);
        } catch (error) {
            console.error('Failed to load menu', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategorySelect = (id: number) => {
        setSelectedCategoryId(id === 0 ? null : id);
    };

    const renderItem = ({ item }: { item: MenuItem }) => (
        <MenuItemCard
            item={item}
            onPress={() => navigation.navigate('ItemDetail', { item })}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>MENU</Text>
                <Text style={styles.title}>Check our tasty <Text style={styles.highlight}>Menu</Text></Text>
            </View>

            <CategorySelector
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={handleCategorySelect}
            />

            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
            ) : (
                // We use a View instead of FlatList here because this will likely be inside a ScrollView (Home)
                // But for performance in standalone, FlatList is better.
                // However, nesting FlatList in ScrollView is bad.
                // We will map the items manually if we are in a ScrollView context, or use FlatList if standalone.
                // For simplicity in this "Section" component which is intended for the Home ScrollView, we'll map.
                <View style={[styles.listContent, isLargeScreen && styles.listContentLarge]}>
                    {menuItems.map(item => (
                        <View key={item.id} style={isLargeScreen ? styles.gridItem : styles.listItem}>
                            {renderItem({ item })}
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.xxl,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: spacing.md,
        marginBottom: spacing.lg,
        alignItems: 'center',
    },
    sectionTitle: {
        color: colors.textSecondary,
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: spacing.xs,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.text,
        fontFamily: 'serif',
        textAlign: 'center',
    },
    highlight: {
        color: colors.primary,
    },
    loader: {
        marginTop: spacing.xl,
    },
    listContent: {
        padding: spacing.md,
        flexDirection: 'column',
    },
    listContentLarge: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    listItem: {
        width: '100%',
    },
    gridItem: {
        width: '49%',
    }
});
