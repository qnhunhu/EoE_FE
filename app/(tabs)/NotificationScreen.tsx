import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const notifications = [
    {
        id: '1',
        title: 'Order Shipped',
        content: 'Your order #12345 has been shipped!',
        time: '2 hours ago',
        read: false,
    },
    {
        id: '2',
        title: 'Order Delivered',
        content: 'Your order #12345 has been delivered successfully.',
        time: '1 day ago',
        read: true,
    },
    {
        id: '3',
        title: 'Promotion',
        content: 'Get 10% off on your next purchase. Use code: EGG10',
        time: '3 days ago',
        read: true,
    },
];

export default function NotificationScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Notifications</Text>
            <FlatList
                data={notifications}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.card, !item.read && styles.unread]}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.content}>{item.content}</Text>
                        <Text style={styles.time}>{item.time}</Text>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 24 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebeb',
        padding: 16,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#034C53',
        marginBottom: 18,
        marginTop: 8,
        marginLeft: 4,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 14,
        shadowColor: '#000',
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    unread: {
        borderLeftWidth: 5,
        borderLeftColor: '#d17878',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#034C53',
        marginBottom: 4,
    },
    content: {
        fontSize: 15,
        color: '#333',
        marginBottom: 6,
    },
    time: {
        fontSize: 13,
        color: '#888',
        textAlign: 'right',
    },
});