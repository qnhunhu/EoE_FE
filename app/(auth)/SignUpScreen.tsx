import globalStyles from '@/assets/styles/GlobalStyle';
import Config from '@/constants';
import { useAuth } from '@/contexts/AuthContent';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function SignUpScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    

    const { setIsLoggedIn,setRole,setUserId } = useAuth();

    const handleSignUp = async () => {
      if (password !== confirm) {
        alert("Passwords do not match!");
        return;
      }
    
      try {
        const response = await axios.post(`${Config.API_BASE_URL}/api/Auth/register`, {
          name,
          phone,
          email,
          address,
          password,
          role: 2,
        });
    
        if (response.status === 200 || response.status === 201) {
            setIsLoggedIn(true);
            setUserId(response.data.id);
            setRole(response.data.role);;
          router.replace('../(tabs)/HomeScreen');
        }
      } catch (error) {
        console.error('Sign up error:', error);
        alert('Sign up failed. Please try again.');
      }
    };
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Ionicons name="caret-back" size={32} color="#A86A5A" />
            </TouchableOpacity>
            <View style={styles.logoRow}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
            </View>
            <Text style={[styles.title, globalStyles.h2]}>SIGN UP</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Password"
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry
            />
            <TouchableOpacity style={styles.signupBtn}
                onPress={() => handleSignUp()}>
                <Text style={[styles.signupBtnText, globalStyles.h4]}>Sign up</Text>
            </TouchableOpacity>
            <View style={styles.bottomRow}>
                <Text style={[styles.bottomText, globalStyles.p2Regular]}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/LoginScreen')}>
                    <Text style={[globalStyles.p2Regular, styles.signupText]}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 40,
    },

    backBtn: {
        position: 'absolute',
        left: 24,
        top: 48,
        zIndex: 2
    },

    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40
    },

    logo: {
        width: 200,
        height: 80,
    },

    logoText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#A86A5A'
    },

    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#A86A5A',
        marginTop: 40,
        marginBottom: 30
    },

    input: {
        width: '85%',
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 20,
        padding: 16,
        fontSize: 12,
        marginBottom: 18,
        backgroundColor: '#fff',
        shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, elevation: 2,
    },
    signupBtn: {
        backgroundColor: '#BC7269',
        borderRadius: 28,
        paddingVertical: 14,
        paddingHorizontal: 60,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30,
        shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 4, elevation: 2,
    },
    signupBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 28
    },
    bottomRow: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center'
    },
    bottomText: {
        color: '#222',
        fontSize: 18
    },
    signupText: {
        color: '#0B5C60',
        fontWeight: 'bold',
    },
});