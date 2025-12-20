import { useAuth } from '@/contexts/AuthContent';
import useAccount from '@/hooks/useAccount';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DistributorMainScreen() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState('TRAN THI KIEU OANH');
    const [address, setAddress] = useState('123 Main St, City, Country');
    const [description, setDescription] = useState('Reputable distributor');
    const [phone, setPhone] = useState('0123456789');
    const [profileImage, setProfileImage] = useState(require('../../assets/images/logoNormal.png'));
    const [placeImages, setPlaceImages] = useState([]);
    const { userId } = useAuth();
    const { account, loading } = useAccount(userId||2); // <-- get account info
    const router = useRouter();
    const { setIsLoggedIn } = useAuth();
    const menuItems = [
        {
            id: 1,
            title: 'Edit profile information',
            icon: 'edit',
            onPress: () => { setIsModalVisible(true) },
        },
        {
            id: 2,
            title: 'Confirm orders',
            icon: 'receipt',
            badge: '',
            onPress: () => { router.push( `${'/(distributor-tabs)'}/ConfirmOrdersScreen` ) },
        },
        {
            id: 3,
            title: 'Confirm exchange/return',
            icon: 'undo',
            badge:'',
            onPress: () => { router.push('/(distributor-tabs)/ExchangeAndReturnScreen') },
        },
        {
            id: 4,
            title: 'Change to normal account',
            icon: 'attach-money',
            onPress: () => { router.replace('/(tabs)/HomeScreen') },
        },
        {
            id: 5,
            title: 'Log out',
            icon: 'logout',
            onPress: () => setIsLoggedIn(false), isLogout: true,
        },
    ];

    const handleSave = () => {
        setIsModalVisible(false);
    };

    const handlePickPlaceImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
            selectionLimit: 6,
        });
        if (!result.canceled) {
            const newImages = result.assets.map(asset => ({ uri: asset.uri }));
            const [placeImages, setPlaceImages] = useState<{ uri: string }[]>([]);        }
    };

    const handleRemovePlaceImage = (index: any) => {
        setPlaceImages(placeImages.filter((_, i) => i !== index));
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={profileImage}
                    style={styles.profileImage}
                />
                <View style={styles.profileInfor}>
                    <Text style={styles.profileName}>{account?.name}</Text>
                    <Text style={styles.profileRole}>{account?.role}</Text>
                </View>
            </View>
            {/* Menu Items */}
            <View style={styles.menu}>
                {menuItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.menuItem, item.isLogout && styles.logoutItem]}
                        onPress={item.onPress}
                    >
                        <View style={styles.menuItemLeft}>
                            <MaterialIcons
                                name={item.icon as any}
                                size={20}
                                color={item.isLogout ? '#C22727' : '#006D5B'}
                            />
                            <Text style={[styles.menuItemText, item.isLogout && styles.logoutText]}>
                                {item.title}
                            </Text>
                        </View>
                        {item.badge && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{item.badge}</Text>
                            </View>
                        )}
                        {/* {!item.isLogout && (
                            <Ionicons name="chevron-forward" size={20} color="#666" />
                        )} */}
                    </TouchableOpacity>
                ))}
            </View>
            {/* Modal for Editing Profile */}
            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ScrollView style={{ width: '100%' }}>
                            <Text style={styles.modalTitle}>Edit Profile Information</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your name"
                                value={account?.name||name} 
                                onChangeText={setName}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter address"
                                value={account?.address||address}
                                onChangeText={setAddress}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter description"
                                value={description}
                                onChangeText={setDescription}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter phone number"
                                value={account?.phone||phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />
                            <Text style={styles.sectionTitle}>Place Description Images</Text>
                            <View style={styles.placeImagesRow}>
                                {placeImages.map((img, idx) => (
                                    <View key={idx} style={styles.placeImageWrapper}>
                                        <Image source={img} style={styles.placeImage} />
                                        <TouchableOpacity
                                            style={styles.removeImageBtn}
                                            onPress={() => handleRemovePlaceImage(idx)}
                                        >
                                            <MaterialIcons name="close" size={18} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                                {placeImages.length < 5 && (
                                    <TouchableOpacity
                                        style={styles.addImageBtn}
                                        onPress={handlePickPlaceImages}
                                    >
                                        <MaterialIcons name="add-a-photo" size={28} color="#006D5B" />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[styles.modalButton, { backgroundColor: '#ddd' }]}
                                    onPress={() => setIsModalVisible(false)}
                                >
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButton, { backgroundColor: '#006D5B' }]}
                                    onPress={handleSave}
                                >
                                    <Text style={[styles.modalButtonText, { color: '#fff' }]}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    header: {
        backgroundColor: '#034C53',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 16,
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 20,
    },
    profileInfor: {
        flexDirection: 'column',
        gap: 4,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    profileRole: {
        fontSize: 14,
        color: '#FFC1B4',
        fontWeight: 'bold',
    },
    menu: {
        backgroundColor: '#fff',
        marginTop: 10,
        paddingHorizontal: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    menuItemText: {
        fontSize: 16,
        color: '#333',
    },
    logoutItem: {
        borderBottomWidth: 0,
    },
    logoutText: {
        color: '#C22727',
    },
    badge: {
        backgroundColor: '#B13B2E',
        borderRadius: 16,
        minWidth: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    badgeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 6,
    },
    placeImagesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 12,
        gap: 8,
    },
    placeImageWrapper: {
        position: 'relative',
        marginRight: 8,
    },
    placeImage: {
        width: 56,
        height: 56,
        borderRadius: 8,
        backgroundColor: '#eee',
    },
    removeImageBtn: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#C22727',
        borderRadius: 10,
        padding: 2,
        zIndex: 2,
    },
    addImageBtn: {
        width: 56,
        height: 56,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: '#006D5B',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    modalButton: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});