import globalStyles from '@/assets/styles/GlobalStyle';
import useAccount from '@/hooks/useAccount';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContent';

export default function MyProfile() {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [name, setName] = useState('TRAN THI KIEU OANH');
    const [membership, setMembership] = useState('Gold Member');
    const [phone, setPhone] = useState('0123456789');
    const [address, setAddress] = useState('123 Main St, City, Country');

    const [avatar, setAvatar] = useState(require('../../assets/images/logoNormal.png'));
    const { userId } = useAuth();
    const router = useRouter();

    const numericId = Array.isArray(userId) ? Number(userId[0]) : Number(userId);

    const { account, loading } = useAccount(numericId);
    if (loading) {
        return <Text>Loading...</Text>;
    }

    const { isLoggedIn, setIsLoggedIn } = useAuth(); // <-- get login state

    const handleChangeToOrders = () => {
        router.push('/MyOrders');
    };

    const handleChangeToDistributorAccount = () => {
        router.push('/ChangeToDistributorAccountScreen');
    };

    const menuItems = [
        {
            id: 1,
            title: 'Edit profile information',
            icon: 'edit',
            onPress: () => setIsModalVisible(true)
        },
        {
            id: 2,
            title: 'My orders',
            icon: 'receipt',
            onPress: () => handleChangeToOrders()
        },
        {
            id: 4,
            title: 'Change to distributor account',
            icon: 'attach-money',
            onPress: () => handleChangeToDistributorAccount()
        },
        {
            id: 5,
            title: 'Log out',
            icon: 'logout',
            onPress: () => setIsLoggedIn(false), isLogout: true
        },
    ];

    const handleSave = () => {
        setIsModalVisible(false);
        alert('Profile updated successfully!');
    };

    const handleChangeAvatar = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatar({ uri: result.assets[0].uri });
        }
    };
    // Nếu chưa đăng nhập, hiển thị thông báo và nút chuyển về StartScreen
    // if (!isLoggedIn) {
    //     return (
    //         <View style={styles.container}>
    //             <View style={styles.header}>
    //                 <Image
    //                     source={avatar}
    //                     style={styles.profileImage}
    //                 />
    //                 <View style={styles.profileInfor}>
    //                     <Text style={styles.profileName}>Guest</Text>
    //                     <Text style={[globalStyles.p2SemiBold, { color: '#FFC1B4' }]}>Welcome!</Text>
    //                 </View>
    //             </View>
    //             <View style={styles.menu}>

    //             </View>
    //         </View>
    //     );
    // }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => handleChangeAvatar()}>
                    <Image
                        source={avatar}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>

                <View style={styles.profileInfor}>
                    <Text style={styles.profileName}>
                        {isLoggedIn ? account?.name : 'Guest'}
                    </Text>
                    <Text style={[globalStyles.p2SemiBold, { color: '#FFC1B4' }]}>
                        {isLoggedIn ? account?.role : 'Welcome to EggOEgg'}</Text>

                </View>
            </View>

            {/* Menu Items */}
            <View style={styles.menu}>
                {isLoggedIn ? (
                    menuItems.map((item: any) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.menuItem, item.isLogout && styles.logoutItem]}
                            onPress={item.onPress}
                        >
                            <View style={styles.menuItemLeft}>
                                <MaterialIcons
                                    name={item.icon}
                                    size={20}
                                    color={item.isLogout ? '#C22727' : '#006D5B'}
                                />
                                <Text style={[styles.menuItemText, item.isLogout && styles.logoutText]}>
                                    {item.title}
                                </Text>
                            </View>
                            {!item.isLogout && (
                                <Ionicons name="chevron-forward" size={20} color="#666" />
                            )}
                        </TouchableOpacity>
                    ))
                ) : (
                    <TouchableOpacity
                        style={[styles.menuItem, { justifyContent: 'center' }]}
                        onPress={() => router.replace('/StartScreen')}
                    >
                        <MaterialIcons name="shopping-cart" size={20} color="#006D5B" />
                        <Text style={[styles.menuItemText, { marginLeft: 12 }]}>Start Shopping</Text>
                    </TouchableOpacity>
                )

                }
            </View>
            {/* Modal for Editing Profile */}
            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Profile Information</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name"
                            value={account?.name || name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter phone number"
                            value={account?.phone || phone}
                            onChangeText={setPhone}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter address"
                            value={account?.address || address}
                            onChangeText={setAddress}
                        />
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
                    </View>
                </View>
            </Modal>
        </View>
    );
}

// ...styles giữ nguyên...

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    header: {
        backgroundColor: '#034C53',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 20,
    },
    profileInfor: {
        display: 'flex',
        gap: 4,
        flexDirection: 'column',
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
    profileStatus: {
        fontSize: 14,
        color: '#FFD700',
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
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
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