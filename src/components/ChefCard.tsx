import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { Chef } from '../api/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface ChefCardProps {
    chef: Chef;
}

export const ChefCard: React.FC<ChefCardProps> = ({ chef }) => {
    const { width } = useWindowDimensions();
    const isLargeScreen = width > 768;

    return (
        <View style={[styles.container, isLargeScreen && styles.containerLarge]}>
            <Image source={{ uri: chef.imageUrl }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.name}>{chef.name}</Text>
                <Text style={styles.role}>{chef.role}</Text>
                <Text style={styles.bio}>{chef.bio}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.cardBackground,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: spacing.lg,
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    containerLarge: {
        width: '48%',
        marginRight: '2%',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    content: {
        padding: spacing.lg,
        alignItems: 'center',
    },
    name: {
        fontFamily: typography.fontFamily.heading,
        fontSize: typography.size.xl,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    role: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.size.sm,
        color: colors.textSecondary,
        marginBottom: spacing.md,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    bio: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.size.sm,
        color: colors.text,
        textAlign: 'center',
        fontStyle: 'italic',
    },
});
