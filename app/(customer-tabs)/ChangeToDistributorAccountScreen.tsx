
import globalStyles from '@/assets/styles/GlobalStyle';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChangeToDistributorAccountScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isDistributor, setIsDistributor] = useState(false); // true = already have distributor account

    const router = useRouter();

    const handleSignUp = () => {
        if (!name || !email || !phone || !password) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        Alert.alert('Sign Up', 'Distributor account created successfully!');
        setIsDistributor(true);
        setName('');
        setPhone('');
        setPassword('');
    };

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }
        Alert.alert('Login', 'Switched to distributor mode successfully!');
        router.push('/(distributor-tabs)/DistributorMainScreen');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Distributor Access</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="briefcase" size={60} color={Colors.light.primary} />
                    </View>

                    <Text style={styles.title}>
                        {isDistributor ? 'Welcome Back!' : 'Become a Distributor'}
                    </Text>
                    <Text style={styles.subtitle}>
                        {isDistributor
                            ? 'Login to manage your distribution channel'
                            : 'Sign up to start distributing high quality eggs'}
                    </Text>

                    {!isDistributor ? (
                        <>
                            <View style={globalStyles.inputContainer}>
                                <Ionicons name="person-outline" size={20} color={Colors.light.text.secondary} style={globalStyles.inputIcon} />
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="Full Name"
                                    value={name}
                                    onChangeText={setName}
                                    placeholderTextColor={Colors.light.text.secondary}
                                />
                            </View>
                            <View style={globalStyles.inputContainer}>
                                <Ionicons name="mail-outline" size={20} color={Colors.light.text.secondary} style={globalStyles.inputIcon} />
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="Email Address"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholderTextColor={Colors.light.text.secondary}
                                />
                            </View>
                            <View style={globalStyles.inputContainer}>
                                <Ionicons name="call-outline" size={20} color={Colors.light.text.secondary} style={globalStyles.inputIcon} />
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="phone-pad"
                                    placeholderTextColor={Colors.light.text.secondary}
                                />
                            </View>
                            <View style={globalStyles.inputContainer}>
                                <Ionicons name="lock-closed-outline" size={20} color={Colors.light.text.secondary} style={globalStyles.inputIcon} />
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    placeholderTextColor={Colors.light.text.secondary}
                                />
                            </View>

                            <TouchableOpacity
                                style={[globalStyles.btnPrimary, { marginTop: 20 }]}
                                onPress={handleSignUp}
                            >
                                <Text style={globalStyles.btnPrimaryText}>Sign Up</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.switchBtn}
                                onPress={() => setIsDistributor(true)}
                            >
                                <Text style={styles.switchText}>Already have an account? <Text style={styles.linkText}>Login</Text></Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View style={globalStyles.inputContainer}>
                                <Ionicons name="mail-outline" size={20} color={Colors.light.text.secondary} style={globalStyles.inputIcon} />
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="Email Address"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholderTextColor={Colors.light.text.secondary}
                                />
                            </View>
                            <View style={globalStyles.inputContainer}>
                                <Ionicons name="lock-closed-outline" size={20} color={Colors.light.text.secondary} style={globalStyles.inputIcon} />
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    placeholderTextColor={Colors.light.text.secondary}
                                />
                            </View>

                            <TouchableOpacity
                                style={[globalStyles.btnPrimary, { marginTop: 20 }]}
                                onPress={handleLogin}
                            >
                                <Text style={globalStyles.btnPrimaryText}>Login</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.switchBtn}
                                onPress={() => setIsDistributor(false)}
                            >
                                <Text style={styles.switchText}>Don't have an account? <Text style={styles.linkText}>Sign Up</Text></Text>
                            </TouchableOpacity>
                        </>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backBtn: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.light.text.primary,
    },
    content: {
        padding: 24,
        flexGrow: 1,
        // justifyContent: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.primary,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: Colors.light.text.secondary,
        marginBottom: 32,
        textAlign: 'center',
        lineHeight: 20,
    },
    switchBtn: {
        marginTop: 20,
        alignItems: 'center',
    },
    switchText: {
        color: Colors.light.text.secondary,
        fontSize: 14,
    },
    linkText: {
        color: Colors.light.primary,
        fontWeight: 'bold',
    },
});