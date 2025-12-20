
import { Colors } from '@/constants/Colors';
import { Platform, StyleSheet } from 'react-native';

const theme = Colors.light; // We can make this dynamic later if needed

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: theme.background,
    },
    safeArea: {
        flex: 1,
        backgroundColor: theme.background,
    },
    /* Typography */
    h1: {
        fontSize: 32,
        fontWeight: '700',
        color: theme.primary,
        marginBottom: 8,
    },
    h2: {
        fontSize: 24,
        fontWeight: '700',
        color: theme.primary,
        marginBottom: 8,
    },
    h3: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.text.primary,
        marginBottom: 4,
    },
    body1: {
        fontSize: 16,
        color: theme.text.primary,
        lineHeight: 24,
    },
    body2: {
        fontSize: 14,
        color: theme.text.secondary,
        lineHeight: 20,
    },
    caption: {
        fontSize: 12,
        color: theme.text.secondary,
    },

    /* Layout Utilities */
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    card: {
        backgroundColor: theme.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
            },
            android: {
                elevation: 3,
            },
        }),
    },

    /* Input Fields */
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.text.primary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: theme.surface,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: theme.text.primary,
        borderWidth: 1,
        borderColor: theme.border,
    },

    /* Buttons */
    btnPrimary: {
        backgroundColor: theme.primary,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: theme.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    btnPrimaryText: {
        color: theme.text.light,
        fontSize: 16,
        fontWeight: '700',
    },
    btnSecondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.primary,
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnSecondaryText: {
        color: theme.primary,
        fontSize: 16,
        fontWeight: '600',
    },

    /* Specific overrides for legacy support during migration */
    title: { // Keeping for backward compatibility temporarily
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    p2Regular: { // Keeping for backward compatibility
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 16,
        color: theme.text.secondary
    },
    p2SemiBold: {
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 16,
        color: theme.text.primary
    },
    h4: {
        fontWeight: '600',
        fontSize: 19,
        lineHeight: 23,
    }
});

export default globalStyles;