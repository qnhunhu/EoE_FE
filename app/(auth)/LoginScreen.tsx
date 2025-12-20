
import globalStyles from '@/assets/styles/GlobalStyle';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContent';
import useLogin from '@/hooks/useLogin'; // Correct import path
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const { setIsLoggedIn, setUserId, setRole } = useAuth();
    const { login, loading, error } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        const user = await login({ email, password });
        if (user) {
            setIsLoggedIn(true);
            setUserId(user.userId);
            setRole(user.role);

            if (user.role === 'Distributor') {
                router.replace('/(distributor-tabs)/DistributorMainScreen');
            } else {
                router.replace('/(tabs)/HomeScreen');
            }
        } else {
            alert(error || 'Invalid credentials');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={globalStyles.container}
        >
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color={Colors.light.primary} />
            </TouchableOpacity>

            <Animated.ScrollView
                contentContainerStyle={[propsGlobal.scrollContent, { opacity: fadeAnim }]}
                showsVerticalScrollIndicator={false}
            >
                <View style={[globalStyles.center, { marginTop: 60, marginBottom: 40 }]}>
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={[globalStyles.h1, { marginTop: 16 }]}>Welcome Back</Text>
                    <Text style={globalStyles.body2}>Sign in to continue</Text>
                </View>

                {/* Email Input */}
                <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.label}>Email</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="mail-outline" size={20} color={Colors.light.text.secondary} style={styles.inputIcon} />
                        <TextInput
                            style={styles.inputField}
                            placeholder="user@example.com"
                            placeholderTextColor={Colors.light.text.secondary}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                {/* Password Input */}
                <View style={globalStyles.inputContainer}>
                    <Text style={globalStyles.label}>Password</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="lock-closed-outline" size={20} color={Colors.light.text.secondary} style={styles.inputIcon} />
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter your password"
                            placeholderTextColor={Colors.light.text.secondary}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                            <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={Colors.light.text.secondary} />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 30 }}>
                    <Text style={{ color: Colors.light.primary, fontWeight: '600' }}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[globalStyles.btnPrimary, loading && { opacity: 0.7 }]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={globalStyles.btnPrimaryText}>Login</Text>
                    )}
                </TouchableOpacity>

                <View style={[globalStyles.row, globalStyles.center, { marginTop: 30 }]}>
                    <Text style={globalStyles.body2}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/SignUpScreen')}>
                        <Text style={{ color: Colors.light.primary, fontWeight: '700' }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animated.ScrollView>
        </KeyboardAvoidingView>
    );
}

const propsGlobal = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    }
})

const styles = StyleSheet.create({
    backBtn: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        backgroundColor: Colors.light.surface,
        padding: 8,
        borderRadius: 20,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
            android: { elevation: 2 }
        })
    },
    logo: {
        width: 150,
        height: 100,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 10,
    },
    inputField: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
        color: Colors.light.text.primary,
    },
    eyeIcon: {
        padding: 4,
    }
});
