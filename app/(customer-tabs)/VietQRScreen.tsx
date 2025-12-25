
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React from 'react';
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const VIETQR_API_URL = 'https://api.vietqr.io/v2/generate';

export default function VietQRScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const { totalAmount, orderId } = useLocalSearchParams();
    const [qrCodeUrl, setQrCodeUrl] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const generateQRCode = async () => {
            try {
                // In a real app, you'd get these from a secure source
                const vietQRApiKey = 'YOUR_VIETQR_API_KEY'; 
                const vietQRClientId = 'YOUR_VIETQR_CLIENT_ID';

                const response = await fetch(VIETQR_API_URL, {
                    method: 'POST',
                    headers: {
                        'x-api-key': vietQRApiKey,
                        'x-client-id': vietQRClientId,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        accountNo: "113366668888",
                        accountName: "TONG DOANH NGOC",
                        acqId: "970422",
                        addInfo: `Thanh toan don hang ${orderId}`,
                        amount: totalAmount,
                        template: "print",
                    }),
                });

                const result = await response.json();

                if (result.code === '00') {
                    setQrCodeUrl(result.data.qrDataURL);
                } else {
                    // Handle error
                    console.error("Failed to generate VietQR code:", result.desc);
                    // For demo, use a placeholder
                    setQrCodeUrl('https://via.placeholder.com/300/000000/FFFFFF/?text=Error+Generating+QR');
                }
            } catch (error) {
                console.error('Error generating QR code:', error);
                 // For demo, use a placeholder
                 setQrCodeUrl('https://via.placeholder.com/300/000000/FFFFFF/?text=Error+Generating+QR');
            } finally {
                setLoading(false);
            }
        };

        generateQRCode();
    }, [totalAmount, orderId]);

    const handlePaymentConfirmation = () => {
        // Here you would typically have a backend service that verifies the payment status
        // For this example, we'll just navigate to the success screen
        router.push('/PaymentSuccessfulScreen');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Thanh toán VietQR</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.instructionText}>
                    Quét mã QR sau để thanh toán đơn hàng
                </Text>

                {loading ? (
                    <ActivityIndicator size="large" color={Colors.light.primary} />
                ) : (
                    qrCodeUrl && <Image source={{ uri: qrCodeUrl }} style={styles.qrCodeImage} />
                )}

                <View style={styles.orderInfo}>
                    <Text style={styles.amountLabel}>Số tiền cần thanh toán:</Text>
                    <Text style={styles.amountValue}>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(totalAmount))}
                    </Text>
                </View>
            </View>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.confirmBtn} onPress={handlePaymentConfirmation}>
                    <Text style={styles.confirmBtnText}>Đã thanh toán</Text>
                </TouchableOpacity>
            </View>
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
    backBtn: {
        marginRight: 16,
        padding: 4,
    },
    headerTitle: {
        color: Colors.light.text.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    instructionText: {
        fontSize: 16,
        color: Colors.light.text.primary,
        textAlign: 'center',
        marginBottom: 24,
    },
    qrCodeImage: {
        width: 300,
        height: 300,
        marginBottom: 24,
    },
    orderInfo: {
        alignItems: 'center',
    },
    amountLabel: {
        fontSize: 14,
        color: Colors.light.text.secondary,
    },
    amountValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.primary,
        marginTop: 8,
    },
    bottomBar: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: Colors.light.border,
    },
    confirmBtn: {
        backgroundColor: Colors.light.primary,
        borderRadius: 24,
        paddingVertical: 12,
        alignItems: 'center',
    },
    confirmBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
