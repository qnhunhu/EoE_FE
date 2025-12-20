
import globalStyles from '@/assets/styles/GlobalStyle';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function ReviewProductScreen() {
    const router = useRouter();

    const { order } = useLocalSearchParams();
    const parsedOrder = order ? JSON.parse(order as string) : { items: [] };

    const [reviews, setReviews] = useState(
        parsedOrder.items ? parsedOrder.items.map(() => ({
            rating: 0,
            comment: '',
        })) : []
    );

    const handleRating = (index: number, value: number) => {
        setReviews((prevReviews: any[]) =>
            prevReviews.map((review, i) =>
                i === index ? { ...review, rating: value } : review
            )
        );
    };

    // Handle comment change for a specific item
    const handleCommentChange = (index: number, text: string) => {
        setReviews((prevReviews: any[]) =>
            prevReviews.map((review, i) =>
                i === index ? { ...review, comment: text } : review
            )
        );
    };

    const handleSubmit = () => {
        const incompleteReviews = reviews.some((review: any) =>
            review.rating === 0 || review.comment.trim() === ''
        );
        if (incompleteReviews) {
            alert('Please provide a rating and comment for all items.');
            return;
        }

        // Simulate API call
        console.log('Submitting reviews:', reviews);
        alert('Reviews submitted successfully!');
        router.replace(`/(tabs)/MyOrders`);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Write Review</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {parsedOrder.items && parsedOrder.items.length > 0 ? (
                    parsedOrder.items.map((item: any, index: number) => (
                        <View key={index} style={[styles.itemReview, globalStyles.shadow]}>
                            {/* Product Information */}
                            <View style={styles.productRow}>
                                <Image
                                    source={item.image ? { uri: item.image } : require('../../assets/images/logoNormal.png')}
                                    style={styles.productImage}
                                />
                                <View style={{ flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.textBold} numberOfLines={2}>{item.name}</Text>
                                    <Text style={styles.textGray}>Quantity: {item.quantity}</Text>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            {/* Product Reviews */}
                            <Text style={styles.label}>Rate Product</Text>
                            <View style={styles.ratingRow}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity key={star} onPress={() => handleRating(index, star)}>
                                        <Ionicons
                                            name={star <= reviews[index].rating ? 'star' : 'star-outline'}
                                            size={36}
                                            color={star <= reviews[index].rating ? "#FFD700" : "#ddd"}
                                            style={{ marginHorizontal: 4 }}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Write Your Comment */}
                            <Text style={styles.label}>Your Review</Text>
                            <TextInput
                                style={styles.textArea}
                                placeholder="Share your experience with this product..."
                                multiline
                                value={reviews[index].comment}
                                onChangeText={(text) => handleCommentChange(index, text)}
                                placeholderTextColor={Colors.light.text.light}
                            />

                            {/* Add Photos and Videos */}
                            <View style={styles.mediaContainer}>
                                <TouchableOpacity style={styles.mediaBox}>
                                    <Ionicons name="camera-outline" size={24} color={Colors.light.primary} />
                                    <Text style={styles.mediaText}>Add Photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.mediaBox}>
                                    <Ionicons name="videocam-outline" size={24} color={Colors.light.primary} />
                                    <Text style={styles.mediaText}>Add Video</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: Colors.light.text.secondary }}>No items to review</Text>
                )}

                {/* Submit Button */}
                {parsedOrder.items && parsedOrder.items.length > 0 && (
                    <TouchableOpacity style={[globalStyles.btnPrimary, styles.submitButton]} onPress={handleSubmit}>
                        <Text style={globalStyles.btnPrimaryText}>Submit Review</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
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
    content: {
        padding: 16,
        paddingBottom: 40,
    },
    itemReview: {
        marginBottom: 20,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
    textBold: {
        fontWeight: '600',
        color: Colors.light.text.primary,
        fontSize: 16,
    },
    textGray: {
        color: Colors.light.text.secondary,
        fontSize: 14,
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: Colors.light.text.primary,
    },
    ratingRow: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'center',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#fafafa',
        height: 120,
        textAlignVertical: 'top',
        fontSize: 14,
        color: Colors.light.text.primary,
    },
    mediaContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    mediaBox: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.light.primary,
        borderStyle: 'dashed',
        borderRadius: 12,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0FDF4', // Very light green
    },
    mediaText: {
        color: Colors.light.primary,
        fontSize: 12,
        marginTop: 4,
        fontWeight: '500',
    },
    submitButton: {
        marginBottom: 20,
    },
});