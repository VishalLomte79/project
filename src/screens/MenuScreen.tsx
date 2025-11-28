import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchCategories, fetchMenu } from '../api/api';
import { Category, MenuItem } from '../api/types';
import { CategorySelector } from '../components/CategorySelector';
import { MenuItemCard } from '../components/MenuItemCard';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { RootStackParamList } from '../navigation/AppNavigator';

type MenuScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MenuScreen = () => {
    const navigation = useNavigation<MenuScreenNavigationProp>();
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
                <FlatList
                    data={menuItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    numColumns={isLargeScreen ? 2 : 1}
                    key={isLargeScreen ? 'large' : 'small'} // Force re-render when columns change
                    columnWrapperStyle={isLargeScreen ? styles.columnWrapper : undefined}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: spacing.lg,
    },
    header: {
        paddingHorizontal: spacing.md,
        marginBottom: spacing.sm,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        fontFamily: 'serif', // Or use theme typography
    },
    highlight: {
        color: colors.primary,
    },
    loader: {
        marginTop: spacing.xl,
    },
    listContent: {
        padding: spacing.md,
        paddingBottom: spacing.xxl,
    },
    columnWrapper: {
        justifyContent: 'flex-start', // Or space-between
    },
});
