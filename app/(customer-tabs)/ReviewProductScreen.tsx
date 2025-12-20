import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ReviewProductScreen() {
    const router = useRouter();

    const { order } = useLocalSearchParams();
    const parsedOrder = JSON.parse(order as string); // Parse the order details

    const [rating, setRating] = useState(0); // State for star rating
    const [comment, setComment] = useState(''); // State for user comment

    const [reviews, setReviews] = useState(
        parsedOrder.items.map(() => ({
            rating: 0,
            comment: '',
        }))
    );

    const handleRating = (index: number, value: number) => {
        setReviews((prevReviews) =>
            prevReviews.map((review, i) =>
                i === index ? { ...review, rating: value } : review
            )
        );
    };

    // Handle comment change for a specific item
    const handleCommentChange = (index: number, text: string) => {
        setReviews((prevReviews) =>
            prevReviews.map((review, i) =>
                i === index ? { ...review, comment: text } : review
            )
        );
    };

    const handleSubmit = () => {
        const incompleteReviews = reviews.some((review) =>
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
        <View style={styles.container}>
            {/* Header with Back Button */}
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="caret-back-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Review</Text>
            </SafeAreaView>

            <ScrollView style={styles.content}>
                {parsedOrder.items.map((item, index) => (
                    <View key={index} style={styles.itemReview}>
                        {/* Product Information */}
                        <View style={styles.productRow}>
                            <Image source={item.image} style={styles.productImage} />
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={styles.textBold}>{item.name}</Text>
                                <Text style={styles.textPrice}>${item.price}</Text>
                                <Text style={styles.textOldPrice}>${item.oldPrice}</Text>
                                <Text style={styles.textGray}>Quantity: {item.quantity}</Text>
                            </View>
                        </View>

                        {/* Product Reviews */}
                        <Text style={styles.label}>PRODUCT REVIEWS</Text>
                        <View style={styles.ratingRow}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => handleRating(index, star)}>
                                    <Ionicons
                                        name={star <= reviews[index].rating ? 'star' : 'star-outline'}
                                        size={32}
                                        color="#FF6F61"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Add Photos and Videos */}
                        <Text style={styles.label}>ADD PHOTOS AND VIDEO</Text>
                        <View style={styles.mediaRow}>
                            <TouchableOpacity style={styles.mediaBox}>
                                <Text style={styles.mediaText}>Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.mediaBox}>
                                <Text style={styles.mediaText}>Video</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Write Your Comment */}
                        <Text style={styles.label}>WRITE YOUR COMMENT</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Share with us your experiences"
                            multiline
                            value={reviews[index].comment}
                            onChangeText={(text) => handleCommentChange(index, text)}
                        />
                    </View>
                ))}

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Send</Text>
                </TouchableOpacity>
            </ScrollView>
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
    content: {
        padding: 15,
        paddingBottom: 100,
    },
    itemReview: {
        marginBottom: 20, // Adds spacing between each review item
        padding: 16, // Adds padding inside the review container
        backgroundColor: '#fff', // Sets the background color to white
        borderRadius: 8, // Rounds the corners of the review container
        shadowColor: '#000', // Adds a shadow effect
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.1, // Shadow opacity
        shadowRadius: 4, // Shadow blur radius
        elevation: 2, // Adds elevation for Android shadow
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    textBold: {
        fontWeight: 'bold',
        color: '#333',
    },
    textPrice: {
        color: '#C22727',
        fontWeight: 'bold',
        marginTop: 4,
    },
    textOldPrice: {
        color: '#999',
        textDecorationLine: 'line-through',
    },
    textGray: {
        color: '#666',
        fontSize: 12,
        marginTop: 4,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    ratingRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    mediaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    mediaBox: {
        width: '48%',
        height: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    mediaText: {
        color: '#999',
        fontSize: 14,
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
    submitButton: {
        backgroundColor: '#FF6F61',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 60,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});