import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, useWindowDimensions } from 'react-native';
import { fetchChefs } from '../api/api';
import { Chef } from '../api/types';
import { ChefCard } from '../components/ChefCard';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export const ChefsScreen = () => {
    const { width } = useWindowDimensions();
    const isLargeScreen = width > 768;
    const [chefs, setChefs] = useState<Chef[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadChefs();
    }, []);

    const loadChefs = async () => {
        try {
            const data = await fetchChefs();
            setChefs(data);
        } catch (error) {
            console.error('Failed to load chefs', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Our Pro <Text style={styles.highlight}>Chefs</Text></Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
            ) : (
                <FlatList
                    data={chefs}
                    renderItem={({ item }) => <ChefCard chef={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    numColumns={isLargeScreen ? 2 : 1}
                    key={isLargeScreen ? 'large' : 'small'}
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
        marginBottom: spacing.md,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        fontFamily: 'serif',
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
        justifyContent: 'flex-start',
    },
});
