import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const ContactSection = () => {
    const { width } = useWindowDimensions();
    const isLargeScreen = width > 768;

    const openMap = () => {
        Linking.openURL('https://maps.google.com');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>CONTACT</Text>
                <Text style={styles.title}>Contact <Text style={styles.highlight}>Us</Text></Text>
            </View>

            <View style={[styles.contentContainer, isLargeScreen && styles.contentContainerLarge]}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="location-outline" size={24} color={colors.primary} />
                        </View>
                        <View>
                            <Text style={styles.infoTitle}>Location:</Text>
                            <Text style={styles.infoText}>A108 Adam Street, New York, NY 535022</Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="time-outline" size={24} color={colors.primary} />
                        </View>
                        <View>
                            <Text style={styles.infoTitle}>Open Hours:</Text>
                            <Text style={styles.infoText}>Monday-Saturday: 11:00 AM - 2300 PM</Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="mail-outline" size={24} color={colors.primary} />
                        </View>
                        <View>
                            <Text style={styles.infoTitle}>Email:</Text>
                            <Text style={styles.infoText}>info@example.com</Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="call-outline" size={24} color={colors.primary} />
                        </View>
                        <View>
                            <Text style={styles.infoTitle}>Call:</Text>
                            <Text style={styles.infoText}>+1 5589 55488 55</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={openMap} style={styles.mapContainer}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }}
                        style={styles.mapImage}
                    />
                    <View style={styles.mapOverlay}>
                        <Text style={styles.mapText}>View on Google Maps</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.xxl,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.md,
    },
    header: {
        marginBottom: spacing.xl,
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
    },
    highlight: {
        color: colors.primary,
    },
    contentContainer: {
        width: '100%',
        gap: spacing.xl,
    },
    contentContainerLarge: {
        flexDirection: 'row',
        width: '90%',
        maxWidth: 1200,
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    infoContainer: {
        flex: 1,
        gap: spacing.lg,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: spacing.md,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(205, 164, 94, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoTitle: {
        fontFamily: typography.fontFamily.heading,
        fontSize: typography.size.md,
        fontWeight: 'bold',
        color: colors.textSecondary,
        marginBottom: 4,
    },
    infoText: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.size.md,
        color: colors.text,
    },
    mapContainer: {
        flex: 1,
        height: 300,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
    },
    mapImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapText: {
        color: colors.text,
        fontSize: typography.size.lg,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});
