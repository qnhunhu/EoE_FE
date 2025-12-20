import globalStyles from '@/assets/styles/GlobalStyle';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function StartScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            {/* Background image */}
            <Image
                source={require('../assets/images/startPic.png')}
                style={styles.backgroundImg}
                resizeMode="contain"
                blurRadius={0}
            />
            {/* Buttons */}
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/(auth)/LoginScreen')}>
                    <Text style={[globalStyles.h3, { color: "#fff" }]}>Shop now!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.policyBtn}>
                    <Text style={[globalStyles.p3Regular, { color: "#034C53" }]}>User Policy</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    backgroundImg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
    },
    btnContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 60,
    },
    button: {
        backgroundColor: '#BC7269',
        borderRadius: 40,
        paddingVertical: 18,
        paddingHorizontal: 60,
        marginBottom: 24,
        width: width * 0.85,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 28,
    },
    policyBtn: {
        alignSelf: 'flex-end',
        marginRight: 30,
        marginTop: 10,
    },
    policyText: {
        color: '#0B5C60',
        fontStyle: 'italic',
        fontSize: 18,
    },
});// StartScreen.tsx
