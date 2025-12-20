import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const W_StartScreen = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoRow}>
                    <Image
                        source={require('../assets/images/logoManager.png')} // Add your logo image here
                        style={styles.logo}
                    />
                </View>
                <View style={styles.navRow}>
                    <TouchableOpacity
                        style={[styles.navBtn, styles.activeBtn]}
                        onPress={() => router.push('/W_StartScreen')}>
                        <Text style={[styles.navText, styles.activeText]}>HOME</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navBtn}
                        onPress={() => router.push('/(auth)/W_LoginScreen')}
                    >
                        <Text style={styles.navText}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navBtn}
                        onPress={() => router.push('/(auth)/W_SignUpScreen')}
                    >
                        <Text style={styles.navText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <View style={styles.leftContent}>
                    <Image
                        source={require('../assets/images/mainPic.png')}
                        style={styles.joinImage}
                    ></Image>
                </View>
                <View style={styles.rightContent}>
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => router.push('/(auth)/W_LoginScreen')}
                    >
                        <Text style={styles.loginBtnText}>LOGIN</Text>
                    </TouchableOpacity>
                    <Text style={styles.orText}>or</Text>
                    <TouchableOpacity
                        style={styles.signupBtn}
                        onPress={() => router.push('/(auth)/W_SignUpScreen')}
                    >
                        <Text style={styles.signupBtnText}>SIGNUP</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.footerUnder}>
                    <View style={styles.footerLogoRow}>
                        <Image source={require('../assets/images/logoManager.png')} style={styles.footerLogo} />
                    </View>
                    <View style={styles.footerNavRow}>
                        <Text style={styles.footerNavText}>HOME</Text>
                        <Text style={styles.footerNavText}>LOGIN</Text>
                        <Text style={styles.footerNavText}>SIGNUP</Text>
                        <Text style={styles.footerNavText}>PRIVACY POLICY</Text>
                        <Text style={styles.footerNavText}>TERMS & CONDITIONS</Text>
                    </View>
                </View>

                <Text style={styles.copyright}>
                    © 2025 · EggOEgg · All rights reserved
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebeb',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 40,
        paddingVertical: 16,
        marginTop: 24,
        marginHorizontal: 24,
        borderRadius: 30,
        width: '50%',
        alignSelf: 'center',
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 155,
        height: 40,
        marginRight: 8,
    },
    brand: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#d17878',
    },
    manager: {
        fontSize: 11,
        color: '#b86d6d',
    },
    navRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navBtn: {
        marginHorizontal: 8,
        paddingHorizontal: 18,
        paddingVertical: 6,
        borderRadius: 10,
    },
    navText: {
        fontWeight: 'bold',
        color: '#fa8888',
    },
    activeBtn: {
        backgroundColor: '#fa8888',
    },
    activeText: {
        color: '#fff',
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 60,
    },
    leftContent: {
        flex: 3,
        justifyContent: 'center',
    },
    joinText: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#f8b8b8',
        letterSpacing: 4,
    },
    logoRowContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    logoContent: {
        width: 32,
        height: 32,
        marginRight: 8,
    },
    joinImage: {
        width: 832,
        height: 600,
        resizeMode: 'contain',
        marginRight: 8,
    },
    brandContent: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#b86d6d',
    },
    withText: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#f8b8b8',
        letterSpacing: 4,
    },
    usText: {
        color: '#a44237',
        fontStyle: 'italic',
    },
    rightContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBtn: {
        borderWidth: 1,
        borderColor: '#d17878',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 6,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    loginBtnText: {
        color: '#b86d6d',
        fontWeight: 'bold',
        fontSize: 18,
    },
    orText: {
        color: '#a44237',
        marginVertical: 6,
    },
    signupBtn: {
        backgroundColor: '#d17878',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 6,
    },
    signupBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        paddingVertical: 24,
        paddingHorizontal: 60,
        borderTopWidth: 8,
        borderTopColor: '#ebebeb',
        alignItems: 'flex-end',
    },

    footerUnder: {
        width: '100%',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    footerLogoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    footerLogo: {
        width: 155,
        height: 40,
        marginRight: 8,
    },
    footerBrand: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#a44237',
    },
    footerManager: {
        fontSize: 12,
        color: '#b86d6d',
    },
    footerNavRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 8,
        flexWrap: 'wrap',
        gap: 32,
    },
    footerNavText: {
        marginHorizontal: 18,
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.25)',
        fontWeight: 'bold',
    },
    copyright: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
});

export default W_StartScreen;