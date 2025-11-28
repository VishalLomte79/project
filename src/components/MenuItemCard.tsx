import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { MenuItem } from '../api/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface MenuItemCardProps {
    item: MenuItem;
    onPress: () => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onPress }) => {
    const { width } = useWindowDimensions();
    const isLargeScreen = width > 768;

    return (
        <TouchableOpacity
            style={[styles.container, isLargeScreen && styles.containerLarge]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
                <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.cardBackground,
        borderRadius: 8,
        marginBottom: spacing.md,
        overflow: 'hidden',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 3,
    },
    containerLarge: {
        width: '48%', // 2 columns on large screens
        marginRight: '2%',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40, // Circular image as per template style often used, or just square
        margin: spacing.sm,
        // If we want square image on the left:
        // width: 100, height: '100%', borderRadius: 0, margin: 0
    },
    content: {
        flex: 1,
        padding: spacing.sm,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    name: {
        fontFamily: typography.fontFamily.heading,
        fontSize: typography.size.md,
        fontWeight: 'bold',
        color: colors.text,
        flex: 1,
    },
    price: {
        fontFamily: typography.fontFamily.heading,
        fontSize: typography.size.md,
        fontWeight: 'bold',
        color: colors.primary,
    },
    description: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.size.sm,
        color: colors.textSecondary,
        fontStyle: 'italic',
    },
});
