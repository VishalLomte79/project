import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export const ContactScreen = () => {
    const { width } = useWindowDimensions();
    const isLargeScreen = width > 768;

    const openMap = () => {
        Linking.openURL('https://maps.google.com');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
                <Text style={styles.title}>Contact <Text style={styles.highlight}>Us</Text></Text>
            </View>

            <View style={[styles.container, isLargeScreen && styles.containerLarge]}>
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
                    {/* Placeholder Map Image */}
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }}
                        style={styles.mapImage}
                    />
                    <View style={styles.mapOverlay}>
                        <Text style={styles.mapText}>View on Google Maps</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        backgroundColor: colors.background,
        paddingTop: spacing.lg,
        alignItems: 'center',
    },
    header: {
        paddingHorizontal: spacing.md,
        marginBottom: spacing.xl,
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
    container: {
        width: '100%',
        paddingHorizontal: spacing.md,
        gap: spacing.xl,
    },
    containerLarge: {
        flexDirection: 'row',
        width: '90%',
        maxWidth: 1200,
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
        backgroundColor: 'rgba(205, 164, 94, 0.1)', // Primary with opacity
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
