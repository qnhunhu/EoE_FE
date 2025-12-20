import useCreateReturn from '@/hooks/useCreateReturn';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function ExchangeAndReturnScreen() {
    const { order } = useLocalSearchParams(); // Get the order details from the route parameters
    const router = useRouter();

    const parsedOrder = JSON.parse(order as string); // Parse the order details
    const [selectedOption, setSelectedOption] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reason, setReason] = useState('User requested exchange/return');
    const { createReturn } = useCreateReturn();
    const handleConfirm = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleModalConfirm = () => {
        createReturn({
            orderId: parsedOrder.orderId as number,
            reason: reason 
        });

        setIsModalVisible(false);
        router.replace(`/(tabs)/MyOrders`);
    };

    return (
        <View style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace(`/(tabs)/MyOrders`)} style={styles.backButton}>
                    <Ionicons name="caret-back-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Exchange/Return</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>You want to:</Text>
                <View style={styles.pickerContainer}>
                    <Picker style={styles.picker}
                        selectedValue={selectedOption}
                        onValueChange={(itemValue) => setSelectedOption(itemValue)}>
                        <Picker.Item label="Exchange" value="exchange" />
                        <Picker.Item label="Return" value="return" />
                    </Picker>
                </View>


                <Text style={styles.label}>Why do you want to exchange/return the item?</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Tell us your reason"
                    multiline
                    onChangeText={(text) => setReason(text)}
                />

                <Text style={styles.label}>
                    If returning the item, please select a refund method.
                </Text>
                <TextInput style={styles.input} placeholder="Select a payment method" />

                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
            {/* Confirmation Modal */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCancel}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>
                            You really want to exchange/return that items
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalCancelButton} onPress={handleCancel}>
                                <Text style={styles.modalCancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalConfirmButton} onPress={handleModalConfirm}>
                                <Text style={styles.modalConfirmButtonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#006D5B',
        padding: 16,
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    form: {
        padding: 16,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    confirmButton: {
        backgroundColor: '#C22727',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalCancelButton: {
        flex: 1,
        backgroundColor: '#006D5B',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 10,
    },
    modalCancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalConfirmButton: {
        flex: 1,
        backgroundColor: '#C22727',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalConfirmButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});