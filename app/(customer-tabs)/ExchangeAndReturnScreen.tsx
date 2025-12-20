
import globalStyles from '@/assets/styles/GlobalStyle';
import { Colors } from '@/constants/Colors';
import useCreateReturn from '@/hooks/useCreateReturn';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function ExchangeAndReturnScreen() {
    const { order } = useLocalSearchParams();
    const router = useRouter();

    const parsedOrder = order ? JSON.parse(order as string) : {};
    const [selectedOption, setSelectedOption] = useState('exchange');
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
        <SafeAreaView style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace(`/(tabs)/MyOrders`)} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Exchange / Return</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>

                    <View style={styles.card}>
                        <Text style={styles.label}>I want to:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker style={styles.picker}
                                selectedValue={selectedOption}
                                onValueChange={(itemValue) => setSelectedOption(itemValue)}>
                                <Picker.Item label="Exchange Item" value="exchange" />
                                <Picker.Item label="Return Item" value="return" />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.label}>Reason for Request</Text>
                        <TextInput
                            style={styles.textArea}
                            placeholder="Please describe why you want to exchange or return..."
                            multiline
                            onChangeText={(text) => setReason(text)}
                            value={reason === 'User requested exchange/return' ? '' : reason}
                            placeholderTextColor={Colors.light.text.light}
                        />
                    </View>

                    {selectedOption === 'return' && (
                        <View style={styles.card}>
                            <Text style={styles.label}>Preferred Refund Method</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Select a refund method (e.g. Bank Transfer)"
                                placeholderTextColor={Colors.light.text.light}
                            />
                        </View>
                    )}

                    <TouchableOpacity style={[globalStyles.btnPrimary, { marginTop: 20 }]} onPress={handleConfirm}>
                        <Text style={globalStyles.btnPrimaryText}>Submit Request</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Confirmation Modal */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCancel}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalIcon}>
                            <Ionicons name="alert-circle-outline" size={48} color={Colors.light.primary} />
                        </View>
                        <Text style={styles.modalTitle}>Confirm Request</Text>
                        <Text style={styles.modalText}>
                            Are you sure you want to {selectedOption} this item?
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
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text.primary,
    },
    form: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
            android: { elevation: 2 }
        })
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: Colors.light.text.primary,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        backgroundColor: '#fafafa',
        overflow: 'hidden',
    },
    picker: {
        height: Platform.OS === 'ios' ? 150 : 50,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#fafafa',
        color: Colors.light.text.primary,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#fafafa',
        height: 120,
        textAlignVertical: 'top',
        color: Colors.light.text.primary,
    },

    // Modal
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
    },
    modalIcon: {
        marginBottom: 16,
        backgroundColor: '#E0F2F1',
        padding: 16,
        borderRadius: 50,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text.primary,
        marginBottom: 8,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        color: Colors.light.text.secondary,
        lineHeight: 22,
    },
    modalButtons: {
        flexDirection: 'row',
        width: '100%',
        gap: 12,
    },
    modalCancelButton: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    modalCancelButtonText: {
        color: Colors.light.text.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalConfirmButton: {
        flex: 1,
        backgroundColor: Colors.light.primary,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    modalConfirmButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});