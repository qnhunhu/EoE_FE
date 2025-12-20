import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Config from '../../constants';
import { useAuth } from '../../contexts/AuthContent';
const W_LoginScreen = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLoggedIn, setUserId, setRole } = useAuth();
    const handleLogin = async () => {
        try {
            const response = await axios.post(`${Config.API_BASE_URL}/api/Auth/login`, {
                email:username,
              password
            });
            if (response.status === 200) {
                setIsLoggedIn(true);
                setUserId(response.data.userId);
                setRole(response.data.role);
                
                if (response.data.role=== 'Admin') {
                    router.push('/(admin-tabs)/UserManagement')
                } else if (response.data.role === 'Seller') {
                    router.push('/(seller-tabs)/ProductManagement')
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Invalid credentials. Please try again.');
          }
    }
    
   
    return (
        <View style={styles.bg}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoRow}>
                    <Image
                        source={require('../../assets/images/logoManager.png')} // Add your logo image here
                        style={styles.logo}
                    />
                </View>
                <View style={styles.navRow}>
                    <TouchableOpacity
                        style={styles.navBtn}
                        onPress={() => router.push('/W_StartScreen')}>
                        <Text style={styles.navText}>HOME</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.navBtn, styles.activeBtn]}
                        onPress={() => router.push('/(auth)/W_LoginScreen')}
                    >
                        <Text style={[styles.navText, styles.activeText]}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navBtn}
                        onPress={() => router.push('/(auth)/W_SignUpScreen')}
                    >
                        <Text style={styles.navText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Login Box */}
            <View style={styles.content}>
                <View style={styles.centerBox}>
                    <Text style={styles.loginTitle}>LOGIN</Text>
                    <View style={styles.loginRow}>
                        {/* Left: Form */}
                        <View style={styles.formCol}>
                            <TextInput
                                style={styles.input}
                                placeholder="Username"
                                placeholderTextColor="#bdbdbd"
                                onChangeText={setUsername}
                            />
                            <View style={{ width: '100%' }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Passwords"
                                    placeholderTextColor="#bdbdbd"
                                    secureTextEntry
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity style={styles.forgotBtn}>
                                    <Text style={styles.forgotText}>Forgot password?</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
                                <Text style={styles.loginBtnText}>LOGIN</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Middle: or */}
                        <View style={styles.orCol}>
                            <Text style={styles.orText}>or</Text>
                        </View>
                        {/* Right: Social */}
                        <View style={styles.socialCol}>
                            <TouchableOpacity style={styles.socialBtn}>
                                <Image
                                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
                                    style={styles.socialIcon}
                                />
                                <Text style={styles.socialText}>Continue with Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialBtn}>
                                <Image
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' }}
                                    style={styles.socialIcon}
                                />
                                <Text style={styles.socialText}>Continue with LinkedIn</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>


            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.footerUnder}>
                    <View style={styles.footerLogoRow}>
                        <Image source={require('../../assets/images/logoManager.png')} style={styles.footerLogo} />
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
    bg: {
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
        justifyContent: 'center',
        paddingHorizontal: 60,
    },
    centerBox: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 36,
        width: 600,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        elevation: 8,
        marginBottom: 112,
    },
    loginTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#a44237',
        alignSelf: 'center',
        marginBottom: 24,
        letterSpacing: 2,
    },
    loginRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 8,
    },
    formCol: {
        flex: 1.2,
    },
    input: {
        borderWidth: 1,
        borderColor: '#bdbdbd',
        borderRadius: 6,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 14,
        backgroundColor: '#fff',
    },
    forgotBtn: {

    },
    forgotText: {
        fontSize: 12,
        color: '#1a4d5c',
        fontStyle: 'italic',
        textAlign: 'right',
    },
    loginBtn: {
        backgroundColor: '#a44237',
        borderRadius: 20,
        paddingVertical: 10,
        marginTop: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    loginBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 1,
    },
    orCol: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 18,
    },
    orText: {
        color: '#a44237',
        fontWeight: 'bold',
        fontSize: 16,
    },
    socialCol: {
        flex: 1.2,
        justifyContent: 'center',
    },
    socialBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginBottom: 14,
    },
    socialIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    socialText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#222',
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

export default W_LoginScreen;

