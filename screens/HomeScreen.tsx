import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Xin chào từ EggOEgg!</Text>
            <Button title="Bấm vào đây" onPress={() => alert('Hi there 👋')} />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    },
    title: {
        fontSize: 24, fontWeight: 'bold', marginBottom: 20,
    },
});
