import { Platform } from 'react-native';

export const typography = {
    fontFamily: {
        heading: Platform.select({ ios: 'Georgia', android: 'serif', web: 'Playfair Display, serif' }),
        body: Platform.select({ ios: 'System', android: 'sans-serif', web: 'Open Sans, sans-serif' }),
    },
    size: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
        xxxl: 32,
        display: 48,
    },
    weight: {
        regular: '400',
        medium: '500',
        bold: '700',
    } as const, // Cast to const to satisfy TextStyle fontWeight type
};
