import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, useWindowDimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { VideoPlayer } from '../components/VideoPlayer';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type ItemDetailScreenRouteProp = RouteProp<RootStackParamList, 'ItemDetail'>;

export const ItemDetailScreen = () => {
    const route = useRoute<ItemDetailScreenRouteProp>();
    const { item } = route.params;
    const { width } = useWindowDimensions();
    const isLargeScreen = width > 768;

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={[styles.container, isLargeScreen && styles.containerLarge]}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>${item.price}</Text>
                    </View>

                    <Text style={styles.description}>{item.description}</Text>

                    {item.videoUrl ? (
                        <View style={styles.videoContainer}>
                            <Text style={styles.sectionTitle}>Watch how it's made</Text>
                            <VideoPlayer videoUrl={item.videoUrl} />
                        </View>
                    ) : null}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
    },
    container: {
        width: '100%',
        backgroundColor: colors.background,
    },
    containerLarge: {
        width: '80%',
        maxWidth: 1000,
        marginTop: spacing.lg,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: colors.cardBackground,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    content: {
        padding: spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    name: {
        fontFamily: typography.fontFamily.heading,
        fontSize: typography.size.xxl,
        fontWeight: 'bold',
        color: colors.primary,
        flex: 1,
    },
    price: {
        fontFamily: typography.fontFamily.heading,
        fontSize: typography.size.xl,
        fontWeight: 'bold',
        color: colors.text,
    },
    description: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.size.md,
        color: colors.textSecondary,
        lineHeight: 24,
        marginBottom: spacing.xl,
    },
    videoContainer: {
        marginTop: spacing.md,
    },
    sectionTitle: {
        fontFamily: typography.fontFamily.heading,
        fontSize: typography.size.lg,
        color: colors.text,
        marginBottom: spacing.sm,
    },
});
