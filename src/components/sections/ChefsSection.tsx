import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, useWindowDimensions } from 'react-native';
import { fetchChefs } from '../../api/api';
import { Chef } from '../../api/types';
import { ChefCard } from '../ChefCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const ChefsSection = () => {
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
                <Text style={styles.sectionTitle}>CHEFS</Text>
                <Text style={styles.title}>Our Pro <Text style={styles.highlight}>Chefs</Text></Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
            ) : (
                <View style={[styles.listContent, isLargeScreen && styles.listContentLarge]}>
                    {chefs.map(item => (
                        <View key={item.id} style={isLargeScreen ? styles.gridItem : styles.listItem}>
                            <ChefCard chef={item} />
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
        gap: spacing.md,
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
