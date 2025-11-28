import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, useWindowDimensions, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { MainTabParamList } from '../navigation/AppNavigator';
import { MenuSection } from '../components/sections/MenuSection';
import { ChefsSection } from '../components/sections/ChefsSection';
import { ContactSection } from '../components/sections/ContactSection';

type HomeScreenNavigationProp = NativeStackNavigationProp<MainTabParamList, 'Home'>;

export const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const { width, height } = useWindowDimensions();
    const isLargeScreen = width > 768;

    const scrollToMenu = () => {
        // In a real implementation with refs, we could scroll to the section.
        // For now, we can just navigate to the Menu tab if we want, or just let the user scroll down.
        // Since the user asked for "scrollable", we'll just let them scroll.
        // But the button says "OUR MENU", so maybe it should scroll down?
        // We'll leave it as is for now, or maybe navigate to the Menu tab which is also fine.
        navigation.navigate('Menu');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' }}
                style={[styles.background, { minHeight: height }]}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <View style={[styles.contentContainer, isLargeScreen && styles.contentContainerLarge]}>
                        <Text style={[styles.title, isLargeScreen && styles.titleLarge]}>
                            Welcome to <Text style={styles.highlight}>Restaurantly</Text>
                        </Text>
                        <Text style={[styles.subtitle, isLargeScreen && styles.subtitleLarge]}>
                            Delivering great food for more than 18 years!
                        </Text>

                        <View style={[styles.buttonContainer, isLargeScreen && styles.buttonContainerLarge]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={scrollToMenu}
                            >
                                <Text style={styles.buttonText}>OUR MENU</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
                                <Text style={styles.buttonText}>BOOK A TABLE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>

            <MenuSection />
            <ChefsSection />
            <ContactSection />

            {/* Footer / Copyright */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2025 Restaurantly. All Rights Reserved.</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
    },
    contentContainer: {
        width: '100%',
        alignItems: 'center',
    },
    contentContainerLarge: {
        width: '60%',
        alignItems: 'flex-start',
    },
    title: {
        fontFamily: typography.fontFamily.heading,
        fontSize: typography.size.xxl,
        fontWeight: typography.weight.bold,
        color: colors.text,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    titleLarge: {
        fontSize: typography.size.display,
        textAlign: 'left',
    },
    highlight: {
        color: colors.primary,
    },
    subtitle: {
        fontFamily: typography.fontFamily.body,
        fontSize: typography.size.md,
        color: '#eee',
        textAlign: 'center',
        marginBottom: spacing.xl,
        lineHeight: 24,
    },
    subtitleLarge: {
        fontSize: typography.size.xl,
        textAlign: 'left',
    },
    buttonContainer: {
        flexDirection: 'column',
        width: '100%',
        gap: spacing.md,
    },
    buttonContainerLarge: {
        flexDirection: 'row',
        width: 'auto',
    },
    button: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 150,
    },
    buttonOutline: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
    },
    buttonText: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 1,
    },
    footer: {
        padding: spacing.lg,
        backgroundColor: '#000',
        alignItems: 'center',
    },
    footerText: {
        color: colors.textSecondary,
        fontSize: 12,
    }
});
